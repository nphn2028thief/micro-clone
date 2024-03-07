import { COLORS } from "@/constants/color";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateColorWithConnectionId(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}
