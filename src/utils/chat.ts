import type { IChat } from '@/types/chat.types'
import { formatPhone } from './phone'

export function getChatTitle(chat: IChat) {
  if (chat.phone) return formatPhone(chat.phone)
  return chat.name || 'Неизвестный контакт'
}
