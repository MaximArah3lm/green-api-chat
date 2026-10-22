import clsx from 'clsx'
import { Avatar } from '@/components/common/Avatar/Avatar'
import { useAppSelector } from '@/store/hooks'
import { selectLastMessage } from '@/store/slices/messagesSlice'
import type { IChat } from '@/types/chat.types'
import { getChatTitle } from '@/utils/chat'
import { formatChatDate } from '@/utils/date'
import s from './ChatListItem.module.scss'

interface IChatListItemProps {
  chat: IChat
  isActive: boolean
  onClick: (chatId: string) => void
}

export function ChatListItem({ chat, isActive, onClick }: IChatListItemProps) {
  const lastMessage = useAppSelector((state) => selectLastMessage(state, chat.chatId))

  const preview = lastMessage
    ? (lastMessage.direction === 'out' ? 'Вы: ' : '') + lastMessage.text
    : 'Нет сообщений'

  return (
    <li>
      <button
        type="button"
        className={clsx(s.chatItem, isActive && s.chatItem_active)}
        onClick={() => onClick(chat.chatId)}
      >
        <Avatar />
        <div className={s.chatItem__body}>
          <div className={s.chatItem__row}>
            <span className={s.chatItem__title}>{getChatTitle(chat)}</span>
            {lastMessage && (
              <span className={clsx(s.chatItem__date, chat.unread > 0 && s.chatItem__date_unread)}>
                {formatChatDate(lastMessage.timestamp)}
              </span>
            )}
          </div>
          <div className={s.chatItem__row}>
            <span className={s.chatItem__preview}>{preview}</span>
            {chat.unread > 0 && <span className={s.chatItem__badge}>{chat.unread}</span>}
          </div>
        </div>
      </button>
    </li>
  )
}
