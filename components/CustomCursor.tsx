'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
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
 * Minimal architectural custom cursor tailored to Dough & Co.'s
 * Le Pain Quotidien editorial palette (jet ink + warm honey-gold).
 * Activates exclusively on desktop fine-pointer devices and respects reduced motion.
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

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  // Instantaneous crisp inner dot + silky spring-physics outer ring
  const dotX = useSpring(pointerX, { stiffness: 900, damping: 45, mass: 0.25 });
  const dotY = useSpring(pointerY, { stiffness: 900, damping: 45, mass: 0.25 });
  const ringX = useSpring(pointerX, { stiffness: 260, damping: 26, mass: 0.55 });
  const ringY = useSpring(pointerY, { stiffness: 260, damping: 26, mass: 0.55 });

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const handleMove = (event: MouseEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        setVariant('default');
        return;
      }

      if (target.closest(TEXT_INPUT_SELECTOR)) {
        setVariant('hidden');
        return;
      }

      if (target.closest(INTERACTIVE_SELECTOR)) {
        setVariant('interactive');
        return;
      }

      const viewEl = target.closest<HTMLElement>('[data-cursor="view"]');
      if (viewEl) {
        setLabel(viewEl.dataset.cursorLabel || 'VIEW');
        setVariant('view');
        return;
      }

      setVariant('default');
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
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

  const ringSize =
    variant === 'view' ? 74 : variant === 'interactive' ? 48 : 32;
  const isVisible = visible && variant !== 'hidden';

  return (
    <div
      aria-hidden="true"
      data-testid="custom-cursor"
      data-variant={variant}
      className="pointer-events-none fixed inset-0 z-[100] hidden lg:block"
    >
      {/* Trailing architectural outer ring / editorial image badge */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          opacity: isVisible ? 1 : 0,
          scale: pressed ? 0.86 : 1,
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
        transition={{ duration: 0.24, ease: EDITORIAL_EASE }}
        className="fixed top-0 left-0 flex items-center justify-center rounded-full border will-change-transform"
      >
        <motion.span
          animate={{
            opacity: variant === 'view' ? 1 : 0,
            scale: variant === 'view' ? 1 : 0.75,
          }}
          transition={{ duration: 0.18, ease: EDITORIAL_EASE }}
          className="px-2 text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.16em] text-[#FFFFFF] select-none"
        >
          {label}
        </motion.span>
      </motion.div>

      {/* Instantaneous crisp center ink dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: isVisible && variant !== 'view' ? 1 : 0,
          scale: pressed ? 0.75 : variant === 'interactive' ? 0.55 : 1,
          backgroundColor: variant === 'interactive' ? '#D99B00' : '#0B0A09',
        }}
        transition={{ duration: 0.16, ease: EDITORIAL_EASE }}
        className="fixed top-0 left-0 -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full will-change-transform"
      />
    </div>
  );
}
