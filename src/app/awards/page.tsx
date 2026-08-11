import AwardsList from '@/components/awards/AwardsList';
import Intro from '@/components/awards/Intro';
import { fetchAwards, fetchInformation } from '@/lib/luna-data';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '업적',
  description:
    'LUNA가 2018년부터 참여한 대회 수상 기록과 상금·지원금 성과를 확인하세요. 디미고 IT 소셜벤처 동아리 루나의 업적입니다.',
  alternates: { canonical: '/awards' },
  openGraph: {
    title: '업적 | LUNA',
    description: 'LUNA의 대회 수상 기록과 상금·지원금 성과를 소개합니다.',
    url: '/awards',
  },
};

export default async function Awards() {
  try {
    const [information, awards] = await Promise.all([fetchInformation(), fetchAwards()]);

    return (
      <div className="flex w-full flex-col items-center justify-center">
        <Intro information={information} />
        <AwardsList awards={awards} />
      </div>
    );
  } catch {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-[#ffe2e2] px-5">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-center text-lg font-bold text-[#82181a]">
            필요한 데이터를 불러오는 중 문제가 발생했습니다. <br />
            페이지를 새로고침해 주세요.
          </p>
        </div>
      </div>
    );
  }
}
