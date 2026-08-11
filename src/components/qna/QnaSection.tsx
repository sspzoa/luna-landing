'use client';

import Container from '@/components/common/Container';
import EmptyState from '@/components/common/EmptyState';
import { cn } from '@/lib/cn';
import type { QnA } from '@/lib/types';
import { useMemo, useState } from 'react';

interface QnaSectionProps {
  qna: QnA[];
}

export default function QnaSection({ qna }: QnaSectionProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const sortedQna = useMemo(
    () =>
      [...qna].sort((a, b) => {
        const aOrder = a.order ?? Number.POSITIVE_INFINITY;
        const bOrder = b.order ?? Number.POSITIVE_INFINITY;
        return aOrder - bOrder;
      }),
    [qna],
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-center gap-30 px-9 pt-48 pb-30">
      <Container className="relative flex min-h-[315px] flex-col items-center justify-between gap-9 md:flex-row">
        <div className="z-10 flex shrink-0 flex-col gap-4 self-start md:self-center">
          <p className="text-36 font-semibold text-luna-dark">자주 묻는 질문</p>
          <p className="max-w-[435px] text-wrap text-20">
            루나에 대해서 자주 묻는 질문을 정리했습니다.
            <br />
            아래 질문들에 답변한 유튜브 영상이 있으니, <strong>궁금하시다면 영상을 시청해주세요!</strong>
          </p>
        </div>
        <iframe
          className="self-end rounded-3xl border-2 border-luna-dark-10 md:absolute md:right-0 md:self-center"
          width="560"
          height="315"
          src="https://www.youtube-nocookie.com/embed/hIX8CQHqW-M?si=MjRFgxRxhsyvhzuc"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </Container>

      <Container className="flex flex-col gap-7">
        {sortedQna.map((item) => {
          const expanded = expandedIds.has(item.id);
          return (
            <div
              key={item.id}
              className={cn(
                'flex flex-col overflow-hidden rounded-3xl border-2 border-luna-dark-10 transition-all duration-300 ease-in-out',
                expanded && 'bg-[#907fdf1a]',
              )}>
              <button
                type="button"
                className="flex cursor-pointer flex-row items-center gap-4 px-9 py-7 text-left"
                onClick={() => toggleExpand(item.id)}
                aria-expanded={expanded}
                aria-controls={`answer-${item.id}`}>
                <p className={cn('text-20 font-bold text-luna-dark', !expanded && 'opacity-[0.28]')}>Q</p>
                <p className={cn('text-20 font-medium text-luna-dark', !expanded && 'opacity-60')}>{item.question}</p>
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-300 ease-in-out',
                  expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0',
                )}>
                <hr className="mx-9 text-luna-dark-10" />
                <div className="flex flex-row justify-start gap-4 px-9 py-7" id={`answer-${item.id}`}>
                  <p className="text-20 font-bold text-luna-dark">A</p>
                  <p className="text-20 font-medium text-luna-dark">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}

        {sortedQna.length === 0 && (
          <EmptyState className="rounded-3xl border-2 border-luna-dark-10" message="현재 등록된 질문이 없습니다." />
        )}
      </Container>
    </div>
  );
}
