"use client";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "motion/react";
import { LoaderCircle } from "lucide-react";

export function LoadingSwap({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid items-center justify-items-center cursor-pointer">
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2",
          isLoading ? "invisible" : "visible"
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2 text-center",
          isLoading ? "visible" : "invisible"
        )}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
      >
        <LoaderCircle />
      </motion.div>
    </div>
  );
}
