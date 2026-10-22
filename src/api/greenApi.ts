import type {
  ICheckWhatsappResponse,
  ICredentials,
  INotification,
  ISendMessageResponse,
  IStateInstanceResponse,
} from '@/types/api.types'
import { buildUrl } from './buildUrl'
import { http } from './http'

// в секундах, можно от 5 до 60
const RECEIVE_TIMEOUT = 60

export async function getStateInstance(credentials: ICredentials) {
  const { data } = await http.get<IStateInstanceResponse>(buildUrl(credentials, 'getStateInstance'))
  return data
}

export async function checkWhatsapp(credentials: ICredentials, phoneNumber: number) {
  const { data } = await http.post<ICheckWhatsappResponse>(buildUrl(credentials, 'checkWhatsapp'), {
    phoneNumber,
  })
  return data
}

export async function sendMessage(credentials: ICredentials, chatId: string, message: string) {
  const { data } = await http.post<ISendMessageResponse>(buildUrl(credentials, 'sendMessage'), {
    chatId,
    message,
  })
  return data
}

export async function receiveNotification(credentials: ICredentials, signal: AbortSignal) {
  const { data } = await http.get<INotification | null>(
    buildUrl(credentials, 'receiveNotification'),
    {
      params: { receiveTimeout: RECEIVE_TIMEOUT },
      // запрос может висеть до RECEIVE_TIMEOUT, обычные 15 сек не подходят
      timeout: (RECEIVE_TIMEOUT + 10) * 1000,
      signal,
    },
  )

  return data || null
}

export async function deleteNotification(
  credentials: ICredentials,
  receiptId: number,
  signal: AbortSignal,
) {
  await http.delete(buildUrl(credentials, 'deleteNotification', receiptId), { signal })
}
