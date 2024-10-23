import {use} from 'react';
import QnaList from './QnaList'

export async function fetchQna() {
    const res = await fetch(`https://api.notion.com/v1/databases/${process.env.QNA_DATABASE_ID}/query`, {
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
                    property: 'order',
                    direction: 'ascending'
                },
            ],
        })
    });

    return await res.json();
}

export default function QnaListPage() {
    const data = use(fetchQna());

    return <QnaList data={data}/>;
}
