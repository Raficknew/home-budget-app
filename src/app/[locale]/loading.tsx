"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Image
          src="/images/HozzyPurpleAvatar.svg"
          alt="HozzyAvatar"
          height={100}
          width={100}
        />
      </motion.div>
    </div>
  );
}
