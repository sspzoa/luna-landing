'use client';

import HeroSection from '@/components/common/HeroSection';
import { LightScroller } from '@/components/common/Scroller';
import type { Member } from '@/lib/types';
import Image from 'next/image';
import { useMemo } from 'react';

interface IntroProps {
  members: Member[];
}

export default function Intro({ members }: IntroProps) {
  const highestGeneration = useMemo(() => {
    let highest = 0;
    for (const member of members || []) {
      if (!member.lunaGeneration) continue;
      const match = member.lunaGeneration.match(/LUNA\s+(\d+)기/);
      if (!match?.[1]) continue;
      const generationNumber = Number.parseInt(match[1], 10);
      if (!Number.isNaN(generationNumber) && generationNumber > highest) {
        highest = generationNumber;
      }
    }
    return highest;
  }, [members]);

  return (
    <HeroSection scroller={<LightScroller />}>
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/members/background.png"
          alt="Members background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#000] opacity-50" />
      </div>

      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center justify-center gap-7">
        <p className="text-center text-64 font-extrabold text-luna-white">Members of LUNA</p>
        <p className="text-center text-20 text-luna-white opacity-80">
          2018년부터 지금의 LUNA가 있기까지,
          <br />
          <strong className="font-semibold">LUNA의 목표를 향해 함께 달려가고 있는</strong>
          <br />
          1기부터 {highestGeneration}기까지의 멤버들과 명예 동아리원들입니다.
        </p>
      </div>
    </HeroSection>
  );
}
