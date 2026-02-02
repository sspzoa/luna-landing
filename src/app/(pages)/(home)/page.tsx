'use client';

import { useInformation, useProjects } from '@/shared/hooks/useApi';
import { Contests, Future, Intro, MadeBy, Projects } from './(components)';

export default function Home() {
  const { data: information = [], isLoading: informationLoading } = useInformation();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();

  const isLoading = informationLoading || projectsLoading;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Intro information={information} isLoading={informationLoading} />
      <Projects information={information} projects={projects} isLoading={isLoading} />
      <Contests information={information} isLoading={informationLoading} />
      <Future />
      <MadeBy />
    </div>
  );
}
