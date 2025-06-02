import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-lite',
      contents:
        "창업이나 기업가 정신과 관련된 신기하고 재미있는 사실을 한 문장으로 알려줘. 30-50자 내외로, '알고 계셨나요?' 같은 서두 없이 바로 사실만, 마크다운 없이 평문으로. 예: '구글의 첫 서버는 레고 블록으로 만들어졌습니다'",
    });

    const factText = response.text;

    return NextResponse.json({ fact: factText });
  } catch (error) {
    console.error('Error fetching Gemini:', error);
    return NextResponse.json({ fact: '재미있는 사실을 불러오는 데 실패했어요. 🥲' }, { status: 500 });
  }
}
