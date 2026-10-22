import { useState } from 'react'
import type { FormEvent } from 'react'
import { getStateInstance } from '@/api/greenApi'
import { Button } from '@/components/common/Button/Button'
import { Input } from '@/components/common/Input/Input'
import { config } from '@/config'
import { useAppDispatch } from '@/store/hooks'
import { loggedIn } from '@/store/slices/authSlice'
import { getErrorMessage, getInstanceStateMessage } from '@/utils/errors'
import s from './LoginForm.module.scss'

export function LoginForm() {
  const dispatch = useAppDispatch()

  const [apiUrl, setApiUrl] = useState(config.apiUrl)
  const [idInstance, setIdInstance] = useState(config.idInstance)
  const [apiTokenInstance, setApiTokenInstance] = useState(config.apiTokenInstance)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const credentials = {
      apiUrl: apiUrl.trim() || config.apiUrl,
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
    }

    if (!/^\d+$/.test(credentials.idInstance)) {
      setError('idInstance должен состоять только из цифр')
      return
    }

    setIsLoading(true)

    try {
      const { stateInstance } = await getStateInstance(credentials)

      if (stateInstance === 'authorized') {
        dispatch(loggedIn(credentials))
      } else {
        setError(getInstanceStateMessage(stateInstance))
      }
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={s.loginForm} onSubmit={handleSubmit}>
      <h1 className={s.loginForm__title}>Вход</h1>
      <p className={s.loginForm__subtitle}>
        Введите данные инстанса из{' '}
        <a
          className={s.loginForm__link}
          href="https://console.green-api.com"
          target="_blank"
          rel="noreferrer"
        >
          личного кабинета GREEN-API
        </a>
      </p>

      <div className={s.loginForm__fields}>
        <Input
          label="idInstance"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          placeholder="1101000001"
          inputMode="numeric"
          autoComplete="off"
          required
        />
        <Input
          label="apiTokenInstance"
          type="password"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
          placeholder="Токен инстанса"
          autoComplete="off"
          required
        />
        <Input
          label="apiUrl"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          placeholder={config.apiUrl}
          hint="Можно оставить по умолчанию или указать адрес из личного кабинета"
        />
      </div>

      {error && (
        <p className={s.loginForm__error} role="alert">
          {error}
        </p>
      )}

      <Button type="submit" className={s.loginForm__submit} loading={isLoading}>
        {isLoading ? 'Проверяем...' : 'Войти'}
      </Button>
    </form>
  )
}
