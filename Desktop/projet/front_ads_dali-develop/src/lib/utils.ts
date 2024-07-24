import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof localStorage !== "undefined") {
    const savedState = localStorage.getItem(key);

    if (savedState) {
      return JSON.parse(savedState);
    } else {
      return defaultValue;
    }
  } else {
    return defaultValue;
  }
}

export function setInLocalStorage<T>(key: string, value: T) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
