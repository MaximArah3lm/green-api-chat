import clsx from 'clsx'
import { UserIcon } from '@/components/common/icons'
import s from './Avatar.module.scss'

interface IAvatarProps {
  size?: 'sm' | 'md'
}

export function Avatar({ size = 'md' }: IAvatarProps) {
  return (
    <div className={clsx(s.avatar, size === 'sm' ? s.avatar_sm : s.avatar_md)}>
      <UserIcon className={s.avatar__icon} />
    </div>
  )
}
