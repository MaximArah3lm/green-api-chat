import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'
import s from './Button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'icon'
  loading?: boolean
}

export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}: IButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        s.button,
        variant === 'primary' && s.button_primary,
        variant === 'icon' && s.button_icon,
        loading && s.button_loading,
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  )
}
