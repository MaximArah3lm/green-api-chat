import clsx from 'clsx'
import { CheckIcon, ClockIcon, ErrorIcon } from '@/components/common/icons'
import type { IMessage, TMessageStatus } from '@/types/chat.types'
import { formatTime } from '@/utils/date'
import s from './MessageBubble.module.scss'

interface IMessageBubbleProps {
  message: IMessage
  onRetry: (message: IMessage) => void
}

function StatusIcon({ status }: { status: TMessageStatus }) {
  if (status === 'pending') return <ClockIcon className={s.message__status} />
  if (status === 'error') return <ErrorIcon className={s.message__status} />
  return <CheckIcon className={s.message__status} />
}

export function MessageBubble({ message, onRetry }: IMessageBubbleProps) {
  const isOut = message.direction === 'out'

  return (
    <div
      className={clsx(
        s.message,
        isOut && s.message_out,
        message.status === 'error' && s.message_error,
      )}
    >
      <div className={s.message__bubble}>
        <span className={s.message__text}>{message.text}</span>
        <span className={s.message__meta}>
          {formatTime(message.timestamp)}
          {isOut && <StatusIcon status={message.status} />}
        </span>
      </div>

      {message.status === 'error' && (
        <button type="button" className={s.message__retry} onClick={() => onRetry(message)}>
          Не отправлено. Повторить
        </button>
      )}
    </div>
  )
}
