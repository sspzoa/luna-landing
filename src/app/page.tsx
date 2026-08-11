import ErrorState from '@/components/common/ErrorState';
import Contests from '@/components/home/Contests';
import Future from '@/components/home/Future';
import Intro from '@/components/home/Intro';
import MadeBy from '@/components/home/MadeBy';
import Projects from '@/components/home/Projects';
import { getHomeData } from '@/lib/luna-data';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/seo';
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
  try {
    const { information, projects } = await getHomeData();

    return (
      <div className="flex w-full flex-col items-center justify-center">
        <Intro information={information} />
        <Projects information={information} projects={projects} />
        <Contests information={information} />
        <Future />
        <MadeBy />
      </div>
    );
  } catch {
    return <ErrorState />;
  }
}
