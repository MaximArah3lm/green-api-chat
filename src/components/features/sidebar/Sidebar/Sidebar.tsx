import { useState } from 'react'
import { Button } from '@/components/common/Button/Button'
import { CloseIcon, LogoutIcon, NewChatIcon } from '@/components/common/icons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loggedOut, selectCredentials } from '@/store/slices/authSlice'
import { ChatList } from '../ChatList/ChatList'
import { NewChatForm } from '../NewChatForm/NewChatForm'
import s from './Sidebar.module.scss'

export function Sidebar() {
  const dispatch = useAppDispatch()
  const credentials = useAppSelector(selectCredentials)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleLogout = () => {
    dispatch(loggedOut())
  }

  return (
    <div className={s.sidebar}>
      <header className={s.sidebar__header}>
        <div className={s.sidebar__info}>
          <span className={s.sidebar__title}>Чаты</span>
          <span className={s.sidebar__instance}>Инстанс {credentials?.idInstance}</span>
        </div>
        <div className={s.sidebar__actions}>
          <Button
            variant="icon"
            onClick={() => setIsFormOpen((open) => !open)}
            title={isFormOpen ? 'Закрыть' : 'Новый чат'}
            aria-label={isFormOpen ? 'Закрыть' : 'Новый чат'}
          >
            {isFormOpen ? <CloseIcon /> : <NewChatIcon />}
          </Button>
          <Button variant="icon" onClick={handleLogout} title="Выйти" aria-label="Выйти">
            <LogoutIcon />
          </Button>
        </div>
      </header>

      {isFormOpen && <NewChatForm onDone={() => setIsFormOpen(false)} />}

      <ChatList />
    </div>
  )
}
