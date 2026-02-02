'use client';

import { getImageUrl, isExternalUrl, shouldPrioritizeImage } from '@/shared/lib/image-utils';
import Image, { type ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src?: string;
  fallbackSrc?: string;
  index?: number;
}

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
