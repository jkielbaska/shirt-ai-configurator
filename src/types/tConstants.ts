import { StaticImageData } from "next/image";

export interface tTabs {
  name: string;
  icon: StaticImageData;
}

export interface tDecalTypes {
  [key: string]: Record<string, string>;
}
