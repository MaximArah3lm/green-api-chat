import s from './EmptyState.module.scss'

export function EmptyState() {
  return (
    <div className={s.emptyState}>
      <div className={s.emptyState__picture} aria-hidden>
        <svg viewBox="0 0 120 100" width="160">
          <rect x="8" y="10" width="76" height="46" rx="10" fill="#d9fdd3" />
          <path d="M20 56 14 70l20-14z" fill="#d9fdd3" />
          <rect x="40" y="38" width="72" height="42" rx="10" fill="#fff" stroke="#e9edef" />
          <path d="M96 80l8 12-16-12z" fill="#fff" />
          <rect x="22" y="24" width="44" height="6" rx="3" fill="#a6d8a0" />
          <rect x="22" y="36" width="30" height="6" rx="3" fill="#a6d8a0" />
          <rect x="54" y="52" width="44" height="6" rx="3" fill="#dfe5e7" />
          <rect x="54" y="64" width="28" height="6" rx="3" fill="#dfe5e7" />
        </svg>
      </div>
      <h2 className={s.emptyState__title}>GREEN-API Chat</h2>
      <p className={s.emptyState__text}>
        Выберите чат слева или создайте новый, чтобы начать переписку
      </p>
    </div>
  )
}
