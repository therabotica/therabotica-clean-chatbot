import { cookies } from 'next/headers'
import { Chat } from '@/components/chat'
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models'
import { generateUUID } from '@/lib/utils'
import { DataStreamHandler } from '@/components/data-stream-handler'

export default async function Page() {
  const id = generateUUID()
  const cookieStore = cookies()
  const modelIdFromCookie = cookieStore.get('chat-model')

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        initialModelId={modelIdFromCookie?.value || DEFAULT_CHAT_MODEL.id}
      />
      <DataStreamHandler chatId={id} />
    </>
  )
}
