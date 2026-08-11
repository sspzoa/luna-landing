'use client';

import SplineLoader from '@splinetool/loader';
import { useEffect, useRef } from 'react';
import { Color, Euler, OrthographicCamera, PCFShadowMap, Scene, WebGLRenderer } from 'three';

const CANVAS_SIZE = 600;
const SCENE_URL = '/model/luna.splinecode';

export default function LunaSpline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const camera = new OrthographicCamera(
      CANVAS_SIZE / -2,
      CANVAS_SIZE / 2,
      CANVAS_SIZE / 2,
      CANVAS_SIZE / -2,
      -100000,
      100000,
    );
    camera.position.set(-53.17, -10.09, 572.1);
    camera.quaternion.setFromEuler(new Euler(0, 0, 0));

    const scene = new Scene();
    scene.background = new Color('#FAFAFF');

    const loader = new SplineLoader();
    loader.load(SCENE_URL, (splineScene) => {
      scene.add(splineScene);
    });

    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFShadowMap;
    renderer.setSize(CANVAS_SIZE, CANVAS_SIZE);
    renderer.setClearColor(0x000000, 0);
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    let eventX: number | undefined;
    let eventY: number | undefined;

    const onMove = (e: Event) => {
      if ('touches' in e) {
        const touchEvent = e as TouchEvent;
        const touch = touchEvent.touches[0] || touchEvent.changedTouches[0];
        if (!touch) return;
        eventX = touch.pageX;
        eventY = touch.pageY;
      } else if (
        e.type === 'mousedown' ||
        e.type === 'mouseup' ||
        e.type === 'mousemove' ||
        e.type === 'mouseover' ||
        e.type === 'mouseout' ||
        e.type === 'mouseenter' ||
        e.type === 'mouseleave'
      ) {
        const mouseEvent = e as MouseEvent;
        eventX = mouseEvent.clientX;
        eventY = mouseEvent.clientY;
      }

      if (eventX === undefined || eventY === undefined) return;

      const rect = renderer.domElement.getBoundingClientRect();
      const x = eventX - rect.left - CANVAS_SIZE / 2;
      const y = eventY - rect.top - CANVAS_SIZE / 2;
      scene.rotation.y = x / 4000;
      scene.rotation.x = y / 4000;
    };

    const mouseTypes = [
      'mousedown',
      'mouseup',
      'mousemove',
      'mouseover',
      'mouseout',
      'mouseenter',
      'mouseleave',
    ] as const;
    const touchTypes = ['touchstart', 'touchmove', 'touchend', 'touchcancel'] as const;

    for (const type of mouseTypes) {
      document.addEventListener(type, onMove, { passive: true });
    }
    for (const type of touchTypes) {
      document.addEventListener(type, onMove, { passive: true });
    }
    window.addEventListener('scroll', onMove, { passive: true });

    return () => {
      renderer.setAnimationLoop(null);
      renderer.dispose();
      for (const type of mouseTypes) {
        document.removeEventListener(type, onMove);
      }
      for (const type of touchTypes) {
        document.removeEventListener(type, onMove);
      }
      window.removeEventListener('scroll', onMove);
      scene.clear();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="luna3d"
      className="pointer-events-none block h-[600px] w-[600px]"
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      aria-hidden
    />
  );
}
