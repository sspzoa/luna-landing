import Container from '@/components/common/Container';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full items-center justify-center bg-[#E2E0EC] px-5 py-10 sm:px-9 sm:py-[54px]">
      <Container className="flex flex-col items-start justify-between gap-8 opacity-40 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex flex-row items-center justify-center gap-4 self-start sm:gap-6">
          <Image
            src="/icons/logo.svg"
            alt="logo"
            width={54}
            height={54}
            draggable={false}
            className="size-10 sm:size-[54px]"
          />
          <div className="flex flex-col gap-2">
            <p className="text-16">세상을 비추는 달,</p>
            <p className="text-24 font-semibold">LUNA</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-4 self-start sm:items-end sm:gap-5 sm:self-end">
          <div className="flex flex-row items-center justify-center gap-4">
            <Link
              className="duration-300 hover:opacity-50"
              href="https://www.instagram.com/dimigo_luna/"
              target="_blank"
              rel="noreferrer noopener">
              <Image src="/icons/instagram.svg" alt="instagram" width={24} height={24} draggable={false} />
            </Link>
            <Link
              className="duration-300 hover:opacity-50"
              href="https://github.com/LUNA-coding"
              target="_blank"
              rel="noreferrer noopener">
              <Image src="/icons/github.svg" alt="github" width={24} height={24} draggable={false} />
            </Link>
            <Link
              className="duration-300 hover:opacity-50"
              href="https://www.youtube.com/channel/UCWfvTEUzP9b2pPTDBSi9IMg"
              target="_blank"
              rel="noreferrer noopener">
              <Image src="/icons/youtube.svg" alt="youtube" width={24} height={24} draggable={false} />
            </Link>
            <Link
              className="duration-300 hover:opacity-50"
              href="https://www.facebook.com/lunacoding/"
              target="_blank"
              rel="noreferrer noopener">
              <Image src="/icons/facebook.svg" alt="facebook" width={24} height={24} draggable={false} />
            </Link>
          </div>
          <p className="text-12 font-semibold">
            © 2018-{currentYear}{' '}
            <Link
              className="duration-300 hover:opacity-50"
              href="https://github.com/LUNA-coding"
              target="_blank"
              rel="noreferrer noopener">
              LUNA
            </Link>{' '}
            All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
