'use client';

import Container from '@/components/common/Container';
import EmptyState from '@/components/common/EmptyState';
import FilterChips from '@/components/common/FilterChips';
import NotionImage from '@/components/common/NotionImage';
import Section from '@/components/common/Section';
import { defaultYear, formatKoreanDate, uniqueSortedYears } from '@/lib/collection';
import type { Award } from '@/lib/types';
import { useMemo, useState } from 'react';

interface AwardsListProps {
  awards: Award[];
}

export default function AwardsList({ awards }: AwardsListProps) {
  const years = useMemo(() => uniqueSortedYears(awards.map((award) => award.year)), [awards]);
  const [selectedYear, setSelectedYear] = useState(() => defaultYear(years));

  const filteredAwards = useMemo(() => awards.filter((award) => award.year === selectedYear), [awards, selectedYear]);

  return (
    <Section className="gap-25">
      <Container className="flex flex-col items-start gap-7">
        <p className="text-48 font-bold">
          <strong className="font-bold text-luna-bright">{selectedYear}</strong>년의 LUNA
        </p>
        <FilterChips options={years} value={selectedYear} onChange={setSelectedYear} formatLabel={(y) => `${y}년`} />
      </Container>

      <Container className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 md:grid-cols-3">
        {filteredAwards.map((award) => (
          <article key={award.id} className="flex w-full flex-col rounded-[20px] border-2 border-luna-dark-10">
            <NotionImage
              className="h-[160px] w-full rounded-t-[20px] sm:h-[180px]"
              pageId={award.id}
              image={award.image}
              fallback="/images/awards/default.svg"
              alt={award.name || 'award'}
              width={376}
              height={180}
              objectFit="cover"
            />
            <div className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-5">
              <div className="flex flex-col gap-1.5">
                <p className="text-14 font-semibold">{award.name}</p>
                <p className="text-24 font-bold text-luna-bright">{award.prize}</p>
              </div>
              <div className="flex flex-col items-start justify-between gap-1 sm:flex-row sm:items-center sm:gap-2">
                <p className="text-wrap text-14 font-medium text-luna-dark opacity-50">
                  {award.team} - {award.members?.join(', ')}
                </p>
                <p className="shrink-0 text-14 font-medium text-luna-dark opacity-50">
                  {formatKoreanDate(award.date?.start)}
                </p>
              </div>
            </div>
          </article>
        ))}

        {filteredAwards.length === 0 && <EmptyState message={`${selectedYear}년에는 수상 기록이 없습니다.`} />}
      </Container>
    </Section>
  );
}
