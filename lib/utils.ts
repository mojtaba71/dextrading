import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (address: string) =>
  `https://api.dextrading.com/images/${address.toLowerCase()}.png`;
