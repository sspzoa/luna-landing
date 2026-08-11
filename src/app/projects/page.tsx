import ErrorState from '@/components/common/ErrorState';
import Intro from '@/components/projects/Intro';
import ProjectsList from '@/components/projects/ProjectsList';
import { fetchProjects } from '@/lib/luna-data';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '프로젝트',
  description:
    'LUNA 크루원들이 진행한 IT·소셜벤처 프로젝트를 연도별로 살펴보세요. 기술로 사회 문제를 해결한 루나의 활동 기록입니다.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: '프로젝트 | LUNA',
    description: 'LUNA가 진행한 IT·소셜벤처 프로젝트를 연도별로 소개합니다.',
    url: '/projects',
  },
};

export default async function ProjectsPage() {
  try {
    const projects = await fetchProjects();
    const currentYear = new Date().getFullYear();

    return (
      <div className="flex w-full flex-col items-center justify-center">
        <Intro year={currentYear} />
        <ProjectsList projects={projects} />
      </div>
    );
  } catch {
    return <ErrorState message="프로젝트 데이터를 불러오지 못했습니다." />;
  }
}
