import { fetchProjects } from '@/lib/luna-data';
import type { Project } from '@/lib/types';
import Intro from './intro';
import ProjectsList from './list';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  let projects: Project[];

  try {
    projects = await fetchProjects();
  } catch (error) {
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-screen px-9">
        <p className="text-20 font-medium opacity-70">프로젝트 데이터를 불러오지 못했습니다.</p>
        <p className="text-16 opacity-50">잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Intro year={currentYear - 1} />
      <ProjectsList projects={projects} />
    </div>
  );
}
