import { _BLUEPRINT } from "./blueprint.ts";
import { UtilsGrid } from "../../modules/downquark.ventureCore.SubatomicModules/_dq/_utils/array.grid.ts";

import { OrNull } from "../../guitui.d.ts";

type ContentType = {
  activeId:OrNull<string|number>,
  current:OrNull<string[]>,
  totalChars:number,
}

const {Grid} = UtilsGrid
const _content:ContentType = {
  activeId:null,
  current:null,
  totalChars:0,
}

const _replit = () => {
  console.clear()
  Grid.Render()
  // console.log('Grid.Get.Cells(): ', Grid.Get.Cells())
}

const _configureInitialContent = () => {
    // get active id
  _BLUEPRINT.TUI.sections.forEach(section => { if(section.active) _content.activeId = section.id })
  _content.totalChars = _BLUEPRINT.DIMENSION.h * _BLUEPRINT.DIMENSION.w
  if(!_content.activeId) return // if no active id there is nothing to memoize
  
  const currentActiveContentIndexes = _BLUEPRINT.SubSectionGrids[_content.activeId].subGridIndexes
  _content.current = Grid.Get.Cells({location:currentActiveContentIndexes}) as string[]
  console.log('_content: ', _content)
  // console.log('configured: ', _content, _BLUEPRINT.SubSectionGrids[_content.activeId].subGridIndexes)
}
const _setActiveId = (id:string|number) => {
  _content.activeId = id
}
const _setContent = (content?:unknown) => {
  console.log('seting: ', content)
}

export const Content = {
  Set: {
    ActiveId:_setActiveId,
    Initial:_configureInitialContent,
  },
  Update:_replit,
}