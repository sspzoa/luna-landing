'use client';

import { DarkScroller } from '@/components/common/Scroller';
import { useScaling } from '@/components/layout/ScalingLayout';
import { formatPrizeMoney } from '@/lib/format';
import type { Information } from '@/lib/types';
import Image from 'next/image';
import type React from 'react';

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
            <strong>지금까지 총 {formatPrizeMoney(information[0]?.prizemoney || 0)}의 상금 및 지원금</strong>을
            받았습니다.
          </p>
        </div>
      </div>
      <DarkScroller />
    </div>
  );
};

export default Intro;
