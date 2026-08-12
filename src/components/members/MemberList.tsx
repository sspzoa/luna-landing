'use client';

import Container from '@/components/common/Container';
import FilterChips from '@/components/common/FilterChips';
import NotionImage from '@/components/common/NotionImage';
import Section from '@/components/common/Section';
import type { Member } from '@/lib/types';
import { useMemo, useState } from 'react';

interface MemberListProps {
  members: Member[];
}

function groupMembers(members: Member[]) {
  const grouped: Record<string, Member[]> = {};

  for (const member of members) {
    const gen = member.lunaGeneration || '기타';
    if (!grouped[gen]) grouped[gen] = [];
    grouped[gen].push(member);
  }

  for (const gen of Object.keys(grouped)) {
    grouped[gen].sort((a, b) => {
      const genA = Number.parseInt(a.generation?.match(/\d+/)?.[0] || '999', 10);
      const genB = Number.parseInt(b.generation?.match(/\d+/)?.[0] || '999', 10);
      return genA - genB;
    });
  }

  const generations = Array.from(
    new Set(members.map((member) => member.lunaGeneration).filter(Boolean) as string[]),
  ).sort((a, b) => {
    const numA = Number.parseInt(a.match(/\d+/)?.[0] || '0', 10);
    const numB = Number.parseInt(b.match(/\d+/)?.[0] || '0', 10);
    return numB - numA;
  });

  let defaultGeneration = '';
  if (generations.length > 0) {
    const newestGeneration = generations[0];
    if (grouped[newestGeneration]?.length <= 3) {
      defaultGeneration = generations.length > 1 ? generations[1] : newestGeneration;
    } else {
      defaultGeneration = newestGeneration;
    }
  }

  return { grouped, generations, defaultGeneration };
}

export default function MemberList({ members }: MemberListProps) {
  const { grouped, generations, defaultGeneration } = useMemo(() => groupMembers(members), [members]);
  const [selectedGeneration, setSelectedGeneration] = useState(defaultGeneration);
  const activeGeneration = selectedGeneration || defaultGeneration;
  const visibleMembers = grouped[activeGeneration] ?? [];

  return (
    <Section className="gap-25">
      <div className="flex flex-col items-center justify-center gap-7">
        <p className="text-48 font-bold">{activeGeneration}</p>
        <FilterChips
          options={generations}
          value={activeGeneration}
          onChange={setSelectedGeneration}
          align="center"
          className="max-w-[1200px]"
        />
      </div>

      <Container className="grid grid-cols-2 gap-20 md:grid-cols-3">
        {visibleMembers.map((member) => (
          <article key={member.id} className="flex flex-col items-center justify-center gap-5">
            <p className="text-16 font-semibold opacity-50">{member.position || 'Member'}</p>
            <NotionImage
              className="size-[140px] shrink-0 rounded-full"
              pageId={member.id}
              image={member.image}
              fallback="/images/members/default.svg"
              alt={`${member.name} profile`}
              width={140}
              height={140}
              objectFit="cover"
            />
            <div className="flex flex-col items-center justify-center gap-1.5">
              <p className="text-24 font-semibold">{member.name}</p>
              <p className="text-16 font-medium opacity-50">
                {member.generation} {member.class}
              </p>
            </div>
            <div className="flex min-h-[54px] min-w-[220px] items-center justify-center rounded-full border border-luna-dark-10 px-4 py-3">
              <p className="text-center text-16 font-medium text-luna-dark opacity-50">{member.description || ''}</p>
            </div>
          </article>
        ))}
      </Container>
    </Section>
  );
}
