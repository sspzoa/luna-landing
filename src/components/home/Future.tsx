'use client';

import Section from '@/components/common/Section';
import Image from 'next/image';
import { useMemo } from 'react';

const animationItems = [
  {
    src: '/images/home/future/circle1.png',
    alt: 'circle1',
    width: 70,
    height: 70,
    className: 'absolute z-40 translate-y-[10px]',
    style: { animation: 'bounce 4s infinite', animationDelay: '0.2s', bottom: -80, left: -70 },
  },
  {
    src: '/images/home/future/circle2.png',
    alt: 'circle2',
    width: 180,
    height: 180,
    className: 'absolute z-30 translate-y-[10px]',
    style: { animation: 'bounce 4s infinite', animationDelay: '0.1s', bottom: -90, left: -40 },
  },
  {
    src: '/images/home/future/circle3.png',
    alt: 'circle3',
    width: 280,
    height: 280,
    className: 'absolute z-10 translate-y-[10px]',
    style: { animation: 'bounce 4s infinite', animationDelay: '0.3s', top: -70, right: -120 },
  },
  {
    src: '/images/home/future/luna.png',
    alt: 'luna',
    width: 160,
    height: 160,
    className: 'absolute z-10 translate-y-[10px]',
    style: { animation: 'bounce 4s infinite', animationDelay: '0.4s', top: -100, left: -50 },
  },
  {
    src: '/images/home/future/hand.png',
    alt: 'hand',
    width: 430,
    height: 430,
    className: 'absolute z-10 translate-y-[10px]',
    style: { animation: 'bounce 4s infinite', animationDelay: '0s', bottom: -240, right: -240 },
  },
];

export default function Future() {
  const animationElements = useMemo(
    () =>
      animationItems.map((item, index) => (
        <Image
          key={item.alt}
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className={item.className}
          style={item.style}
          draggable={false}
          priority={index < 3}
        />
      )),
    [],
  );

  return (
    <Section className="overflow-hidden py-20 sm:py-50">
      <div className="relative isolate w-full max-w-[900px]">
        <div className="relative z-20 rounded-[28px] border-2 border-[#fff6] bg-[#C7C7C71A] px-6 py-12 backdrop-blur-sm sm:rounded-[50px] sm:px-20 sm:py-25">
          <p className="text-center text-28 font-medium">
            루나는 앞으로도 여러분들과 함께
            <br />
            <strong>IT기술을 바탕으로 평등한 세상을 만들자는</strong>
            <br />
            목표를 향하여 무한히 달려나갈 것입니다
          </p>
        </div>
        {animationElements}
      </div>
    </Section>
  );
}
