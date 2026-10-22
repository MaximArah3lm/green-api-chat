import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { IChat } from '@/types/chat.types'
import type { TRootState } from '@/store/store.types'
import { chatIdToPhone } from '@/utils/phone'
import { loadFromStorage } from '@/utils/storage'
import { loggedOut } from './authSlice'
import { messageReceived, sendTextMessage } from './messagesSlice'

interface IChatsState {
  list: IChat[]
  activeChatId: string | null
}

const initialState: IChatsState = {
  list: loadFromStorage<IChat[]>('chats') ?? [],
  activeChatId: null,
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    chatCreated(state, action: PayloadAction<{ chatId: string; phone: string }>) {
      const { chatId, phone } = action.payload
      const chat = state.list.find((item) => item.chatId === chatId)

      if (chat) {
        chat.unread = 0
      } else {
        state.list.push({ chatId, phone, unread: 0, updatedAt: Date.now() })
      }

      state.activeChatId = chatId
    },
    chatOpened(state, action: PayloadAction<string>) {
      state.activeChatId = action.payload

      const chat = state.list.find((item) => item.chatId === action.payload)
      if (chat) {
        chat.unread = 0
      }
    },
    chatClosed(state) {
      state.activeChatId = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(messageReceived, (state, action) => {
        const { chatId, timestamp, senderName } = action.payload
        let chat = state.list.find((item) => item.chatId === chatId)

        // новый собеседник
        if (!chat) {
          chat = { chatId, phone: chatIdToPhone(chatId), unread: 0, updatedAt: timestamp }
          state.list.push(chat)
        }

        if (senderName && !chat.name) {
          chat.name = senderName
        }

        chat.updatedAt = timestamp
        if (state.activeChatId !== chatId) {
          chat.unread += 1
        }
      })
      .addCase(sendTextMessage.pending, (state, action) => {
        const chat = state.list.find((item) => item.chatId === action.meta.arg.chatId)
        if (chat) {
          chat.updatedAt = Date.now()
        }
      })
      .addCase(loggedOut, () => ({ list: [], activeChatId: null }))
  },
})

export const { chatCreated, chatOpened, chatClosed } = chatsSlice.actions

export const selectChats = (state: TRootState) => state.chats.list

export const selectActiveChatId = (state: TRootState) => state.chats.activeChatId

export const selectActiveChat = (state: TRootState) =>
  state.chats.list.find((chat) => chat.chatId === state.chats.activeChatId) || null

export default chatsSlice.reducer
