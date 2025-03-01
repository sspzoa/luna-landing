// src/app/page.tsx
'use client';

import { DarkScroller } from '@/components/common/Scroller';
import { informationAtom, isDataInitializedAtom } from '@/store';
import type { Information } from '@/types';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import type React from 'react';

export default function Home() {
  const information = useAtomValue(informationAtom);
  const isDataInitialized = useAtomValue(isDataInitializedAtom);

  if (!isDataInitialized || !information.length) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Intro information={information} />
    </div>
  );
}

const Intro: React.FC<{ information: Information[] }> = ({ information }) => {
  return (
    <div className="flex justify-center items-center w-full h-screen p-9">
      <div className="flex flex-row justify-between items-center w-full max-w-[1200px]">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-4">
            <p className="text-40 text-luna-bright font-medium">{information[0].moto},</p>
            <p className="text-96 text-luna-purple font-extrabold">LUNA</p>
          </div>
          <p className="text-wrap text-20 max-w-[500px]">
            <strong>LUNA</strong>는 한국디지털미디어고등학교의 <strong>유일한 IT 소셜벤처 동아리</strong>로 다양한
            사회적 문제들을 해결하고 <strong>모두가 함께 살 수 있는 세상을 만들기 위해 노력하고 있습니다.</strong>
          </p>
        </div>
        <Image src="/images/home/luna_model.png" alt="luna_model" width={500} height={418} draggable={false} />
      </div>
      <DarkScroller />
    </div>
  );
};
