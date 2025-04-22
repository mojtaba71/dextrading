"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({ subsets: ["latin"] });

export default function Logo({withName = true}: {withName?: boolean}) {
  return (
    <motion.div
      whileHover={{}}
      whileTap={{
        scale: 0.9,
      }}
      className="flex items-center justify-center gap-2 outline-none"
    >
      <div className="relative w-7 h-7">
        <Image
          src="/dextrading-logo.svg"
          alt="Dextrading logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {withName && <span
        className={`hidden md:block text-accent-foreground text-lg font-semibold md:text-lg lg:text-xl ${firaCode.className}`}
      >
        DexTrading
      </span>}
    </motion.div>
  );
}
