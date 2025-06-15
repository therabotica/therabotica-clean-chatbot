import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { DataStreamHandler } from '@/components/data-stream-handler';

type Params = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Params) {
  const id = params.id;

  if (!id) {
    notFound();
  }

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