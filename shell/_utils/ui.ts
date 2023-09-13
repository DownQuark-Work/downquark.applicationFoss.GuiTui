import { chalq } from "../_deps.ts";
import { char } from "./characters.ts";
import { OneOrMany } from "../../guitui.d.ts";

//const styledVal = section.active ? section.fillCharacter||'' : chalq.dim(section.fillCharacter||'')
// Grid.Set.Cells({location:subGrid.subGridIndexes,value:section.fillCharacter||''})

const BorderChars = [ char.borderCorner, char.borderH, char.borderScroll, char.borderV, ]

const _removeChalq = (val:OneOrMany<string>):string[] => {
  // "\x1b[40m\x1b[93m⎯\x1b[39m\x1b[49m" <- background AND forground
  const valArr = Array.isArray(val) ? val : val.split('')
  return valArr.map(v => v.replace(/\x1b\[\d+m/gi,''))
}

const _setActiveUI = (val:OneOrMany<string>):string[] => _removeChalq(val)
                                                            .map(v => BorderChars.includes(v)
                                                              ? chalq.bgBlack(chalq.brightYellow(v))
                                                              : v)

const _setInactiveUI = (val:OneOrMany<string>) => _removeChalq(val).map(v => chalq.dim(v))


export const UI = {
  Active: _setActiveUI,
  Base: _removeChalq,
  Inactive: _setInactiveUI,
}