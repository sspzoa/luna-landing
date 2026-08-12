'use client';

import Container from '@/components/common/Container';
import HeroSection from '@/components/common/HeroSection';
import { DarkScroller } from '@/components/common/Scroller';
import { formatPrizeMoney } from '@/lib/format';
import type { Information } from '@/lib/types';
import Image from 'next/image';

interface IntroProps {
  information: Information;
}

export default function Intro({ information }: IntroProps) {
  return (
    <HeroSection scroller={<DarkScroller />}>
      <Container className="relative flex h-full w-full flex-col-reverse items-center justify-center gap-6 md:flex-row-reverse md:justify-between md:gap-9">
        <Image
          className="h-auto w-full max-w-[280px] self-center object-contain sm:max-w-[360px] md:absolute md:left-0 md:max-w-[397px] md:self-center"
          src="/images/awards/main.webp"
          alt="LUNA 업적"
          width={397}
          height={301}
          draggable={false}
          priority
        />
        <div className="z-10 flex w-full shrink-0 flex-col gap-4 self-center md:max-w-[min(100%,600px)] md:gap-7 md:self-center">
          <div className="flex flex-col gap-2 sm:gap-4">
            <p className="text-right text-36 font-medium text-luna-bright">세상을 비추는 달,</p>
            <p className="text-right text-84 font-extrabold text-luna-purple">루나의 업적</p>
          </div>
          <p className="max-w-[600px] self-end text-wrap text-right text-20">
            모든 사회 구성원이 평등하길 바라는 LUNA는{' '}
            <strong>
              2018년부터 동아리 내에서 팀을 이루어 {information.contests}개의 대회 등, 다양한 외부 활동에 참여
            </strong>
            하였습니다. 그 결과 LUNA는 능력을 인정받고{' '}
            <strong>지금까지 총 {formatPrizeMoney(information.prizemoney)}의 상금 및 지원금</strong>을 받았습니다.
          </p>
        </div>
      </Container>
    </HeroSection>
  );
}
