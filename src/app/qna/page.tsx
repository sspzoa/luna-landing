import { fetchQnA } from '@/lib/luna-data';
import type { QnA } from '@/lib/types';
import type { Metadata } from 'next';
import QnaSection from './section';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Q&A',
  description:
    'LUNA(루나)에 대해 자주 묻는 질문과 답변을 모았습니다. 디미고 IT 소셜벤처 동아리 지원·활동이 궁금하다면 확인해 보세요.',
  alternates: { canonical: '/qna' },
  openGraph: {
    title: 'Q&A | LUNA',
    description: 'LUNA에 대해 자주 묻는 질문과 답변을 확인하세요.',
    url: '/qna',
  },
};

export default async function QnaPage() {
  let qna: QnA[];

  try {
    qna = await fetchQnA();
  } catch {
    return (
      <div className="flex min-h-dvh w-full flex-col items-center justify-center px-5">
        <p className="text-16 font-medium opacity-70 sm:text-20">질문 데이터를 불러오지 못했습니다.</p>
        <p className="text-14 opacity-50 sm:text-16">잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <QnaSection qna={qna} />
    </div>
  );
}
