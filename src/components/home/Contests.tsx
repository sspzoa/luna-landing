'use client';

import { Information } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface ContestsProps {
  information: Information[];
}

const Contests = ({ information }: ContestsProps) => {
  if (!information || information.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full py-50 p-9">
      <div className="relative flex flex-col md:flex-row justify-between items-center w-full max-w-[1200px] gap-9">
        <div className="self-start flex flex-col gap-4 shrink-0 z-10">
          <div className="flex flex-col gap-3">
            <p className="text-32 font-medium">
              <strong className="text-luna-purple">{information[0].contests}개</strong>의 대회,
              <br />
              <strong className="text-luna-purple">{information[0].prizemoney}만원</strong>의 상금 및 지원금
            </p>
            <p className="text-wrap text-20 max-w-[500px]">
              루나는 사회 문제 해결 의지와 능력을 인정받고자 하였고, 그 결과 지금까지{' '}
              <strong>{information[0].contests}개의 대회에 출전</strong>하여{' '}
              <strong>상금 및 지원금으로 총 {information[0].prizemoney}만원</strong>을 받았습니다.
            </p>
          </div>
          <Link href="/awards" className="flex flex-row items-center gap-2 opacity-50 hover:opacity-25 duration-300">
            <p className="text-14 font-semibold">루나의 업적 알아보기</p>
            <Image src="/icons/arrow_forward_ios.svg" alt="arrow_forward_ios" width={16} height={16} />
          </Link>
        </div>
        <Image
          alt="award"
          width={500}
          height={418}
          draggable={false}
          className="md:self-center md:absolute md:right-0 self-end rounded-3xl aspect-[1.5] object-cover"
          src="/images/home/award.webp"
        />
      </div>
    </div>
  );
};

export default Contests;
