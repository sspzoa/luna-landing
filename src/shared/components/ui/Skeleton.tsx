'use client';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse rounded-lg bg-luna-dark/10 ${className}`} />;
}

export function SkeletonText({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-4 ${className}`} />;
}

export function SkeletonHeading({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-8 ${className}`} />;
}

export function SkeletonButton({ className = '' }: SkeletonProps) {
  return <Skeleton className={`h-10 rounded-full ${className}`} />;
}

export function SkeletonCard({ className = '' }: SkeletonProps) {
  return <Skeleton className={`rounded-[20px] ${className}`} />;
}

export function SkeletonImage({ className = '' }: SkeletonProps) {
  return <Skeleton className={`rounded-3xl ${className}`} />;
}

export function SkeletonAvatar({ className = '' }: SkeletonProps) {
  return <Skeleton className={`rounded-full ${className}`} />;
}
