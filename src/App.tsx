import { ChatPage } from '@/pages/ChatPage/ChatPage'
import { LoginPage } from '@/pages/LoginPage/LoginPage'
import { useAppSelector } from '@/store/hooks'
import { selectCredentials } from '@/store/slices/authSlice'

function App() {
  const credentials = useAppSelector(selectCredentials)

  return credentials ? <ChatPage /> : <LoginPage />
}

export default App
