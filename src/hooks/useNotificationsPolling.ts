import { useEffect } from 'react'
import { deleteNotification, receiveNotification } from '@/api/greenApi'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectCredentials } from '@/store/slices/authSlice'
import { messageReceived } from '@/store/slices/messagesSlice'
import type { INotificationBody } from '@/types/api.types'
import type { IIncomingMessage } from '@/types/chat.types'
import { isPersonalChat } from '@/utils/phone'

const POLL_DELAY = 2000
const ERROR_DELAY = 5000

// нужны только текстовые сообщения из личных чатов
function parseIncomingMessage(body: INotificationBody): IIncomingMessage | null {
  if (body.typeWebhook !== 'incomingMessageReceived') return null

  const chatId = body.senderData?.chatId
  if (!chatId || !isPersonalChat(chatId) || !body.idMessage) return null

  const data = body.messageData
  const text = data?.textMessageData?.textMessage || data?.extendedTextMessageData?.text || null
  if (!text) return null

  return {
    id: body.idMessage,
    chatId,
    text,
    timestamp: body.timestamp * 1000,
    senderName: body.senderData?.senderName || body.senderData?.chatName,
  }
}

export function useNotificationsPolling() {
  const dispatch = useAppDispatch()
  const credentials = useAppSelector(selectCredentials)

  useEffect(() => {
    if (!credentials) return

    const controller = new AbortController()
    let timerId: ReturnType<typeof setTimeout>

    const poll = async () => {
      let delay = 0

      try {
        const notification = await receiveNotification(credentials, controller.signal)

        if (notification) {
          const message = parseIncomingMessage(notification.body)
          if (message) {
            dispatch(messageReceived(message))
          } else if (import.meta.env.DEV) {
            console.info('[polling] пропущено уведомление', notification.body)
          }

          // если не удалить, придёт ещё раз
          await deleteNotification(credentials, notification.receiptId, controller.signal)
        } else {
          delay = POLL_DELAY
        }
      } catch (error) {
        if (controller.signal.aborted) return

        console.error(error)
        delay = ERROR_DELAY
      }

      if (!controller.signal.aborted) {
        timerId = setTimeout(poll, delay)
      }
    }

    poll()

    return () => {
      controller.abort()
      clearTimeout(timerId)
    }
  }, [credentials, dispatch])
}
