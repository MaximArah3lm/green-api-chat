import clsx from 'clsx'
import type { ReactNode } from 'react'
import s from './Layout.module.scss'

interface ILayoutProps {
  sidebar: ReactNode
  children: ReactNode
  isChatOpen: boolean
}

export function Layout({ sidebar, children, isChatOpen }: ILayoutProps) {
  return (
    <div className={clsx(s.layout, isChatOpen && s.layout_chatOpen)}>
      <div className={s.layout__container}>
        <aside className={s.layout__sidebar}>{sidebar}</aside>
        <main className={s.layout__main}>{children}</main>
      </div>
    </div>
  )
}
