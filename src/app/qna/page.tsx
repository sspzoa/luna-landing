// src/app/qna/page.tsx
'use client';

import { informationAtom, isDataInitializedAtom } from '@/store';
import { useAtomValue } from 'jotai';
import React from 'react';

export default function Qna() {
  const information = useAtomValue(informationAtom);
  const isDataInitialized = useAtomValue(isDataInitializedAtom);

  if (!isDataInitialized) {
    return null;
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <h1>{information[0].moto}</h1>
    </div>
  );
}
