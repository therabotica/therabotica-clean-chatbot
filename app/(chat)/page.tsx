// app/(chat)/page.tsx

import { cookies } from 'next/headers';
import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';

export default async function Page() {
  const id = generateUUID();
  const cookieStore = await cookies();
  const modelIdFromCookie = await cookieStore.get('chat-model');

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