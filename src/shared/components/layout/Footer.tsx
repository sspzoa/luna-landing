'use client';

import { Skeleton } from '@/shared/components/ui';
import { useInformation } from '@/shared/hooks/useApi';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: information = [], isLoading } = useInformation();

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center p-[54px] bg-[#E2E0EC]">
        <div className="max-w-[1200px] w-full flex flex-row justify-between items-center opacity-40 gap-5">
          <div className="flex flex-row justify-center items-center gap-6 self-start">
            <Image src="/icons/logo.svg" alt="logo" width={54} height={54} draggable={false} />
            <div className="flex-col flex gap-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-7 w-16" />
            </div>
          </div>
          <div className="flex flex-col items-end justify-center gap-5 self-end">
            <div className="flex flex-row gap-4 items-end justify-center">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-6 h-6 rounded" />
              ))}
            </div>
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
      </div>
    );
  }

  if (!information.length) {
    return null;
  }

  return (
    <div className="w-full flex justify-center items-center p-[54px] bg-[#E2E0EC]">
      <div className="max-w-[1200px] w-full flex flex-row justify-between items-center opacity-40 gap-5">
        <div className="flex flex-row justify-center items-center gap-6 self-start">
          <Image src="/icons/logo.svg" alt="logo" width={54} height={54} draggable={false} />
          <div className="flex-col flex gap-2">
            <p className="text-16">{information[0]?.moto},</p>
            <p className="text-24 font-semibold">LUNA</p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center gap-5 self-end">
          <div className="flex flex-row gap-4 items-end justify-center">
            <Link
              className="hover:opacity-50 duration-300"
              href="https://www.instagram.com/dimigo_luna/"
              target="_blank"
              rel="noreferrer noopener">
              <Image src="/icons/instagram.svg" alt="instagram" width={24} height={24} draggable={false} />
            </Link>
            <Link
              className="hover:opacity-50 duration-300"
              href="https://github.com/LUNA-coding"
              target="_blank"
              rel="noreferrer noopener">
              <Image src="/icons/github.svg" alt="github" width={24} height={24} draggable={false} />
            </Link>
            <Link
              className="hover:opacity-50 duration-300"
              href="https://www.youtube.com/channel/UCWfvTEUzP9b2pPTDBSi9IMg"
              target="_blank"
              rel="noreferrer noopener">
              <Image src="/icons/youtube.svg" alt="youtube" width={24} height={24} draggable={false} />
            </Link>
            <Link
              className="hover:opacity-50 duration-300"
              href="https://www.facebook.com/lunacoding/"
              target="_blank"
              rel="noreferrer noopener">
              <Image src="/icons/facebook.svg" alt="facebook" width={24} height={24} draggable={false} />
            </Link>
          </div>
          <p className="text-12 font-semibold">
            © 2018-{currentYear}{' '}
            <Link
              className="hover:opacity-50 duration-300"
              href="https://github.com/LUNA-coding"
              target="_blank"
              rel="noreferrer noopener">
              LUNA
            </Link>{' '}
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
