'use client';

import { LightScroller } from '@/components/common/Scroller';
import { useScaling } from '@/components/layout/ScalingLayout';
import { isDataInitializedAtom, membersAtom } from '@/store';
import type { Member } from '@/types';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import type React from 'react';

export default function Members() {
  const members = useAtomValue(membersAtom);
  const isDataInitialized = useAtomValue(isDataInitializedAtom);

  if (!isDataInitialized) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Intro members={members} />
      <MemberList members={members} />
    </div>
  );
}

interface IntroProps {
  members: Member[];
}

const Intro: React.FC<IntroProps> = ({ members }) => {
  const { scaledVh } = useScaling();

  const highestGeneration = useMemo(() => {
    if (!members || members.length === 0) return 0;

    let highest = 0;
    for (const member of members) {
      if (member.lunaGeneration) {
        const match = member.lunaGeneration.match(/LUNA\s+(\d+)기/);
        if (match?.[1]) {
          const generationNumber = Number.parseInt(match[1]);
          if (!Number.isNaN(generationNumber) && generationNumber > highest) {
            highest = generationNumber;
          }
        }
      }
    }

    return highest;
  }, [members]);

  return (
    <div style={{ height: scaledVh(100) }} className="relative flex justify-center items-center w-full p-9">
      <div className="absolute inset-0 bg-[url(/images/members/background.png)] bg-cover bg-center" />
      <div className="absolute inset-0 bg-[#000] opacity-50" />

      <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-[1200px] gap-9 relative z-10">
        <div className="flex flex-col gap-7 justify-center items-center">
          <p className="text-64 text-luna-white font-extrabold">Members of LUNA</p>
          <p className="text-20 opacity-80 text-luna-white text-center">
            2018년부터 지금의 LUNA가 있기까지,
            <br />
            <strong className="font-semibold">LUNA의 목표를 향해 함께 달려가고 있는</strong>
            <br />
            1기부터 {highestGeneration}기까지의 멤버들과 명예 동아리원들입니다.
          </p>
        </div>
      </div>
      <LightScroller />
    </div>
  );
};

interface MembersProps {
  members: Member[];
}

const MemberList: React.FC<MembersProps> = ({ members }) => {
  const currentYear = new Date().getFullYear();

  const [selectedGeneration, setSelectedGeneration] = useState<string>('');

  const membersByGeneration = useMemo(() => {
    const grouped: Record<string, Member[]> = {};

    for (const member of members) {
      const gen = member.lunaGeneration || '기타';
      if (!grouped[gen]) {
        grouped[gen] = [];
      }
      grouped[gen].push(member);
    }

    for (const gen of Object.keys(grouped)) {
      grouped[gen].sort((a, b) => {
        const genA = Number.parseInt(a.generation?.match(/\d+/)?.[0] || '999');
        const genB = Number.parseInt(b.generation?.match(/\d+/)?.[0] || '999');
        return genA - genB;
      });
    }

    const generationSet = new Set<string>();
    for (const member of members) {
      if (member.lunaGeneration) {
        generationSet.add(member.lunaGeneration);
      }
    }

    const generations = Array.from(generationSet).sort((a, b) => {
      const numA = Number.parseInt(a.match(/\d+/)?.[0] || '0');
      const numB = Number.parseInt(b.match(/\d+/)?.[0] || '0');
      return numB - numA;
    });

    let defaultGeneration = '';
    if (generations.length > 0) {
      const newestGeneration = generations[0];

      if (grouped[newestGeneration] && grouped[newestGeneration].length <= 3) {
        defaultGeneration = generations.length > 1 ? generations[1] : newestGeneration;
      } else {
        defaultGeneration = newestGeneration;
      }
    }

    if (!selectedGeneration && defaultGeneration) {
      setSelectedGeneration(defaultGeneration);
    }

    const activeGeneration = selectedGeneration || defaultGeneration;

    return { grouped, generations, activeGeneration };
  }, [members, selectedGeneration]);

  function shouldUseDefaultImage(member: Member): boolean {
    if (member.lunaGeneration === '명예 멤버') return true;

    if (!member.generation) return false;

    const match = member.generation.match(/(\d+)기/);
    if (!match?.[1]) return false;

    const generationNumber = Number.parseInt(match[1]);
    if (Number.isNaN(generationNumber)) return false;

    return generationNumber <= currentYear - 2004;
  }

  return (
    <div className="py-25 px-9 flex flex-col justify-center items-center w-full gap-25">
      <div className="flex flex-col justify-center items-center gap-7">
        <p className="text-48 font-bold">{membersByGeneration.activeGeneration}</p>
        <div className="flex flex-row flex-wrap justify-center items-center gap-4 max-w-[1200px]">
          {membersByGeneration.generations.map((generation) => (
            <div
              key={generation}
              className={`${
                generation === selectedGeneration
                  ? 'border border-luna-purple bg-luna-purple'
                  : 'border border-luna-dark-10'
              } py-3 px-4 rounded-full cursor-pointer transition-all duration-300`}
              onClick={() => setSelectedGeneration(generation)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedGeneration(generation);
                }
              }}
              aria-pressed={generation === selectedGeneration}>
              <p
                className={`${
                  generation === selectedGeneration ? 'text-luna-white' : 'opacity-50'
                } text-14 font-medium`}>
                {generation}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 max-w-[1200px] w-full gap-20">
        {membersByGeneration.grouped[selectedGeneration || membersByGeneration.activeGeneration]?.map((member) => (
          <div key={member.id} className="flex flex-col justify-center items-center gap-5">
            <p className="text-16 opacity-50 font-semibold">{member.position || 'Member'}</p>
            <Image
              className="rounded-full object-cover aspect-square"
              src={
                shouldUseDefaultImage(member)
                  ? '/images/members/default.svg'
                  : member.image || '/images/members/default.svg'
              }
              alt={`${member.name} profile`}
              width={140}
              height={140}
              draggable={false}
              priority={true}
            />
            <div className="flex flex-col justify-center items-center gap-1.5">
              <p className="text-24 font-semibold">{member.name}</p>
              <p className="font-16 font-medium opacity-50">
                {member.generation} {member.class}
              </p>
            </div>
            <div className="min-w-[220px] min-h-[54px] py-3 px-4 flex justify-center items-center border border-luna-dark-10 rounded-full">
              <p className="text-luna-dark opacity-50 text-16 font-medium text-center">{member.description || ''}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
