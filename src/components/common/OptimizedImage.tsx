'use client';

import { getImageUrl, isExternalUrl, shouldPrioritizeImage } from '@/lib/image-utils';
import Image, { type ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src?: string;
  fallbackSrc?: string;
  index?: number;
}

/**
 * 최적화된 이미지 컴포넌트
 *
 * Next.js Image 컴포넌트를 확장하여 다음 기능을 제공합니다:
 * - 이미지가 없거나 로드 실패 시 대체 이미지 표시
 * - 외부 URL 이미지 지원
 * - 첫 번째 이미지에 우선순위 부여
 * - 이미지 드래그 방지 (선택적)
 */
const OptimizedImage = ({
  src,
  fallbackSrc = '/images/placeholder.png',
  index = -1,
  alt = '',
  width,
  height,
  draggable = false,
  ...props
}: OptimizedImageProps) => {
  const imageUrl = getImageUrl(src, fallbackSrc);

  const imageProps: Partial<ImageProps> = isExternalUrl(imageUrl) ? { unoptimized: true } : {};

  const priority = shouldPrioritizeImage(index);

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width || 500}
      height={height || 300}
      draggable={draggable}
      priority={priority}
      {...imageProps}
      {...props}
    />
  );
};

export default OptimizedImage;
