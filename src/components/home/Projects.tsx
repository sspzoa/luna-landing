'use client';

import type { Information, Project } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';

interface ProjectsProps {
  information: Information[];
  projects: Project[];
}

const Projects = ({ information, projects }: ProjectsProps) => {
  const chunkSize = Math.ceil(projects.length / 3);

  const projectChunks = useMemo(() => {
    return [projects.slice(0, chunkSize), projects.slice(chunkSize, chunkSize * 2), projects.slice(chunkSize * 2)];
  }, [projects, chunkSize]);

  const colorClasses = ['bg-luna-purple', 'bg-luna-bright', 'bg-luna-dark'];
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getTranslateX = (rowIndex: number) => {
    const baseSpeed = 0.3;
    const direction = rowIndex % 2 === 0 ? -1 : 1;
    return `translateX(${scrollY * baseSpeed * direction}px)`;
  };

  if (!information || information.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full py-50 gap-20">
      <div className="max-w-[1272px] w-full justify-start items-start px-9">
        <p className="text-32 font-medium text-left">루나의 크루원들은 지금까지 자발적으로</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 w-full overflow-hidden">
        {projectChunks.map((chunk, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="flex flex-row justify-center items-center gap-4"
            style={{
              transform: getTranslateX(rowIndex),
              width: 'max-content',
              minWidth: '100%',
            }}>
            {chunk.map((project, index) => (
              <div
                key={project.id}
                className={`flex justify-center items-center px-15 py-4 ${colorClasses[index % colorClasses.length]} rounded-full`}>
                <p className="text-16 font-semibold text-luna-white truncate max-w-[200px]">
                  {project.name || `프로젝트 ${rowIndex * chunkSize + index + 1}`}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="max-w-[1272px] w-full flex flex-col justify-end items-end gap-4 px-9">
        <p className="text-32 font-medium text-right">
          <strong className="text-luna-purple">{information[0].projects}개의 프로젝트</strong>를 진행하며
          <br />
          사회적인 가치를 창출하고자 하였습니다.
        </p>
        <Link
          href="/projects"
          className="flex flex-row justify-end items-center gap-2 opacity-50 hover:opacity-25 duration-300">
          <p className="text-14 font-semibold text-right">루나가 진행한 프로젝트 보러가기</p>
          <Image src="/icons/arrow_forward_ios.svg" alt="arrow_forward_ios" width={16} height={16} />
        </Link>
      </div>
    </div>
  );
};

export default Projects;
