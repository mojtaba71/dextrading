"use client";

import React, { useState } from "react";
import networksJson from "../../utils/networks.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "../ui/input";
import useNetworkSelector from "@/store/tokenChains/networks";

function NetworkSelector() {
  const [search, setSearch] = useState("");
  const { selectedChain, setSelectedChain, availableChains } = useNetworkSelector();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-center gap-3 bg-card"
          style={{ padding: "14px", height: 44 }}
        >
          <Image
            src={selectedChain.imageUrl?.small ?? ""}
            unoptimized
            width={18}
            height={18}
            className="rounded-md"
            alt={selectedChain.attributes.name}
          />
          <p className="hidden md:block">{selectedChain.attributes.name}</p>
          <p className="block md:hidden">
            {selectedChain.attributes.abbreviation}
          </p>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full md:w-fit">
        <DialogHeader>
          <DialogTitle>Select Chain</DialogTitle>
        </DialogHeader>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Network's name"
        />
        <div className="h-[40vh] overflow-auto">
          {availableChains
            .filter((item) =>
              item.attributes.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((item) => (
              <div
                className="flex items-center gap-3 my-2 bg-accent p-2 px-4 rounded-md justify-between hover:opacity-85 cursor-pointer"
                key={item.id}
                onClick={() => {
                  setOpen(false);
                  setSelectedChain(item);
                }}
              >
                <p className="text-sm">{item.attributes.name}</p>
                <Image
                  unoptimized
                  src={item.imageUrl?.small ?? `/networks/${item.id}.png`}
                  width={32}
                  height={32}
                  alt=""
                  className="rounded-md"
                />
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NetworkSelector;
