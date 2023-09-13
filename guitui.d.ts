import { EnumConfigSetup, TLBR_KEY_INDEX_ENUM } from "./shell/_utils/_constants.ts"

export type CreateMutable<T> = { -readonly [P in keyof T]: T[P]; };
export type KeyValueType<T> = {[k:string]:T}
export type OneOrMany<T> = T | T[];
export type OrNull<T> = T|null

type TomlSectionType = {
  id: string,
  label: string,
  active: boolean,
  disabled?: boolean,
  fillCharacter?: string,
  x: number|string|Array<number|string>,
  y: number|string|Array<number|string>,
  w: number|string|Array<number|string>,
  h: number|string|Array<number|string>,
  scriptSrc:string
}
type TomlConfigType = {

}

export type TomlType =  {
  project: string,
  created: string,
  version: string,
  owner: { "@": string },
  sections: TomlSectionType[],
  CONFIG?: {
    RENDER?: EnumConfigSetup[],
    [k:string]:unknown}
}

export type TlbrKeyEnumStrings = keyof typeof TLBR_KEY_INDEX_ENUM;

export type TLBRobjWithEnumKeyType={[j in TlbrKeyEnumStrings]: {
    _i: number;
    _coord: [number,number];
    ADJACENT?: unknown;
  };
};
export type BluePrintType = {
  DIMENSION: {
    h: number,
    w: number,
  },
  SubSectionGrids:{
    [k:string]:{
      subGridIndexes:number[],
    }},
  SubSectionCoordsMap:{[k:string]:{
      bounds:[number,number,number,number]
      tlbr:TLBRobjWithEnumKeyType,
    }
  },
  TUI:TomlType,
}