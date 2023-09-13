import { UtilsGrid } from "../../modules/downquark.ventureCore.SubatomicModules/_dq/_utils/array.grid.ts";
import { _BLUEPRINT } from "./blueprint.ts";
import { UI } from "../_utils/ui.ts";

import { OneOrMany, OrNull } from "../../guitui.d.ts";

type ContentType = {
  current:OrNull<string[]>,
  idActive:OrNull<string|number>,
  idSections:string[],
  totalChars:number,
}

const {Grid} = UtilsGrid
const _content:ContentType = {
  current:null,
  idActive:null,
  idSections:[],
  totalChars:0,
}

const _replit = () => {
  console.clear()
  Grid.Render()
  // console.log('Grid.Get.Cells(): ', Grid.Get.Cells())
}

const _getContent = (location:number[]) => {
  return Grid.Get.Cells({location}) as string[]
}
const _setIdActive = (id:string|number) => {
  _content.idActive = id
}
const _setContent = (location:number[],value:OneOrMany<string>) => {
  // console.log('seting: ', content)
  Grid.Set.Cells({ location,value })
}

const _configureInitialContent = () => {
  // get active id
_BLUEPRINT.TUI.sections.forEach(section => {
  if(section.active) _setIdActive(section.id)
  _content.idSections.push(section.id) // pointer for quick lookups
})
_content.totalChars = _BLUEPRINT.DIMENSION.h * _BLUEPRINT.DIMENSION.w
if(!_content.idActive) return // if no active id there is nothing to memoize and/or no reason for highlight

const currentActiveContentIndexes = _BLUEPRINT.SubSectionGrids[_content.idActive].subGridIndexes
// _content.current = Grid.Get.Cells({location:currentActiveContentIndexes}) as string[]
_content.current = _getContent(currentActiveContentIndexes)
// console.log('_content: ', _content)
// console.log('_setActiveUI: ', UI.Active(_content.current))
// console.log('_setInactive: ', UI.Base(UI.Inactive(_content.current)))
_setContent(currentActiveContentIndexes,UI.Active(_content.current))
_replit()
// console.log('configured: ', _content, _BLUEPRINT.SubSectionGrids[_content.idActive].subGridIndexes)
}

export const Content = {
  Set: {
    idActive:_setIdActive,
    Initial:_configureInitialContent,
  },
  Update:_replit,
}