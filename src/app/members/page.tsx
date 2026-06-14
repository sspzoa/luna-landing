import Intro from '@/components/members/Intro';
import MemberList from '@/components/members/MemberList';
import { fetchMembers } from '@/lib/luna-data';
import type { Member } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function MembersPage() {
  let members: Member[];

  try {
    members = await fetchMembers();
  } catch (error) {
    console.error('Failed to fetch members:', error);
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-screen py-25 px-9">
        <p className="text-24 font-bold text-luna-dark">멤버 정보를 불러오지 못했어요.</p>
        <p className="text-16 opacity-50 text-luna-dark mt-2">잠시 후 다시 시도해 주세요.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Intro members={members} />
      <MemberList members={members} />
    </div>
  );
}
