'use client';

import HeroSection from '@/components/common/HeroSection';
import { LightScroller } from '@/components/common/Scroller';
import Image from 'next/image';

interface IntroProps {
  year: number;
}

export default function Intro({ year }: IntroProps) {
  return (
    <HeroSection scroller={<LightScroller />}>
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/projects/background.png"
          alt="Projects background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#000] opacity-50" />
      </div>

      <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center justify-center gap-4 px-1 sm:gap-7">
        <p className="text-center text-64 font-extrabold text-luna-white">{year}년의 루나</p>
        <p className="max-w-[40rem] text-center text-20 text-luna-white opacity-80">
          작년 한 해 동안 LUNA에서는 어떤 활동들을 통해 사회적 문제들을 해결했을까요?
          <br />
          <strong className="font-semibold"> 스크롤하여 더 확인해보세요!</strong>
        </p>
      </div>
    </HeroSection>
  );
}
