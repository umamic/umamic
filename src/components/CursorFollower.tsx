import { useEffect, useRef } from 'react';

const CursorFollower = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const move = (x: number, y: number) => {
      dot.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
    };

    const onMouseMove = (e: MouseEvent) => move(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="fixed top-0 left-0 z-[9999] h-5 w-5 rounded-full pointer-events-none border border-[hsl(var(--foreground)/0.6)] bg-[hsl(var(--foreground)/0.1)] backdrop-blur-sm mix-blend-difference transition-transform duration-75"
      style={{ transform: 'translate3d(-100px,-100px,0)' }}
    />
  );
};

export default CursorFollower;
