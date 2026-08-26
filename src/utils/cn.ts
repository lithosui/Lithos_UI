import { clsx, type ClassArray, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassArray) => {
  return twMerge(clsx(inputs))
}

export type LithosClass = ClassValue
