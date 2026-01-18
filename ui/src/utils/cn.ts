import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function to merge and conditionally apply Tailwind classes.
 */
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}