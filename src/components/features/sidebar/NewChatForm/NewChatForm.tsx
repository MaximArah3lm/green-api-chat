import { useState } from 'react'
import type { FormEvent } from 'react'
import { checkWhatsapp } from '@/api/greenApi'
import { Button } from '@/components/common/Button/Button'
import { Input } from '@/components/common/Input/Input'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectCredentials } from '@/store/slices/authSlice'
import { chatCreated } from '@/store/slices/chatsSlice'
import { getErrorMessage } from '@/utils/errors'
import { isValidPhone, normalizePhone, phoneToChatId } from '@/utils/phone'
import s from './NewChatForm.module.scss'

interface INewChatFormProps {
  onDone: () => void
}

export function NewChatForm({ onDone }: INewChatFormProps) {
  const dispatch = useAppDispatch()
  const credentials = useAppSelector(selectCredentials)

  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!credentials) return

    const digits = normalizePhone(phone)
    if (!isValidPhone(digits)) {
      setError('Введите номер в международном формате, например +7 900 123-45-67')
      return
    }

    setIsLoading(true)

    try {
      const { existsWhatsapp } = await checkWhatsapp(credentials, Number(digits))

      if (existsWhatsapp) {
        dispatch(chatCreated({ chatId: phoneToChatId(digits), phone: digits }))
        setPhone('')
        onDone()
      } else {
        setError('Этот номер не зарегистрирован в WhatsApp')
      }
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={s.newChat} onSubmit={handleSubmit}>
      <Input
        label="Номер получателя"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+7 900 123-45-67"
        autoFocus
      />
      {error && (
        <p className={s.newChat__error} role="alert">
          {error}
        </p>
      )}
      <div className={s.newChat__actions}>
        <Button type="submit" loading={isLoading} disabled={!phone.trim()}>
          Создать чат
        </Button>
      </div>
    </form>
  )
}
