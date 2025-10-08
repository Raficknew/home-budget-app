"use client";
import { motion, Transition } from "motion/react";
import { ReactNode } from "react";

export function AnimateButton({
  children,
  className,
  transition = {
    duration: 0.4,
    ease: "circInOut",
  },
}: {
  children: ReactNode;
  className?: string;
  transition?: Transition;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
