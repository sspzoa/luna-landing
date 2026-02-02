'use client';

import { OptimizedImage } from '@/shared/components/common';
import { useMemo } from 'react';

const animationItems = [
  {
    src: '/images/home/future/circle1.png',
    alt: 'circle1',
    width: 70,
    height: 70,
    className: 'absolute bottom-[-80px] left-[-70px] z-40 translate-y-[10px]',
    style: { animation: 'bounce 4s infinite', animationDelay: '0.2s' },
  },
  {
    src: '/images/home/future/circle2.png',
    alt: 'circle2',
    width: 180,
    height: 180,
    className: 'absolute bottom-[-90px] left-[-40px] z-30 translate-y-[10px]',
    style: { animation: 'bounce 4s infinite', animationDelay: '0.1s' },
  },
  {
    src: '/images/home/future/circle3.png',
    alt: 'circle3',
    width: 280,
    height: 280,
    className: 'absolute top-[-70px] right-[-120px] z-10 translate-y-[10px]',
    style: { animation: 'bounce 4s infinite', animationDelay: '0.3s' },
  },
  {
    src: '/images/home/future/luna.png',
    alt: 'luna',
    width: 160,
    height: 160,
    className: 'absolute top-[-100px] left-[-50px] z-10 translate-y-[10px]',
    style: { animation: 'bounce 4s infinite', animationDelay: '0.4s' },
  },
  {
    src: '/images/home/future/hand.png',
    alt: 'hand',
    width: 430,
    height: 430,
    className: 'absolute bottom-[-240px] right-[-240px] z-10 translate-y-[10px]',
    style: { animation: 'bounce 4s infinite', animationDelay: '0s' },
  },
];

const Future = () => {
  const animationElements = useMemo(() => {
    return animationItems.map((item, index) => (
      <OptimizedImage
        key={item.alt}
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        className={item.className}
        style={item.style}
        draggable={false}
        index={index}
      />
    ));
  }, []);

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
        {animationElements}
      </div>
    </div>
  );
};

export default Future;
