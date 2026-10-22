import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { chatOpened, selectActiveChatId, selectChats } from '@/store/slices/chatsSlice'
import { ChatListItem } from '../ChatListItem/ChatListItem'
import s from './ChatList.module.scss'

export function ChatList() {
  const dispatch = useAppDispatch()
  const chats = useAppSelector(selectChats)
  const activeChatId = useAppSelector(selectActiveChatId)

  const sortedChats = useMemo(() => [...chats].sort((a, b) => b.updatedAt - a.updatedAt), [chats])

  if (sortedChats.length === 0) {
    return (
      <div className={s.chatList__empty}>
        Чатов пока нет. Нажмите «Новый чат» и введите номер получателя.
      </div>
    )
  }

  return (
    <ul className={s.chatList}>
      {sortedChats.map((chat) => (
        <ChatListItem
          key={chat.chatId}
          chat={chat}
          isActive={chat.chatId === activeChatId}
          onClick={(chatId) => dispatch(chatOpened(chatId))}
        />
      ))}
    </ul>
  )
}
