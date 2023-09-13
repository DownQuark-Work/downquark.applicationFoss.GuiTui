import { chalq } from "../_deps.ts";
import { char } from "./characters.ts";
import { OneOrMany } from "../../guitui.d.ts";

const BorderChars = [ char.borderCorner, char.borderH, char.borderScroll, char.borderV, ]

const _removeChalq = (val:OneOrMany<string>):string[] => {
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