'use client';

import { isDataInitializedAtom, qnaAtom } from '@/store';
import type { QnA } from '@/types';
import { useAtomValue } from 'jotai';
import type React from 'react';
import { useRef, useState } from 'react';

export default function Qna() {
  const qna = useAtomValue(qnaAtom);
  const isDataInitialized = useAtomValue(isDataInitializedAtom);

  if (!isDataInitialized) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <QnaSection qna={qna} />
    </div>
  );
}

interface QnaProps {
  qna: QnA[];
}

const QnaSection: React.FC<QnaProps> = ({ qna }) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const sortedQna = [...qna].sort((a, b) => {
    if (a.order === undefined) return 1;
    if (b.order === undefined) return -1;
    return a.order - b.order;
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prevExpandedIds) => {
      const newExpandedIds = new Set(prevExpandedIds);
      if (newExpandedIds.has(id)) {
        newExpandedIds.delete(id);
      } else {
        newExpandedIds.add(id);
      }
      return newExpandedIds;
    });
  };

  return (
    <div className="relative flex flex-col gap-30 justify-center items-center w-full pt-48 pb-30 px-9">
      <div className="relative flex flex-col md:flex-row justify-between items-center w-full max-w-[1200px] min-h-[315px] gap-9">
        <div className="flex flex-col gap-4 shrink-0 self-start md:self-center z-10">
          <p className="text-36 text-luna-dark font-semibold">자주 묻는 질문</p>
          <p className="text-wrap text-20 max-w-[435px]">
            루나에 대해서 자주 묻는 질문을 정리했습니다.
            <br />
            아래 질문들에 답변한 유튜브 영상이 있으니, <strong>궁금하시다면 영상을 시청해주세요!</strong>
          </p>
        </div>
        <iframe
          className="self-end md:self-center md:absolute md:right-0 rounded-3xl border-2 border-luna-dark-10"
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/hIX8CQHqW-M?si=MjRFgxRxhsyvhzuc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="w-full max-w-[1200px] flex flex-col gap-7">
        {sortedQna.map((item) => (
          <div key={item.id}>
            <div
              className={`flex flex-col border-2 border-luna-dark-10 rounded-3xl overflow-hidden transition-all duration-300 ease-in-out ${
                expandedIds.has(item.id) ? 'bg-[#907fdf1a]' : ''
              }`}>
              <div
                className="flex flex-row items-center px-9 py-7 gap-4 cursor-pointer"
                onClick={() => toggleExpand(item.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleExpand(item.id);
                  }
                }}
                aria-expanded={expandedIds.has(item.id)}
                aria-controls={`answer-${item.id}`}>
                <p className={`font-bold text-luna-dark text-20 ${!expandedIds.has(item.id) ? 'opacity-[0.28]' : ''}`}>
                  Q
                </p>
                <p className={`font-medium text-luna-dark text-20 ${!expandedIds.has(item.id) ? 'opacity-60' : ''}`}>
                  {item.question}
                </p>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedIds.has(item.id) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <hr className="text-luna-dark-10 mx-9" />
                <div className="flex flex-row justify-start gap-4 px-9 py-7" id={`answer-${item.id}`}>
                  <p className="font-bold text-luna-dark text-20">A</p>
                  <p className="font-medium text-luna-dark text-20">{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {sortedQna.length === 0 && (
          <div className="flex justify-center items-center p-10 border-2 border-luna-dark-10 rounded-3xl">
            <p className="text-18 font-medium opacity-70">현재 등록된 질문이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};
