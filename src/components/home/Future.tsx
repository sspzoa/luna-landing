'use client';

import Section from '@/components/common/Section';
import Image from 'next/image';

const animationItems = [
  {
    src: '/images/home/future/circle1.png',
    alt: 'circle1',
    width: 70,
    height: 70,
    className:
      'pointer-events-none absolute z-40 h-auto w-[10%] min-w-8 max-w-[70px] -bottom-[12%] -left-[10%] sm:-bottom-20 sm:-left-[70px] sm:w-[70px]',
    delay: '0.2s',
  },
  {
    src: '/images/home/future/circle2.png',
    alt: 'circle2',
    width: 180,
    height: 180,
    className:
      'pointer-events-none absolute z-30 h-auto w-[22%] min-w-16 max-w-[180px] -bottom-[14%] -left-[4%] sm:-bottom-[90px] sm:-left-10 sm:w-[180px]',
    delay: '0.1s',
  },
  {
    src: '/images/home/future/circle3.png',
    alt: 'circle3',
    width: 280,
    height: 280,
    className:
      'pointer-events-none absolute z-10 h-auto w-[32%] min-w-24 max-w-[280px] -top-[8%] -right-[12%] sm:-top-[70px] sm:-right-[120px] sm:w-[280px]',
    delay: '0.3s',
  },
  {
    src: '/images/home/future/luna.png',
    alt: 'luna',
    width: 160,
    height: 160,
    className:
      'pointer-events-none absolute z-10 h-auto w-[18%] min-w-12 max-w-[160px] -top-[12%] -left-[6%] sm:-top-[100px] sm:-left-[50px] sm:w-[160px]',
    delay: '0.4s',
  },
  {
    src: '/images/home/future/hand.png',
    alt: 'hand',
    width: 430,
    height: 430,
    className:
      'pointer-events-none absolute z-10 h-auto w-[48%] min-w-28 max-w-[430px] -right-[18%] -bottom-[28%] sm:-right-[240px] sm:-bottom-[240px] sm:w-[430px]',
    delay: '0s',
  },
] as const;

export default function Future() {
  return (
    <Section className="overflow-hidden py-16 sm:py-28 md:py-50">
      <div className="relative isolate mx-auto w-full max-w-[min(900px,100%)] px-1 sm:px-4">
        <div className="relative z-20 rounded-[24px] border-2 border-[#fff6] bg-[#C7C7C71A] px-5 py-10 backdrop-blur-sm sm:rounded-[40px] sm:px-12 sm:py-16 md:rounded-[50px] md:px-20 md:py-25">
          <p className="text-center text-28 font-medium">
            루나는 앞으로도 여러분들과 함께
            <br />
            <strong>IT기술을 바탕으로 평등한 세상을 만들자는</strong>
            <br />
            목표를 향하여 무한히 달려나갈 것입니다
          </p>
        </div>

        {animationItems.map((item, index) => (
          <Image
            key={item.alt}
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className={item.className}
            style={{ animation: 'bounce 4s infinite', animationDelay: item.delay }}
            draggable={false}
            priority={index < 3}
            sizes="(max-width: 640px) 40vw, 430px"
          />
        ))}
      </div>
    </Section>
  );
}
