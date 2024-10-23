import {use} from 'react';
import HomeProjects from "@/components/home/projects/HomeProjects";

export async function fetchProjects() {
    const res = await fetch(`https://api.notion.com/v1/databases/${process.env.PROJECTS_DATABASE_ID}/query`, {
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
                    property: 'year',
                    direction: 'ascending'
                },
                {
                    property: 'awards',
                    direction: 'ascending'
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

export default function HomeProjectsPage() {
    const data = use(fetchProjects());
    const information = use(fetchInformation());

    return <HomeProjects data={data} information={information}/>;
}
