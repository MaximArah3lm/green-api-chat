import { Avatar } from '@/components/common/Avatar/Avatar'
import { Button } from '@/components/common/Button/Button'
import { BackIcon } from '@/components/common/icons'
import s from './ChatHeader.module.scss'

interface IChatHeaderProps {
  title: string
  onBack: () => void
}

export function ChatHeader({ title, onBack }: IChatHeaderProps) {
  return (
    <header className={s.chatHeader}>
      <Button
        variant="icon"
        className={s.chatHeader__back}
        onClick={onBack}
        aria-label="Назад к списку чатов"
      >
        <BackIcon />
      </Button>
      <Avatar size="sm" />
      <div className={s.chatHeader__info}>
        <span className={s.chatHeader__title}>{title}</span>
      </div>
    </header>
  )
}
