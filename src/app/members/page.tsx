import ErrorState from '@/components/common/ErrorState';
import Intro from '@/components/members/Intro';
import MemberList from '@/components/members/MemberList';
import { fetchMembers } from '@/lib/luna-data';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '멤버',
  description:
    'LUNA 1기부터 현재까지의 크루원과 명예 멤버를 소개합니다. 디미고 IT 소셜벤처 동아리 루나와 함께한 사람들입니다.',
  alternates: { canonical: '/members' },
  openGraph: {
    title: '멤버 | LUNA',
    description: 'LUNA 기수별 멤버와 명예 동아리원을 소개합니다.',
    url: '/members',
  },
};

export default async function MembersPage() {
  try {
    const members = await fetchMembers();

    return (
      <div className="flex w-full flex-col items-center justify-center">
        <Intro members={members} />
        <MemberList members={members} />
      </div>
    );
  } catch {
    return <ErrorState message="멤버 정보를 불러오지 못했어요." />;
  }
}
