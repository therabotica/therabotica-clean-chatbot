// app/chat/[id]/page.tsx

import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { DataStreamHandler } from '@/components/data-stream-handler';



export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    notFound();
  }

  const cookieStore = cookies();
  const modelIdFromCookie = (await cookieStore).get('chat-model');

  return (
    <>
      <Chat
        id={id}
        initialMessages={[]}
        initialChatModel={modelIdFromCookie?.value || DEFAULT_CHAT_MODEL}
        initialVisibilityType="default"
        isReadonly={false}
        session={null}
        autoResume={false}
      />
      <DataStreamHandler chatId={id} />
    </>
  );
}