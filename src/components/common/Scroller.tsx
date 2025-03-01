'use client';

import Image from 'next/image';

const scroll = () => {
  window.scrollBy({
    top: window.innerHeight,
    behavior: 'smooth',
  });
};

export function DarkScroller() {
  return (
    <div
      className="absolute bottom-20 flex flex-col items-center gap-2 cursor-pointer"
      onClick={scroll}
      onKeyDown={scroll}
      aria-label="Scroll down">
      <div className="animate-bounce">
        <Image src="/icons/arrow_dark.svg" alt="arrow_dark" width={36} height={36} draggable={false} />
      </div>
      <p className="text-14 font-semibold">스크롤하여 더 알아보기</p>
    </div>
  );
}

export function LightScroller() {
  return (
    <div
      className="absolute bottom-20 flex flex-col items-center gap-2 cursor-pointer"
      onClick={scroll}
      onKeyDown={scroll}
      aria-label="Scroll down">
      <div className="animate-bounce">
        <Image src="/icons/arrow_light.svg" alt="arrow_light" width={36} height={36} draggable={false} />
      </div>
      <p className="text-luna-white text-14 font-semibold">스크롤하여 더 알아보기</p>
    </div>
  );
}
