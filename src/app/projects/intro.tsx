'use client';

import { LightScroller } from '@/components/common/Scroller';
import { useScaling } from '@/components/layout/ScalingLayout';
import Image from 'next/image';
import type React from 'react';

interface IntroProps {
  year: number;
}

const Intro: React.FC<IntroProps> = ({ year }) => {
  const { scaledVh } = useScaling();

  return (
    <div style={{ height: scaledVh(100) }} className="relative flex justify-center items-center w-full p-9">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/projects/background.png"
          alt="Projects background"
          fill
          sizes="100vw"
          className="object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-[#000] opacity-50" />
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-[1200px] gap-9 relative z-10">
        <div className="flex flex-col gap-7 justify-center items-center">
          <p className="text-64 text-luna-white font-extrabold">{year}년의 루나</p>
          <p className="text-20 opacity-80 text-luna-white text-center">
            작년 한 해 동안 LUNA에서는 어떤 활동들을 통해 사회적 문제들을 해결했을까요?
            <br />
            <strong className="font-semibold"> 스크롤하여 더 확인해보세요!</strong>
          </p>
        </div>
      </div>
      <LightScroller />
    </div>
  );
};

export default Intro;
