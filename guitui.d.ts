import { EnumConfigSetup } from "./shell/_utils/_constants.ts"

type TomlSectionType = {
  id: string,
  label: string,
  active: boolean,
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

export type BluePrintType = {
  DIMENSION: {
    h: number,
    w: number,
  },
  SubSectionGrids:{[k:string]:unknown},
  SubSectionCoordsMap:{[k:string]:[number,number,number,number]},
  TUI:TomlType,
}