import { LoginForm } from '@/components/features/auth/LoginForm/LoginForm'
import s from './LoginPage.module.scss'

export function LoginPage() {
  return (
    <div className={s.loginPage}>
      <div className={s.loginPage__logo}>GREEN-API Chat</div>
      <LoginForm />
    </div>
  )
}
