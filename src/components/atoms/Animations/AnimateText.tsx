"use client";
import { motion, Transition } from "motion/react";

export function AnimateText({
  title,
  className,
  transition = { duration: 0.1, ease: "easeInOut" },
}: {
  title: string;
  className?: string;
  transition?: Transition;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
    >
      <h1>{title}</h1>
    </motion.div>
  );
}
