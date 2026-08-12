'use client';

import Container from '@/components/common/Container';
import HeroSection from '@/components/common/HeroSection';
import { DarkScroller } from '@/components/common/Scroller';
import LunaModel from './LunaModel';

export default function Intro() {
  return (
    <HeroSection scroller={<DarkScroller />}>
      <Container className="relative flex h-full w-full flex-col items-center justify-center gap-6 md:flex-row md:justify-between md:gap-9">
        <div className="z-10 flex w-full shrink-0 flex-col gap-4 md:max-w-[min(100%,500px)] md:gap-7 md:self-center">
          <div className="flex flex-col gap-2 sm:gap-4">
            <p className="text-40 font-medium text-luna-bright">세상을 비추는 달,</p>
            <p className="text-96 font-extrabold text-luna-purple">LUNA</p>
          </div>
          <p className="max-w-[500px] text-wrap text-20">
            <strong>LUNA</strong>는 한국디지털미디어고등학교의 <strong>유일한 IT 소셜벤처 동아리</strong>로 다양한
            사회적 문제들을 해결하고 <strong>모두가 함께 살 수 있는 세상을 만들기 위해 노력하고 있습니다.</strong>
          </p>
        </div>
        <div className="flex w-full justify-center md:absolute md:right-0 md:w-auto md:self-center">
          <LunaModel />
        </div>
      </Container>
    </HeroSection>
  );
}
