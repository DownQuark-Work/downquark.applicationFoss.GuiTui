import { Grid } from '../_deps.ts'
import { _BLUEPRINT } from "./blueprint.ts";
import { UI } from "../_utils/ui.ts";

import { OneOrMany, OrNull } from "../../guitui.d.ts";

type ContentType = {
  current:OrNull<string[]>,
  idActive:OrNull<string>,
  idSections:string[],
  totalChars:number,
}

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
    _setContent(currentActiveContentIndexes,UI.Inactive(_content.current)) // set inactive styling to section being navigated away from
    _setIdActive(nextActiveSection) // update `_content.idActive` to be the the section being navigated to
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
  cycleActiveSection() // else auto-cycle to next section defined by the TOML
}
const _setContent = (location:number[],value:OneOrMany<string>) => {
  Grid.Set.Cells({ location,value })
}

const _configureInitialContent = () => {
  // get active id
  _BLUEPRINT.TUI.sections.forEach(section => {
    if(section.active) _setIdActive(section.id)
    !section.disabled && _content.idSections.push(section.id) // pointer for quick lookups (when section is enabled)
  })
  _content.totalChars = _BLUEPRINT.DIMENSION.h * _BLUEPRINT.DIMENSION.w
  if(!_content.idActive) return // if no active id there is nothing to memoize and/or no reason for highlight
  cycleActiveSection()
}

export const Content = {
  Set: {
    idActive:_setIdActive,
    Initial:_configureInitialContent,
    CellValues:_setContent
  },
  Update:_replit,
}