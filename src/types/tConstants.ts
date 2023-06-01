import { StaticImageData } from "next/image";

export interface tTabs {
  name: string;
  icon: StaticImageData;
}

export interface tDecalTypes {
  //   [key: string]: {
  //     stateProperty: string;
  //     filterTab: string;
  //   };
  [key: string]: Record<string, string>;
}
