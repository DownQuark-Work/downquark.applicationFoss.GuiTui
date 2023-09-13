import { UtilsGrid } from "../../modules/downquark.ventureCore.SubatomicModules/_dq/_utils/array.grid.ts";
import { _BLUEPRINT } from "./blueprint.ts";
import { UI } from "../_utils/ui.ts";

import { OneOrMany, OrNull } from "../../guitui.d.ts";

type ContentType = {
  current:OrNull<string[]>,
  idActive:OrNull<string>,
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
}

const cycleActiveSection = () => {
  if(!_content.idActive) return // failsafe

  const curActiveIndex = _content.idSections.indexOf(_content.idActive), // cycle through sections
        nextActiveSection = _content.idSections[curActiveIndex+1] || _content.idSections[0] // loop

  if(_content.current) { // remove the styling from the current section
    const currentActiveContentIndexes = _BLUEPRINT.SubSectionGrids[_content.idActive].subGridIndexes
    _setContent(currentActiveContentIndexes,UI.Inactive(_content.current))
    // and update the current section pointer (_content.idActive)
    _setIdActive(nextActiveSection)
  }
  
  const nextActiveContentIndexes = _BLUEPRINT.SubSectionGrids[_content.idActive].subGridIndexes
  _content.current = _getContent(nextActiveContentIndexes) // update current stored content
  
  _setContent(nextActiveContentIndexes,UI.Active(_content.current)) // set styles to new section

  _replit() // update shell
}

const _getContent = (location:number[]) => {
  return Grid.Get.Cells({location}) as string[]
}
const _setIdActive = (id?:string) => {
  if(id) { _content.idActive = id; return } // set directly
  
  cycleActiveSection()
}
const _setContent = (location:number[],value:OneOrMany<string>) => {
  Grid.Set.Cells({ location,value })
}

const _configureInitialContent = () => {
  // get active id
_BLUEPRINT.TUI.sections.forEach(section => {
  if(section.active) _setIdActive(section.id)
  !section.disabled && _content.idSections.push(section.id) // pointer for quick lookups (if enabled)
})
_content.totalChars = _BLUEPRINT.DIMENSION.h * _BLUEPRINT.DIMENSION.w
if(!_content.idActive) return // if no active id there is nothing to memoize and/or no reason for highlight

cycleActiveSection()

// const currentActiveContentIndexes = _BLUEPRINT.SubSectionGrids[_content.idActive].subGridIndexes
// _content.current = _getContent(currentActiveContentIndexes)
// // console.log('_content: ', _content)
// // console.log('_setActiveUI: ', UI.Active(_content.current))
// // console.log('_setInactive: ', UI.Base(UI.Inactive(_content.current)))
// _setContent(currentActiveContentIndexes,UI.Active(_content.current))
// // _replit()
// // console.log('configured: ', _content, _BLUEPRINT.SubSectionGrids[_content.idActive].subGridIndexes)
}

export const Content = {
  Set: {
    idActive:_setIdActive,
    Initial:_configureInitialContent,
  },
  Update:_replit,
}