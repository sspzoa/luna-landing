'use client';

import type React from 'react';
import { type ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

interface ScalingContextType {
  windowWidth: number | null;
  windowHeight: number | null;
  scale: number;
  scaledVh: (vh: number) => number;
}

const ScalingContext = createContext<ScalingContextType>({
  windowWidth: null,
  windowHeight: null,
  scale: 1,
  scaledVh: (vh) => vh,
});

export const useScaling = () => useContext(ScalingContext);

interface ScalingLayoutProps {
  children: ReactNode;
  minWidth?: number;
  className?: string;
  disableScalingAboveMinWidth?: boolean;
  maxScale?: number;
  scaleStep?: number;
}

export default function ScalingLayout({
  children,
  minWidth = 700,
  className = '',
  disableScalingAboveMinWidth = true,
  maxScale = 1,
  scaleStep = 0.01,
}: ScalingLayoutProps): React.JSX.Element | null {
  const [scale, setScale] = useState<number>(1);
  const [mounted, setMounted] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [windowHeight, setWindowHeight] = useState<number | null>(null);

  const calculateScale = useCallback(
    (width: number): number => {
      let newScale: number;

      if (width < minWidth) {
        newScale = Math.max(width / minWidth, 0.1);
      } else if (disableScalingAboveMinWidth) {
        newScale = 1;
      } else {
        newScale = Math.min(width / minWidth, maxScale);
      }

      return Math.round(newScale / scaleStep) * scaleStep;
    },
    [minWidth, disableScalingAboveMinWidth, maxScale, scaleStep],
  );

  const handleResize = useCallback(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowWidth(width);
      setWindowHeight(height);
      setScale(calculateScale(width));
    }
  }, [calculateScale]);

  const scaledVh = useCallback(
    (vh: number) => {
      if (windowHeight === null) return vh;
      const pixelValue = (windowHeight * vh) / 100;
      return pixelValue / scale;
    },
    [windowHeight, scale],
  );

  useEffect(() => {
    setMounted(true);
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  if (!mounted) {
    return null;
  }

  return (
    <ScalingContext.Provider value={{ windowWidth, windowHeight, scale, scaledVh }}>
      <div
        style={{
          transformOrigin: 'left top',
          transform: `scale(${scale})`,
          width: `${(1 / scale) * 100}%`,
          height: '0px',
          position: 'relative',
        }}
        className={`${className}`}>
        {children}
      </div>
    </ScalingContext.Provider>
  );
}
