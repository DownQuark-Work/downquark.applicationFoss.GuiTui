import { _BLUEPRINT } from "./blueprint.ts";

import { OrNull } from "../../guitui.d.ts";

type ContentType = {
  activeId:OrNull<string|number>
}

const _content:ContentType = {
  activeId:null,
}
const _setActiveId = (id?:string|number) => {
  if(id) _content.activeId = id
  else _BLUEPRINT.TUI.sections.forEach(section => { if(section.active) _content.activeId = section.id })
}
const _setContent = (content?:unknown) => {
  console.log('seting: ', content)
  console.log('_BLUEPRINT.TUI.sections: ', _BLUEPRINT.TUI.sections)
}

export const Content = {
  Set: {
    ActiveId:_setActiveId,
    Initial: () => {
      _setActiveId()
      _setContent()
    }
  }
}