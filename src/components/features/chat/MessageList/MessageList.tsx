import { useLayoutEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { messageRemoved, selectMessages, sendTextMessage } from '@/store/slices/messagesSlice'
import type { IMessage } from '@/types/chat.types'
import { MessageBubble } from '../MessageBubble/MessageBubble'
import s from './MessageList.module.scss'

interface IMessageListProps {
  chatId: string
}

export function MessageList({ chatId }: IMessageListProps) {
  const dispatch = useAppDispatch()
  const messages = useAppSelector((state) => selectMessages(state, chatId))
  const listRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = listRef.current
    if (el) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages.length, chatId])

  const handleRetry = (message: IMessage) => {
    dispatch(messageRemoved({ chatId, id: message.id }))
    dispatch(sendTextMessage({ chatId, text: message.text }))
  }

  return (
    <div ref={listRef} className={s.messageList}>
      {messages.length === 0 ? (
        <div className={s.messageList__empty}>Сообщений пока нет. Напишите первым!</div>
      ) : (
        messages.map((message) => (
          <MessageBubble key={message.id} message={message} onRetry={handleRetry} />
        ))
      )}
    </div>
  )
}
