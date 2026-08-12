'use client';

import { cn } from '@/lib/cn';
import { notionImageSrc } from '@/lib/image-utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface NotionImageProps {
  pageId: string;
  image: string | null | undefined;
  fallback: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  objectFit?: 'cover' | 'contain';
}

export default function NotionImage({
  pageId,
  image,
  fallback,
  alt,
  width,
  height,
  className,
  objectFit = 'cover',
}: NotionImageProps) {
  const src = notionImageSrc(pageId, image, fallback);
  const [loaded, setLoaded] = useState(src === fallback);
  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';

  useEffect(() => {
    setLoaded(src === fallback);
  }, [src, fallback]);

  if (src === fallback) {
    return (
      <Image
        className={cn(fitClass, className)}
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        draggable={false}
        unoptimized
      />
    );
  }

  return (
    <span className={cn('relative block overflow-hidden', className)}>
      <Image
        className={fitClass}
        src={fallback}
        alt=""
        fill
        sizes={`${width}px`}
        draggable={false}
        unoptimized
        aria-hidden
      />
      <Image
        className={cn(fitClass, 'transition-opacity duration-300', loaded ? 'opacity-100' : 'opacity-0')}
        src={src}
        alt={alt}
        fill
        sizes={`${width}px`}
        draggable={false}
        unoptimized
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
    </span>
  );
}
