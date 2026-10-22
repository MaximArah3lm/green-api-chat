import { isAxiosError } from 'axios'
import type { TInstanceState } from '@/types/api.types'

export function getErrorMessage(error: unknown) {
  if (!isAxiosError(error)) {
    return 'Что-то пошло не так, попробуйте ещё раз'
  }

  // нет сети, неверный apiUrl или таймаут
  if (!error.response) {
    return 'Не удалось подключиться к серверу. Проверьте apiUrl и интернет'
  }

  switch (error.response.status) {
    case 400:
      return 'Некорректный запрос'
    case 401:
    case 403:
      return 'Неверный idInstance или apiTokenInstance'
    case 429:
      return 'Слишком много запросов, подождите немного'
    case 466:
      return 'Исчерпан лимит вашего тарифа GREEN-API'
    default:
      return `Ошибка сервера (${error.response.status})`
  }
}

const instanceStateMessages: Record<Exclude<TInstanceState, 'authorized'>, string> = {
  notAuthorized: 'Инстанс не авторизован. Отсканируйте QR-код в личном кабинете GREEN-API',
  blocked: 'Аккаунт заблокирован',
  sleepMode: 'Телефон не в сети. Проверьте, что WhatsApp на телефоне доступен',
  starting: 'Инстанс запускается, попробуйте через пару минут',
  yellowCard: 'Отправка сообщений временно ограничена WhatsApp',
}

export function getInstanceStateMessage(state: TInstanceState | undefined) {
  if (!state) return 'Сервер вернул неожиданный ответ. Проверьте apiUrl'
  if (state === 'authorized') return ''

  return instanceStateMessages[state] ?? `Инстанс недоступен (${state})`
}
