/**
 * OLIVAEN — Count Up Hook
 * Animates a number from 0 to a target value when visible.
 */
import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration: number = 2000, startWhen: boolean = false) {
  const [count, setCount] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!startWhen || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now();
    const startVal = 0;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(startVal + (target - startVal) * eased);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [target, duration, startWhen]);

  return count;
}
