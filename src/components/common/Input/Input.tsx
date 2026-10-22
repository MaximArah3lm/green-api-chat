import clsx from 'clsx'
import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import s from './Input.module.scss'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
}

export function Input({ label, hint, className, id, ...props }: IInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={clsx(s.input, className)}>
      {label && (
        <label className={s.input__label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <input id={inputId} className={s.input__field} {...props} />
      {hint && <span className={s.input__hint}>{hint}</span>}
    </div>
  )
}
