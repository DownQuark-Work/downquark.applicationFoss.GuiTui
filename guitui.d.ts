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
  CONFIG?: {[k:string]:unknown}
}