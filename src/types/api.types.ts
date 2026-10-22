export interface ICredentials {
  apiUrl: string
  idInstance: string
  apiTokenInstance: string
}

export type TInstanceState =
  'authorized' | 'notAuthorized' | 'blocked' | 'sleepMode' | 'starting' | 'yellowCard'

export interface IStateInstanceResponse {
  stateInstance: TInstanceState
}

export interface ICheckWhatsappResponse {
  existsWhatsapp: boolean
}

export interface ISendMessageResponse {
  idMessage: string
}

export interface IMessageData {
  typeMessage: string
  textMessageData?: {
    textMessage: string
  }
  extendedTextMessageData?: {
    text: string
  }
}

export interface INotificationBody {
  typeWebhook: string
  timestamp: number
  idMessage?: string
  senderData?: {
    chatId: string
    sender: string
    senderName?: string
    chatName?: string
  }
  messageData?: IMessageData
}

export interface INotification {
  receiptId: number
  body: INotificationBody
}
