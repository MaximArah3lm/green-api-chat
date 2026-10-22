import { configureStore } from '@reduxjs/toolkit'
import { removeFromStorage, saveToStorage } from '@/utils/storage'
import authReducer from './slices/authSlice'
import chatsReducer from './slices/chatsSlice'
import messagesReducer from './slices/messagesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chats: chatsReducer,
    messages: messagesReducer,
  },
})

// переписку не сохраняем, только вход и чаты
store.subscribe(() => {
  const { auth, chats } = store.getState()

  if (auth.credentials) {
    saveToStorage('credentials', auth.credentials)
  } else {
    removeFromStorage('credentials')
  }

  saveToStorage('chats', chats.list)
})
