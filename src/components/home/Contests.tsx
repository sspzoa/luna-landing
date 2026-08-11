import Container from '@/components/common/Container';
import FadeIn from '@/components/common/FadeIn';
import Section from '@/components/common/Section';
import { formatPrizeMoney } from '@/lib/format';
import type { Information } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface ContestsProps {
  information: Information[];
}

export default function Contests({ information }: ContestsProps) {
  if (!information || information.length === 0) {
    return null;
  }

  return (
    <Section className="py-50">
      <Container className="relative flex flex-col items-center justify-between gap-9 md:flex-row">
        <FadeIn className="z-10 flex shrink-0 flex-col gap-4 self-start">
          <div className="flex flex-col gap-3">
            <p className="text-32 font-medium">
              <strong className="text-luna-purple">{information[0].contests}개</strong>의 대회,
              <br />
              <strong className="text-luna-purple">{formatPrizeMoney(information[0].prizemoney || 0)}</strong>의 상금 및
              지원금
            </p>
            <p className="max-w-[500px] text-wrap text-20">
              루나는 사회 문제 해결 의지와 능력을 인정받고자 하였고, 그 결과 지금까지{' '}
              <strong>{information[0].contests}개의 대회에 출전</strong>하여{' '}
              <strong>상금 및 지원금으로 총 {formatPrizeMoney(information[0].prizemoney || 0)}</strong>을 받았습니다.
            </p>
          </div>
          <Link href="/awards" className="flex flex-row items-center gap-2 opacity-50 duration-300 hover:opacity-25">
            <p className="text-14 font-semibold">루나의 업적 알아보기</p>
            <Image src="/icons/arrow_forward_ios.svg" alt="arrow_forward_ios" width={16} height={16} />
          </Link>
        </FadeIn>
        <FadeIn delayMs={100}>
          <Image
            alt="award"
            width={500}
            height={418}
            draggable={false}
            className="aspect-[1.5] self-end rounded-3xl object-cover md:absolute md:right-0 md:self-center"
            src="/images/home/award.webp"
          />
        </FadeIn>
      </Container>
    </Section>
  );
}
