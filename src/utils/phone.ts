// +7 (900) 123-45-67 -> 79001234567
export function normalizePhone(value: string) {
  let digits = value.replace(/\D/g, '')

  // 8 900... -> 7 900...
  if (digits.length === 11 && digits.startsWith('8')) {
    digits = '7' + digits.slice(1)
  }

  return digits
}

export function isValidPhone(digits: string) {
  return /^\d{11,15}$/.test(digits)
}

export function phoneToChatId(phone: string) {
  return `${phone}@c.us`
}

// 79001234567@c.us или новый формат 120650379300963@lid
export function isPersonalChat(chatId: string) {
  return chatId.endsWith('@c.us') || chatId.endsWith('@lid')
}

export function chatIdToPhone(chatId: string) {
  return chatId.endsWith('@c.us') ? chatId.split('@')[0] : ''
}

export function formatPhone(phone: string) {
  return '+' + phone
}
