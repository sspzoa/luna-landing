'use client';

import type { Information, Project } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface ProjectsProps {
  information: Information[];
  projects: Project[];
}

const colorClasses = ['bg-luna-purple', 'bg-luna-bright', 'bg-luna-dark'];

export default function Projects({ information, projects }: ProjectsProps) {
  const chunkSize = Math.ceil(projects.length / 3) || 1;
  const projectChunks = useMemo(
    () => [projects.slice(0, chunkSize), projects.slice(chunkSize, chunkSize * 2), projects.slice(chunkSize * 2)],
    [projects, chunkSize],
  );
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getTranslateX = (rowIndex: number) => {
    const direction = rowIndex % 2 === 0 ? -1 : 1;
    return `translateX(${scrollY * 0.3 * direction}px)`;
  };

  if (!information || information.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-20 py-50">
      <div className="w-full max-w-[1272px] items-start justify-start px-9">
        <p className="text-left text-32 font-medium">루나의 크루원들은 지금까지 자발적으로</p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-3 overflow-hidden">
        {projectChunks.map((chunk, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="flex flex-row items-center justify-center gap-4"
            style={{
              transform: getTranslateX(rowIndex),
              width: 'max-content',
              minWidth: '100%',
            }}>
            {chunk.map((project, index) => (
              <div
                key={project.id}
                className={`flex items-center justify-center rounded-full px-15 py-4 ${colorClasses[index % colorClasses.length]}`}>
                <p className="max-w-[200px] truncate text-16 font-semibold text-luna-white">
                  {project.name || `프로젝트 ${rowIndex * chunkSize + index + 1}`}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex w-full max-w-[1272px] flex-col items-end justify-end gap-4 px-9">
        <p className="text-right text-32 font-medium">
          <strong className="text-luna-purple">{information[0].projects}개의 프로젝트</strong>를 진행하며
          <br />
          사회적인 가치를 창출하고자 하였습니다.
        </p>
        <Link
          href="/projects"
          className="flex flex-row items-center justify-end gap-2 opacity-50 duration-300 hover:opacity-25">
          <p className="text-right text-14 font-semibold">루나가 진행한 프로젝트 보러가기</p>
          <Image src="/icons/arrow_forward_ios.svg" alt="arrow_forward_ios" width={16} height={16} />
        </Link>
      </div>
    </div>
  );
}
