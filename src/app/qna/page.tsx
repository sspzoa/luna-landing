import { fetchQnA } from '@/lib/luna-data';
import type { QnA } from '@/lib/types';
import QnaSection from './section';

export const dynamic = 'force-dynamic';

export default async function QnaPage() {
  let qna: QnA[];

  try {
    qna = await fetchQnA();
  } catch (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-screen px-9">
        <p className="text-20 font-medium opacity-70">질문 데이터를 불러오지 못했습니다.</p>
        <p className="text-16 opacity-50">잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <QnaSection qna={qna} />
    </div>
  );
}
