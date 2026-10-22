export interface IChat {
  chatId: string
  phone: string
  name?: string
  unread: number
  updatedAt: number
}

export type TMessageStatus = 'pending' | 'sent' | 'error'

export type TMessageDirection = 'in' | 'out'

export interface IMessage {
  id: string
  chatId: string
  text: string
  direction: TMessageDirection
  timestamp: number
  status: TMessageStatus
}

export interface IIncomingMessage {
  id: string
  chatId: string
  text: string
  timestamp: number
  senderName?: string
}
