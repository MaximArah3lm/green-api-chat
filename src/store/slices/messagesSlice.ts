import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { sendMessage } from '@/api/greenApi'
import type { IIncomingMessage, IMessage } from '@/types/chat.types'
import type { TRootState } from '@/store/store.types'
import { loggedOut } from './authSlice'

interface IMessagesState {
  byChatId: Record<string, IMessage[]>
}

const initialState: IMessagesState = {
  byChatId: {},
}

export const sendTextMessage = createAsyncThunk<
  string,
  { chatId: string; text: string },
  { state: TRootState }
>('messages/send', async ({ chatId, text }, { getState }) => {
  const credentials = getState().auth.credentials
  if (!credentials) {
    throw new Error('Нет данных для авторизации')
  }

  const { idMessage } = await sendMessage(credentials, chatId, text)
  return idMessage
})

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    messageReceived(state, action: PayloadAction<IIncomingMessage>) {
      const { id, chatId, text, timestamp } = action.payload
      const list = state.byChatId[chatId] || []

      // на случай, если уведомление пришло повторно
      if (list.some((message) => message.id === id)) return

      list.push({ id, chatId, text, timestamp, direction: 'in', status: 'sent' })
      state.byChatId[chatId] = list
    },
    messageRemoved(state, action: PayloadAction<{ chatId: string; id: string }>) {
      const { chatId, id } = action.payload
      const list = state.byChatId[chatId] || []

      state.byChatId[chatId] = list.filter((message) => message.id !== id)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendTextMessage.pending, (state, action) => {
        const { chatId, text } = action.meta.arg
        const list = state.byChatId[chatId] || []

        // пока нет ответа от сервера, id временный
        list.push({
          id: action.meta.requestId,
          chatId,
          text,
          direction: 'out',
          timestamp: Date.now(),
          status: 'pending',
        })
        state.byChatId[chatId] = list
      })
      .addCase(sendTextMessage.fulfilled, (state, action) => {
        const list = state.byChatId[action.meta.arg.chatId] || []
        const message = list.find((item) => item.id === action.meta.requestId)

        if (message) {
          message.id = action.payload
          message.status = 'sent'
        }
      })
      .addCase(sendTextMessage.rejected, (state, action) => {
        const list = state.byChatId[action.meta.arg.chatId] || []
        const message = list.find((item) => item.id === action.meta.requestId)

        if (message) {
          message.status = 'error'
        }
      })
      .addCase(loggedOut, () => initialState)
  },
})

export const { messageReceived, messageRemoved } = messagesSlice.actions

const EMPTY_LIST: IMessage[] = []

export const selectMessages = (state: TRootState, chatId: string) =>
  state.messages.byChatId[chatId] || EMPTY_LIST

export const selectLastMessage = (state: TRootState, chatId: string) => {
  const list = state.messages.byChatId[chatId] || EMPTY_LIST
  return list[list.length - 1]
}

export default messagesSlice.reducer
