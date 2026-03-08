'use client';

import { useScaling } from '@/components/layout/ScalingLayout';
import type { Information } from '@/types';
import Image from 'next/image';
import { DarkScroller } from '../common/Scroller';

interface IntroProps {
  information: Information[];
}

const Intro = ({ information }: IntroProps) => {
  const { scaledVh } = useScaling();

  if (!information || information.length === 0) {
    return null;
  }

  return (
    <div style={{ height: scaledVh(100) }} className="relative flex justify-center items-center w-full p-9">
      <div className="md:relative flex flex-col md:flex-row justify-between items-center w-full max-w-[1200px] gap-9">
        <div className="flex flex-col gap-7 shrink-0 self-start md:self-center z-10">
          <div className="flex flex-col gap-4">
            <p className="text-40 text-luna-bright font-medium">{information[0].moto},</p>
            <p className="text-96 text-luna-purple font-extrabold">LUNA</p>
          </div>
          <p className="text-wrap text-20 max-w-[500px]">
            <strong>LUNA</strong>는 한국디지털미디어고등학교의 <strong>유일한 IT 소셜벤처 동아리</strong>로 다양한
            사회적 문제들을 해결하고 <strong>모두가 함께 살 수 있는 세상을 만들기 위해 노력하고 있습니다.</strong>
          </p>
        </div>
        <Image
          className="self-end md:self-center md:absolute md:right-0"
          src="/images/home/luna_model.png"
          alt="luna_model"
          width={500}
          height={418}
          draggable={false}
          priority={true}
        />
      </div>
      <DarkScroller />
    </div>
  );
};

export default Intro;
