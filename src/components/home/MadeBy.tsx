import FadeIn from '@/components/common/FadeIn';
import Link from 'next/link';

export default function MadeBy() {
  return (
    <FadeIn className="flex w-full flex-col items-center justify-center pt-50 pb-100">
      <p className="text-40 opacity-10">
        Refreshed by{' '}
        <Link
          className="font-bold text-luna-purple duration-300 hover:opacity-50"
          href="https://github.com/sspzoa"
          target="_blank"
          rel="noreferrer noopener">
          sspzoa
        </Link>
      </p>
    </FadeIn>
  );
}
