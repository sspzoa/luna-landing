import Contests from '@/components/home/Contests';
import Future from '@/components/home/Future';
import Intro from '@/components/home/Intro';
import MadeBy from '@/components/home/MadeBy';
import Projects from '@/components/home/Projects';
import { fetchInformation, fetchProjects } from '@/lib/luna-data';
import type { Information, Project } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let information: Information[] = [];
  let projects: Project[] = [];
  let hasError = false;

  try {
    [information, projects] = await Promise.all([fetchInformation(), fetchProjects()]);
  } catch {
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-screen px-9">
        <p className="text-24 text-luna-white/70">데이터를 불러오지 못했습니다.</p>
      </div>
    );
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
