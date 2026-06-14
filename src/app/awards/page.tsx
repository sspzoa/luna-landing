import AwardsList from '@/components/awards/AwardsList';
import Intro from '@/components/awards/Intro';
import { fetchAwards, fetchInformation } from '@/lib/luna-data';

export const dynamic = 'force-dynamic';

export default async function Awards() {
  try {
    const [information, awards] = await Promise.all([fetchInformation(), fetchAwards()]);

    return (
      <div className="flex flex-col justify-center items-center w-full">
        <Intro information={information} />
        <AwardsList awards={awards} />
      </div>
    );
  } catch {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center gap-8 bg-[#ffe2e2]">
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-center text-lg font-bold text-[#82181a]">
            필요한 데이터를 불러오는 중 문제가 발생했습니다. <br />
            페이지를 새로고침해 주세요.
          </p>
        </div>
      </div>
    );
  }
}
