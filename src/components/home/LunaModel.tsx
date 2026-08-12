'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

const MAX_ROTATE_DEG = 12;
const EASE = 0.12;

export default function LunaModel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onMove = (clientX: number, clientY: number) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = Math.max(-1, Math.min(1, (clientX - cx) / (rect.width / 2)));
      const ny = Math.max(-1, Math.min(1, (clientY - cy) / (rect.height / 2)));
      targetRef.current = {
        x: -ny * MAX_ROTATE_DEG,
        y: nx * MAX_ROTATE_DEG,
      };
    };

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) onMove(touch.clientX, touch.clientY);
    };

    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * EASE;
      current.y += (target.y - current.y) * EASE;
      wrap.style.transform = `perspective(800px) rotateX(${current.x}deg) rotateY(${current.y}deg)`;
      frameRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className="pointer-events-none will-change-transform" style={{ transformStyle: 'preserve-3d' }}>
      <Image
        src="/images/home/luna_model.png"
        alt="LUNA"
        width={500}
        height={418}
        draggable={false}
        priority
        className="h-auto w-[min(500px,70vw)] select-none"
      />
    </div>
  );
}
