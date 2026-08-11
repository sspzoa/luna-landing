import Contests from '@/components/home/Contests';
import Future from '@/components/home/Future';
import Intro from '@/components/home/Intro';
import MadeBy from '@/components/home/MadeBy';
import Projects from '@/components/home/Projects';
import { fetchInformation, fetchProjects } from '@/lib/luna-data';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/seo';
import type { Information, Project } from '@/lib/types';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
};

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
      <div className="flex min-h-dvh w-full flex-col items-center justify-center px-5">
        <p className="text-20 text-luna-dark/70 sm:text-24">데이터를 불러오지 못했습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Intro information={information} />
      <Projects information={information} projects={projects} />
      <Contests information={information} />
      <Future />
      <MadeBy />
    </div>
  );
}
