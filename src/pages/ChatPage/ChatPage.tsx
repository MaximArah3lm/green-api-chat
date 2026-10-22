import { ChatWindow } from '@/components/features/chat/ChatWindow/ChatWindow'
import { EmptyState } from '@/components/features/chat/EmptyState/EmptyState'
import { Sidebar } from '@/components/features/sidebar/Sidebar/Sidebar'
import { Layout } from '@/components/layout/Layout/Layout'
import { useNotificationsPolling } from '@/hooks/useNotificationsPolling'
import { useAppSelector } from '@/store/hooks'
import { selectActiveChat } from '@/store/slices/chatsSlice'

export function ChatPage() {
  const activeChat = useAppSelector(selectActiveChat)

  useNotificationsPolling()

  return (
    <Layout sidebar={<Sidebar />} isChatOpen={activeChat !== null}>
      {activeChat ? <ChatWindow chat={activeChat} /> : <EmptyState />}
    </Layout>
  )
}
