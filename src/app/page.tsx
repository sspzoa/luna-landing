'use client';

import Contests from '@/components/home/Contests';
import Future from '@/components/home/Future';
import Intro from '@/components/home/Intro';
import MadeBy from '@/components/home/MadeBy';
import Projects from '@/components/home/Projects';
import { informationAtom, isDataInitializedAtom, projectsAtom } from '@/store';
import { useAtomValue } from 'jotai';

export default function Home() {
  const information = useAtomValue(informationAtom);
  const projects = useAtomValue(projectsAtom);
  const isDataInitialized = useAtomValue(isDataInitializedAtom);

  if (!isDataInitialized) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Intro information={information} />
      <Projects information={information} projects={projects} />
      <Contests information={information} />
      <Future />
      <MadeBy />
    </div>
  );
}
