'use client';

import { DarkScroller } from '@/components/common/Scroller';
import { useScaling } from '@/components/layout/ScalingLayout';
import { awardsAtom, informationAtom, isDataInitializedAtom } from '@/store';
import type { Award, Information } from '@/types';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import type React from 'react';
import { useMemo, useState } from 'react';

export default function Awards() {
  const information = useAtomValue(informationAtom);
  const awards = useAtomValue(awardsAtom);
  const isDataInitialized = useAtomValue(isDataInitializedAtom);

  if (!isDataInitialized) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Intro information={information} />
      <AwardsList awards={awards} />
    </div>
  );
}

interface IntroProps {
  information: Information[];
}

const Intro: React.FC<IntroProps> = ({ information }) => {
  const { scaledVh } = useScaling();
  return (
    <div style={{ height: scaledVh(100) }} className="relative flex justify-center items-center w-full p-9">
      <div className="relative flex flex-col-reverse md:flex-row-reverse justify-between items-center w-full max-w-[1200px] gap-9">
        <Image
          className="self-start  md:self-center md:absolute md:left-0"
          src="/images/awards/main.webp"
          alt="luna_model"
          width={397}
          height={301}
          draggable={false}
          priority={true}
        />
        <div className="flex flex-col gap-7 shrink-0 self-end md:self-center z-10">
          <div className="flex flex-col gap-4">
            <p className="text-36 text-luna-bright font-medium text-right">{information[0]?.moto},</p>
            <p className="text-84 text-luna-purple font-extrabold text-right">루나의 업적</p>
          </div>
          <p className="text-wrap text-20 max-w-[600px] text-right">
            모든 사회 구성원이 평등하길 바라는 LUNA는{' '}
            <strong>
              2018년부터 동아리 내에서 팀을 이루어 {information[0]?.contests}개의 대회 등, 다양한 외부 활동에 참여
            </strong>
            하였습니다. 그 결과 LUNA는 능력을 인정받고{' '}
            <strong>지금까지 총 {information[0]?.prizemoney}만원의 상금 및 지원금</strong>을 받았습니다.
          </p>
        </div>
      </div>
      <DarkScroller />
    </div>
  );
};

interface AwardsProps {
  awards: Award[];
}

const AwardsList: React.FC<AwardsProps> = ({ awards }) => {
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(awards.map((award) => award.year))).filter(Boolean) as string[];
    return uniqueYears.sort((a, b) => Number.parseInt(b) - Number.parseInt(a));
  }, [awards]);

  const lastYear = String(new Date().getFullYear() - 1);

  const defaultYear = years.includes(lastYear) ? lastYear : years[0];

  const [selectedYear, setSelectedYear] = useState<string>(defaultYear);

  const filteredAwards = useMemo(() => {
    return awards.filter((award) => award.year === selectedYear);
  }, [awards, selectedYear]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <div className="py-25 px-9 flex flex-col justify-center items-center w-full gap-25">
      <div className="flex flex-col justify-start items-start gap-7 max-w-[1200px] w-full">
        <p className="text-48 font-bold">
          <strong className="font-bold text-luna-bright">{selectedYear}</strong>년의 LUNA
        </p>
        <div className="flex flex-row flex-wrap justify-start items-center gap-4">
          {years.map((year) => (
            <div
              key={year}
              onClick={() => setSelectedYear(year)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedYear(year);
                }
              }}
              aria-pressed={selectedYear === year}
              className={`border ${
                selectedYear === year ? 'border-luna-purple bg-luna-purple' : 'border-luna-dark-10'
              } py-3 px-4 rounded-full cursor-pointer`}>
              <p className={`text-14 font-medium ${selectedYear === year ? 'text-luna-white' : 'opacity-50'}`}>
                {year}년
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 max-w-[1200px] w-full gap-x-8 gap-y-7">
        {filteredAwards.map((award) => (
          <div key={award.id} className="flex flex-col w-full border-2 border-luna-dark-10 rounded-[20px]">
            <Image
              className="rounded-t-[20px] w-full h-[180px] object-cover"
              src={award.image || '/images/awards/default.svg'}
              alt={award.name || 'award'}
              width={376}
              height={180}
              draggable={false}
            />
            <div className="p-5 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <p className="text-14 font-semibold">{award.name}</p>
                <p className="text-24 font-bold text-luna-bright">{award.prizemoney}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-row justify-between items-center gap-2">
                  <p className="text-14 text-wrap font-medium text-luna-dark opacity-50">
                    {award.team} - {award.members?.join(', ')}
                  </p>
                  <p className="text-14 font-medium text-luna-dark opacity-50 shrink-0">
                    {formatDate(award.date?.start)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredAwards.length === 0 && (
          <div className="col-span-full flex justify-center items-center p-10">
            <p className="text-18 font-medium opacity-70">{selectedYear}년에는 수상 기록이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};
