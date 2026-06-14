'use client';

import type { Award } from '@/lib/types';
import Image from 'next/image';
import type React from 'react';
import { useMemo, useState } from 'react';

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
                <p className="text-24 font-bold text-luna-bright">{award.prize}</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-row justify-between items-center gap-2">
                  <p className="text-14 text-wrap font-medium text-luna-dark opacity-50">
                    {award.team} - {award.members?.join(', ')}
                  </p>
                  <p className="text-14 font-medium text-luna-dark opacity-50 shrink-0">
                    {formatDate(award.date?.start ?? undefined)}
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

export default AwardsList;
