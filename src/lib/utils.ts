import { COLORS } from "@/constants/color";
import { TCamera } from "@/types/canvas";
import { type ClassValue, clsx } from "clsx";
import { PointerEvent } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateColorWithConnectionId(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export function canvasPointerEvent(e: PointerEvent, camera: TCamera) {
  return {
    x: Math.floor(e.clientX) - camera.x,
    y: Math.floor(e.clientY) - camera.y,
  };
}
