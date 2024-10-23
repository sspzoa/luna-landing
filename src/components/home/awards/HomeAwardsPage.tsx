import {use} from 'react';
import HomeAwards from "@/components/home/awards/HomeAwards";

export async function fetchInformation() {
    const res = await fetch(`https://api.notion.com/v1/databases/${process.env.INFORMATION_DATABASE_ID}/query`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            Accept: 'application/json',
            'Notion-Version': '2022-02-22',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NOTION_API_KEY}`
        },
    });

    return await res.json();
}

export default function HomeAwardsPage() {
    const data = use(fetchInformation());

    return <HomeAwards data={data}/>;
}
