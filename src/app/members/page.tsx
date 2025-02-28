// src/app/members/page.tsx
'use client';

import React from 'react';
import { useAtomValue } from 'jotai';
import {
  informationAtom,
  isDataInitializedAtom
} from '@/store';

export default function Members() {
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