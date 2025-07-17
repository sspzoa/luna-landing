'use client';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '루나 :: 프로젝트',
};

import { LightScroller } from '@/components/common/Scroller';
import { useScaling } from '@/components/layout/ScalingLayout';
import { isDataInitializedAtom, projectsAtom } from '@/store';
import type { Award, Member, Project } from '@/types';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import type React from 'react';
import { useMemo, useState } from 'react';

export default function Projects() {
  const projects = useAtomValue(projectsAtom);
  const isDataInitialized = useAtomValue(isDataInitializedAtom);

  if (!isDataInitialized) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Intro projects={projects} />
      <ProjectsList projects={projects} />
    </div>
  );
}

interface IntroProps {
  projects: Project[];
}

const Intro: React.FC<IntroProps> = ({ projects }) => {
  const currentYear = new Date().getFullYear();
  const { scaledVh } = useScaling();

  return (
    <div style={{ height: scaledVh(100) }} className="relative flex justify-center items-center w-full p-9">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/projects/background.png"
          alt="Projects background"
          fill
          sizes="100vw"
          className="object-cover"
          priority={true}
        />
        <div className="absolute inset-0 bg-[#000] opacity-50" />
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-[1200px] gap-9 relative z-10">
        <div className="flex flex-col gap-7 justify-center items-center">
          <p className="text-64 text-luna-white font-extrabold">{currentYear - 1}년의 루나</p>
          <p className="text-20 opacity-80 text-luna-white text-center">
            작년 한 해 동안 LUNA에서는 어떤 활동들을 통해 사회적 문제들을 해결했을까요?
            <br />
            <strong className="font-semibold"> 스크롤하여 더 확인해보세요!</strong>
          </p>
        </div>
      </div>
      <LightScroller />
    </div>
  );
};

interface ProjectsProps {
  projects: Project[];
}

const ProjectsList: React.FC<ProjectsProps> = ({ projects }) => {
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(projects.map((project) => project.year))).filter(Boolean) as string[];
    return uniqueYears.sort((a, b) => Number.parseInt(b) - Number.parseInt(a));
  }, [projects]);

  const lastYear = String(new Date().getFullYear() - 1);

  const defaultYear = years.includes(lastYear) ? lastYear : years[0];

  const [selectedYear, setSelectedYear] = useState<string>(defaultYear);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => project.year === selectedYear);
  }, [projects, selectedYear]);

  return (
    <div className="py-25 px-9 flex flex-col justify-center items-center w-full gap-25">
      <div className="flex flex-col justify-start items-start gap-7 max-w-[1200px] w-full">
        <p className="text-48 font-bold">
          <strong className="font-bold text-luna-bright">{selectedYear}</strong>년의 LUNA 프로젝트
        </p>
        <div className="flex flex-row flex-wrap justify-start items-center gap-4">
          {years.map((year) => (
            <div
              key={year}
              onClick={() => setSelectedYear(year)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedYear(year);
                }
              }}
              aria-pressed={selectedYear === year}
              className={`border ${
                selectedYear === year ? 'border-luna-purple bg-luna-purple' : 'border-luna-dark-10'
              } py-3 px-4 rounded-full cursor-pointer`}>
              <p className={`text-14 font-medium ${selectedYear === year ? 'text-luna-white' : 'opacity-50'}`}>
                {year}년
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1200px] w-full gap-x-8 gap-y-7">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-row items-center w-full border-2 border-luna-dark-10 rounded-[20px] p-7 gap-7">
            <Image
              className="aspect-square object-contain flex-shrink-0"
              src={project.image || '/images/projects/default.svg'}
              alt={project.name || 'project'}
              width={140}
              height={140}
              draggable={false}
            />
            <div className="flex flex-col gap-1.5">
              <p className="text-24 font-bold">{project.name}</p>
              <p className="text-16 font-medium text-wrap">{project.description}</p>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="col-span-full flex justify-center items-center p-10">
            <p className="text-18 font-medium opacity-70">{selectedYear}년에는 수상 기록이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};
