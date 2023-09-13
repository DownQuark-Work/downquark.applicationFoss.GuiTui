import { _BLUEPRINT } from "./blueprint.ts";
import { RESERVED_KEYPRESS, isKey, processKeyPress } from "../interactions/keyboard.ts";

import { KeyCodeType } from "../_deps.ts";

const handleParsedKeyboardEvent = (key:KeyCodeType) => {
  // console.clear()
  // Grid.Render()
  // console.log('ApplyActions _BLUEPRINT: ', _BLUEPRINT)
  console.log('handleParsedKeyboardEvent: ', key)
  console.log('Tab?: ', isKey(key,RESERVED_KEYPRESS.TAB))
}

export const ApplyActions = () => {
  // listens for keyboard events
  //  and prevents the process from exiting
  processKeyPress(handleParsedKeyboardEvent)
}