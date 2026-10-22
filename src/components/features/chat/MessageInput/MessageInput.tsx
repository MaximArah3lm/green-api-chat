import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent, KeyboardEvent } from 'react'
import { Button } from '@/components/common/Button/Button'
import { SendIcon } from '@/components/common/icons'
import { useAppDispatch } from '@/store/hooks'
import { sendTextMessage } from '@/store/slices/messagesSlice'
import s from './MessageInput.module.scss'

// ограничение GREEN-API
const MAX_LENGTH = 20000

interface IMessageInputProps {
  chatId: string
}

export function MessageInput({ chatId }: IMessageInputProps) {
  const dispatch = useAppDispatch()
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [chatId])

  const resize = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  const send = () => {
    const value = text.trim()
    if (!value) return

    dispatch(sendTextMessage({ chatId, text: value }))
    setText('')
    requestAnimationFrame(resize)
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    resize()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      send()
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    send()
  }

  return (
    <form className={s.messageInput} onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className={s.messageInput__field}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Введите сообщение"
        rows={1}
        maxLength={MAX_LENGTH}
      />
      <Button
        type="submit"
        variant="icon"
        className={s.messageInput__send}
        disabled={!text.trim()}
        aria-label="Отправить"
      >
        <SendIcon />
      </Button>
    </form>
  )
}
