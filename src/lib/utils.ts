import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { redirect } from "react-router-dom";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function hash(h:string){
  location.hash = ""
  location.hash = h
}
export function change(r:string){
 redirect(r)
 return null
}