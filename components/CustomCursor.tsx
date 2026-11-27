'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { EDITORIAL_EASE } from '@/components/MotionPrimitives';

type CursorVariant = 'default' | 'interactive' | 'view' | 'hidden';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [role="tab"], select, label[for]';
const TEXT_INPUT_SELECTOR =
  'input[type="text"], input[type="search"], input[type="number"], input[type="date"], textarea';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

function subscribeFinePointer(callback: () => void) {
  const mediaQuery = window.matchMedia(FINE_POINTER_QUERY);
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

/**
 * Zero-lag GPU-composited architectural cursor for desktop fine pointers.
 * Uses pure GPU scale transforms (no width/height layout reflows) and ref-gated
 * variant transitions so mouse movement never schedules redundant React renders.
 */
export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );
  const enabled = finePointer && !prefersReduced;

  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [label, setLabel] = useState('VIEW');

  const visibleRef = useRef(false);
  const variantRef = useRef<CursorVariant>('default');
  const labelRef = useRef('VIEW');

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  // Crisp single spring for outer architectural ring; center dot locks directly to pointer
  const ringX = useSpring(pointerX, { stiffness: 360, damping: 28, mass: 0.35 });
  const ringY = useSpring(pointerY, { stiffness: 360, damping: 28, mass: 0.35 });

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const setCursorVisibility = (nextVisible: boolean) => {
      if (visibleRef.current !== nextVisible) {
        visibleRef.current = nextVisible;
        setVisible(nextVisible);
      }
    };

    const setCursorVariant = (nextVariant: CursorVariant, nextLabel?: string) => {
      if (variantRef.current !== nextVariant) {
        variantRef.current = nextVariant;
        setVariant(nextVariant);
      }
      if (nextLabel !== undefined && labelRef.current !== nextLabel) {
        labelRef.current = nextLabel;
        setLabel(nextLabel);
      }
    };

    const handleMove = (event: MouseEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setCursorVisibility(true);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        setCursorVariant('default');
        return;
      }

      if (target.closest(TEXT_INPUT_SELECTOR)) {
        setCursorVariant('hidden');
        return;
      }

      if (target.closest(INTERACTIVE_SELECTOR)) {
        setCursorVariant('interactive');
        return;
      }

      const viewEl = target.closest<HTMLElement>('[data-cursor="view"]');
      if (viewEl) {
        setCursorVariant('view', viewEl.dataset.cursorLabel || 'VIEW');
        return;
      }

      setCursorVariant('default');
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);
    const handleLeave = () => setCursorVisibility(false);
    const handleEnter = () => setCursorVisibility(true);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    window.addEventListener('mousedown', handleDown, { passive: true });
    window.addEventListener('mouseup', handleUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleLeave);
    document.documentElement.addEventListener('mouseenter', handleEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
      document.documentElement.removeEventListener('mouseenter', handleEnter);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) {
    return null;
  }

  const isVisible = visible && variant !== 'hidden';
  const baseScale =
    variant === 'view' ? 1 : variant === 'interactive' ? 0.66 : 0.44;
  const ringScale = pressed ? baseScale * 0.86 : baseScale;

  return (
    <div
      aria-hidden="true"
      data-testid="custom-cursor"
      data-variant={variant}
      className="pointer-events-none fixed inset-0 z-[100] hidden lg:block print:hidden"
    >
      {/* Fixed-box 72x72 outer ring scaled purely with GPU transform (zero layout reflow) */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: ringScale,
          opacity: isVisible ? 1 : 0,
          backgroundColor:
            variant === 'view'
              ? 'rgba(11, 10, 9, 0.92)'
              : variant === 'interactive'
                ? 'rgba(245, 195, 0, 0.16)'
                : 'rgba(255, 255, 255, 0)',
          borderColor:
            variant === 'view'
              ? '#0B0A09'
              : variant === 'interactive'
                ? '#D99B00'
                : 'rgba(11, 10, 9, 0.72)',
        }}
        transition={{ duration: 0.2, ease: EDITORIAL_EASE }}
        className="fixed top-0 left-0 -ml-[36px] -mt-[36px] flex h-[72px] w-[72px] items-center justify-center rounded-full border will-change-transform"
      >
        <motion.span
          animate={{
            opacity: variant === 'view' ? 1 : 0,
            scale: variant === 'view' ? 1 : 0.75,
          }}
          transition={{ duration: 0.16, ease: EDITORIAL_EASE }}
          className="px-2 text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.16em] text-[#FFFFFF] select-none"
        >
          {label}
        </motion.span>
      </motion.div>

      {/* Zero-lag hardware-locked center ink dot */}
      <motion.div
        style={{ x: pointerX, y: pointerY }}
        animate={{
          opacity: isVisible && variant !== 'view' ? 1 : 0,
          scale: pressed ? 0.75 : variant === 'interactive' ? 0.55 : 1,
          backgroundColor: variant === 'interactive' ? '#D99B00' : '#0B0A09',
        }}
        transition={{ duration: 0.14, ease: EDITORIAL_EASE }}
        className="fixed top-0 left-0 -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full will-change-transform"
      />
    </div>
  );
}
