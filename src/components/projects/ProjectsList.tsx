'use client';

import Container from '@/components/common/Container';
import EmptyState from '@/components/common/EmptyState';
import FilterChips from '@/components/common/FilterChips';
import Section from '@/components/common/Section';
import { defaultYear, uniqueSortedYears } from '@/lib/collection';
import { notionImageSrc } from '@/lib/image-utils';
import type { Project } from '@/lib/types';
import Image from 'next/image';
import { useMemo, useState } from 'react';

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const years = useMemo(() => uniqueSortedYears(projects.map((project) => project.year)), [projects]);
  const [selectedYear, setSelectedYear] = useState(() => defaultYear(years));

  const filteredProjects = useMemo(
    () => projects.filter((project) => project.year === selectedYear),
    [projects, selectedYear],
  );

  return (
    <Section className="gap-25">
      <Container className="flex flex-col items-start gap-7">
        <p className="text-48 font-bold">
          <strong className="font-bold text-luna-bright">{selectedYear}</strong>년의 LUNA 프로젝트
        </p>
        <FilterChips options={years} value={selectedYear} onChange={setSelectedYear} formatLabel={(y) => `${y}년`} />
      </Container>

      <Container className="grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            className="flex w-full flex-row items-center gap-7 rounded-[20px] border-2 border-luna-dark-10 p-7">
            <Image
              className="aspect-square shrink-0 object-contain"
              src={notionImageSrc(project.id, project.image, '/images/projects/default.svg')}
              alt={project.name || 'project'}
              width={140}
              height={140}
              draggable={false}
              unoptimized
            />
            <div className="flex flex-col gap-1.5">
              <p className="text-24 font-bold">{project.name}</p>
              <p className="text-wrap text-16 font-medium">{project.description}</p>
            </div>
          </article>
        ))}

        {filteredProjects.length === 0 && <EmptyState message={`${selectedYear}년에는 프로젝트 기록이 없습니다.`} />}
      </Container>
    </Section>
  );
}
