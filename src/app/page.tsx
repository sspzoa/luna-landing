// src/app/page.tsx
'use client';

import { DarkScroller } from '@/components/common/Scroller';
import { informationAtom, isDataInitializedAtom, projectsAtom } from '@/store';
import type { Information, Project } from '@/types';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function Home() {
  const information = useAtomValue(informationAtom);
  const projects = useAtomValue(projectsAtom);
  const isDataInitialized = useAtomValue(isDataInitializedAtom);

  if (!isDataInitialized) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Intro information={information} />
      <Projects information={information} projects={projects} />
    </div>
  );
}

interface IntroProps {
  information: Information[];
}

const Intro: React.FC<IntroProps> = ({ information }) => {
  return (
    <div className="flex justify-center items-center w-full min-h-[100dvh] p-9">
      <div className="flex flex-row justify-between items-center w-full max-w-[1200px]">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-4">
            <p className="text-40 text-luna-bright font-medium">{information[0].moto},</p>
            <p className="text-96 text-luna-purple font-extrabold">LUNA</p>
          </div>
          <p className="text-wrap text-20 max-w-[500px]">
            <strong>LUNA</strong>는 한국디지털미디어고등학교의 <strong>유일한 IT 소셜벤처 동아리</strong>로 다양한
            사회적 문제들을 해결하고 <strong>모두가 함께 살 수 있는 세상을 만들기 위해 노력하고 있습니다.</strong>
          </p>
        </div>
        <Image
          className="hidden md:block"
          src="/images/home/luna_model.png"
          alt="luna_model"
          width={500}
          height={418}
          draggable={false}
        />
      </div>
      <DarkScroller />
    </div>
  );
};

interface ProjectProps {
  information: Information[];
  projects: Project[];
}

const Projects: React.FC<ProjectProps> = ({ information, projects }) => {
  const chunkSize = Math.ceil(projects.length / 3);
  const projectChunks = [
    projects.slice(0, chunkSize),
    projects.slice(chunkSize, chunkSize * 2),
    projects.slice(chunkSize * 2),
  ];

  const colorClasses = ['bg-luna-purple', 'bg-luna-bright', 'bg-luna-dark'];

  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
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

  return (
    <div className="flex flex-col justify-center items-center w-full py-40 gap-20">
      <div className="max-w-[1200px] w-full justify-start items-start">
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
      <div className="max-w-[1200px] w-full flex flex-col justify-end items-end gap-4">
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
