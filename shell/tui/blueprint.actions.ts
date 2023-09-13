import { _BLUEPRINT } from "./blueprint.ts";
import { RESERVED_KEYPRESS, processKeyPress } from "../interactions/keyboard.ts";

import { keyPressReturnType } from "../interactions/keyboard.ts";
import { Content } from "./blueprint.content.ts";

const cycleActiveSection = () => {
  Content.Set.idActive()
}

const handleParsedKeyboardEvent = (key:keyPressReturnType) => {
  // console.clear()
  // Grid.Render()
  // console.log('ApplyActions _BLUEPRINT: ', _BLUEPRINT)
  console.log('handleParsedKeyboardEvent: ', key)
  console.log('key.isKey(): ', key.isKey(RESERVED_KEYPRESS.TAB))
  key.isKey(RESERVED_KEYPRESS.TAB) && cycleActiveSection()
}

export const ApplyActions = () => {
  // listens for keyboard events
  //  and prevents the process from exiting
  processKeyPress(handleParsedKeyboardEvent)
}