'use client';

import { LightScroller } from '@/components/common/Scroller';
import { useScaling } from '@/components/layout/ScalingLayout';
import type { Member } from '@/lib/types';
import Image from 'next/image';
import { useMemo } from 'react';
import type React from 'react';

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
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/members/background.png"
          alt="Members background"
          fill
          sizes="100vw"
          className="object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-[#000] opacity-50" />
      </div>

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

export default Intro;
