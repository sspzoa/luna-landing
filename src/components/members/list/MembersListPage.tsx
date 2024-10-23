import { use } from 'react';
import MembersList from './MembersList'

export async function fetchMembers() {
    const res = await fetch(`https://api.notion.com/v1/databases/${process.env.MEMBERS_DATABASE_ID}/query`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            Accept: 'application/json',
            'Notion-Version': '2022-02-22',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NOTION_API_KEY}`
        },
        body: JSON.stringify({
            sorts: [
                {
                    property: 'lunaGeneration',
                    direction: 'ascending'
                },
                {
                    property: 'generation',
                    direction: 'descending'
                },
                {
                    property: 'name',
                    direction: 'ascending'
                }
            ],
        })
    });

    return await res.json();
}

export default function MembersListPage() {
    const data = use(fetchMembers());

    return <MembersList data={data} />;
}
