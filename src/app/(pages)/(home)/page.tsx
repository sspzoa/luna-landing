'use client';

import { useAwards, useInformation, useProjects } from '@/shared/hooks/useApi';
import { enrichInformationWithStats } from '@/shared/lib/format';
import { useMemo } from 'react';
import { Contests, Future, Intro, MadeBy, Projects } from './(components)';

export default function Home() {
  const { data: information = [], isLoading: informationLoading } = useInformation();
  const { data: awards = [], isLoading: awardsLoading } = useAwards();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();

  const enrichedInformation = useMemo(
    () => enrichInformationWithStats(information, awards, projects),
    [information, awards, projects],
  );

  const isLoading = informationLoading || awardsLoading || projectsLoading;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Intro information={enrichedInformation} isLoading={isLoading} />
      <Projects information={enrichedInformation} projects={projects} isLoading={isLoading} />
      <Contests information={enrichedInformation} isLoading={isLoading} />
      <Future />
      <MadeBy />
    </div>
  );
}
