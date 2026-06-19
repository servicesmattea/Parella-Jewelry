"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useMemo } from "react";
import { beadPathPoint } from "@/lib/beadPath";
import StoneBead2D from "./StoneBead2D";

const COLORS = [
  "#1349FF",
  "#E7B9C4",
  "#E2B33C",
  "#2A4B9B",
  "#B9A17E",
  "#2FA0A0",
  "#8E6BBF",
  "#7A1F2B",
];
const COUNT = 17;

/**
 * The signature hero moment: a thread that gently composes itself, bead
 * by bead, then releases — the same gesture the configurator below asks
 * the visitor to perform themselves.
 */
export default function LivingThread() {
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(progress, 1, {
      duration: 3.4,
      ease: [0.45, 0, 0.2, 1],
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.7,
    });
    return () => controls.stop();
  }, [reduceMotion, progress]);

  const points = useMemo(
    () => Array.from({ length: COUNT }, (_, i) => beadPathPoint(i / (COUNT - 1))),
    []
  );
  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth={0.45}
        />
      </svg>
      {points.map((p, i) => (
        <Bead
          key={i}
          x={p.x}
          y={p.y}
          index={i}
          progress={progress}
          hex={COLORS[i % COLORS.length]}
        />
      ))}
    </div>
  );
}

function Bead({
  x,
  y,
  index,
  progress,
  hex,
}: {
  x: number;
  y: number;
  index: number;
  progress: MotionValue<number>;
  hex: string;
}) {
  const threshold = index / COUNT;
  const opacity = useTransform(progress, [threshold - 0.07, threshold, 1], [0, 1, 1]);
  const scale = useTransform(
    progress,
    [threshold - 0.07, threshold, Math.min(1, threshold + 0.1)],
    [0.3, 1.2, 1]
  );

  return (
    <motion.span
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        translateX: "-50%",
        translateY: "-50%",
        opacity,
        scale,
      }}
    >
      <StoneBead2D hex={hex} index={index} size={17} />
    </motion.span>
  );
}
