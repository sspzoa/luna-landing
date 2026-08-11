'use client';

import Container from '@/components/common/Container';
import HeroSection from '@/components/common/HeroSection';
import { DarkScroller } from '@/components/common/Scroller';
import type { Information } from '@/lib/types';
import LunaSpline from './LunaSpline';

interface IntroProps {
  information: Information[];
}

export default function Intro({ information }: IntroProps) {
  if (!information || information.length === 0) {
    return null;
  }

  return (
    <HeroSection scroller={<DarkScroller />}>
      <Container className="relative flex flex-col items-center justify-between gap-9 md:flex-row">
        <div className="z-10 flex shrink-0 flex-col gap-7 self-start md:self-center">
          <div className="flex flex-col gap-4">
            <p className="text-40 font-medium text-luna-bright">{information[0].moto},</p>
            <p className="text-96 font-extrabold text-luna-purple">LUNA</p>
          </div>
          <p className="max-w-[500px] text-wrap text-20">
            <strong>LUNA</strong>는 한국디지털미디어고등학교의 <strong>유일한 IT 소셜벤처 동아리</strong>로 다양한
            사회적 문제들을 해결하고 <strong>모두가 함께 살 수 있는 세상을 만들기 위해 노력하고 있습니다.</strong>
          </p>
        </div>
        <div className="self-end md:absolute md:right-0 md:self-center">
          <LunaSpline />
        </div>
      </Container>
    </HeroSection>
  );
}
