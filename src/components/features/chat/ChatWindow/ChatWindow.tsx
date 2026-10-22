import { useAppDispatch } from '@/store/hooks'
import { chatClosed } from '@/store/slices/chatsSlice'
import type { IChat } from '@/types/chat.types'
import { getChatTitle } from '@/utils/chat'
import { ChatHeader } from '../ChatHeader/ChatHeader'
import { MessageInput } from '../MessageInput/MessageInput'
import { MessageList } from '../MessageList/MessageList'

interface IChatWindowProps {
  chat: IChat
}

export function ChatWindow({ chat }: IChatWindowProps) {
  const dispatch = useAppDispatch()

  return (
    <>
      <ChatHeader title={getChatTitle(chat)} onBack={() => dispatch(chatClosed())} />
      <MessageList chatId={chat.chatId} />
      {/* key, чтобы текст сбрасывался при смене чата */}
      <MessageInput key={chat.chatId} chatId={chat.chatId} />
    </>
  )
}
