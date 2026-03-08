'use client';

import Link from 'next/link';

const MadeBy = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full pt-50 pb-100 animate-pulse">
      <p className="text-40 opacity-10">
        Refreshed by{' '}
        <Link
          className="hover:opacity-50 duration-300 font-bold text-luna-purple"
          href="https://github.com/sspzoa"
          target="_blank"
          rel="noreferrer noopener">
          sspzoa
        </Link>
      </p>
    </div>
  );
};

export default MadeBy;
