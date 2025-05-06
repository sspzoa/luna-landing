'use client';

import { DarkScroller } from '@/components/common/Scroller';
import { informationAtom, isDataInitializedAtom, projectsAtom } from '@/store';
import type { Information, Project } from '@/types';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
      <Contests information={information} />
      <Future />
      <MadeBy />
    </div>
  );
}

interface IntroProps {
  information: Information[];
}

const Intro: React.FC<IntroProps> = ({ information }) => {
  return (
    <div className="relative h-[100dvh] flex justify-center items-center w-full p-9">
      <div className="md:relative flex flex-col md:flex-row justify-between items-center w-full max-w-[1200px] gap-9">
        <div className="flex flex-col gap-7 shrink-0 self-start md:self-center z-10">
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
          className="self-end md:self-center md:absolute md:right-0"
          src="/images/home/luna_model.png"
          alt="luna_model"
          width={500}
          height={418}
          draggable={false}
          priority={true}
        />
      </div>
      <DarkScroller />
    </div>
  );
};

interface ProjectsProps {
  information: Information[];
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ information, projects }) => {
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

interface ContestsProps {
  information: Information[];
}

const Contests: React.FC<ContestsProps> = ({ information }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full py-50 p-9">
      <div className="relative flex flex-col md:flex-row justify-between items-center w-full max-w-[1200px] gap-9">
        <div className="self-start flex flex-col gap-4 shrink-0 z-10">
          <div className="flex flex-col gap-3">
            <p className="text-32 font-medium">
              <strong className="text-luna-purple">{information[0].contests}개</strong>의 대회,
              <br />
              <strong className="text-luna-purple">{information[0].prizemoney}만원</strong>의 상금 및 지원금
            </p>
            <p className="text-wrap text-20 max-w-[500px]">
              루나는 사회 문제 해결 의지와 능력을 인정받고자 하였고, 그 결과 지금까지{' '}
              <strong>{information[0].contests}개의 대회에 출전</strong>하여{' '}
              <strong>상금 및 지원금으로 총 {information[0].prizemoney}만원</strong>을 받았습니다.
            </p>
          </div>
          <Link href="/awards" className="flex flex-row items-center gap-2 opacity-50 hover:opacity-25 duration-300">
            <p className="text-14 font-semibold">루나의 업적 알아보기</p>
            <Image src="/icons/arrow_forward_ios.svg" alt="arrow_forward_ios" width={16} height={16} />
          </Link>
        </div>
        <Image
          alt="award"
          width={500}
          height={418}
          draggable={false}
          className="md:self-center md:absolute md:right-0 self-end rounded-3xl aspect-[1.5] object-cover"
          src="/images/home/award.webp"
        />
      </div>
    </div>
  );
};

const Future: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full py-50 overflow-hidden">
      <div className="relative isolate">
        <div className="relative px-20 py-25 bg-[#C7C7C71A] border-2 border-[#fff6] backdrop-blur-sm rounded-[50px] z-20">
          <p className="text-28 text-center font-medium">
            루나는 앞으로도 여러분들과 함께
            <br />
            <strong>IT기술을 바탕으로 평등한 세상을 만들자는</strong>
            <br />
            목표를 향하여 무한히 달려나갈 것입니다
          </p>
        </div>
        <Image
          className="absolute bottom-[-80px] left-[-70px] z-40 translate-y-[10px]"
          style={{ animation: 'bounce 4s infinite', animationDelay: '0.2s' }}
          src="/images/home/future/circle1.png"
          alt="circle1"
          width={70}
          height={70}
          draggable={false}
        />
        <Image
          className="absolute bottom-[-90px] left-[-40px] z-30 translate-y-[10px]"
          style={{ animation: 'bounce 4s infinite', animationDelay: '0.1s' }}
          src="/images/home/future/circle2.png"
          alt="circle2"
          width={180}
          height={180}
          draggable={false}
        />
        <Image
          className="absolute top-[-70px] right-[-120px] z-10 translate-y-[10px]"
          style={{ animation: 'bounce 4s infinite', animationDelay: '0.3s' }}
          src="/images/home/future/circle3.png"
          alt="circle3"
          width={280}
          height={280}
          draggable={false}
        />
        <Image
          className="absolute top-[-100px] left-[-50px] z-10 translate-y-[10px]"
          style={{ animation: 'bounce 4s infinite', animationDelay: '0.4s' }}
          src="/images/home/future/luna.png"
          alt="luna"
          width={160}
          height={160}
          draggable={false}
        />
        <Image
          className="absolute bottom-[-240px] right-[-240px] z-10 translate-y-[10px]"
          style={{ animation: 'bounce 4s infinite', animationDelay: '0s' }}
          src="/images/home/future/hand.png"
          alt="hand"
          width={430}
          height={430}
          draggable={false}
        />
      </div>
    </div>
  );
};

const MadeBy: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full pt-50 pb-100 animate-pulse">
      <p className="text-40 opacity-10">
        Refreshed by{' '}
        <Link
          className="hover:opacity-50 duration-300 font-bold"
          href="https://github.com/sspzoa"
          target="_blank"
          rel="noreferrer noopener">
          sspzoa
        </Link>
      </p>
    </div>
  );
};
