"use client";
import {
  motion,
  TargetAndTransition,
  Transition,
  VariantLabels,
} from "motion/react";
import { ReactNode } from "react";

export function AnimateImage({
  children,
  className,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.4, ease: "easeOut", delay: 0.2 },
}: {
  children: ReactNode;
  className?: string;
  initial?: boolean | TargetAndTransition | VariantLabels;
  animate?: boolean | TargetAndTransition | VariantLabels;

  transition?: Transition;
}) {
  return (
    <motion.div
      className={className}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
