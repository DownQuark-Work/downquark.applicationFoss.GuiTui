import { _BLUEPRINT } from "./blueprint.ts";
import { RESERVED_KEYPRESS, processKeyPress } from "../interactions/keyboard.ts";

import { keyPressReturnType } from "../interactions/keyboard.ts";

const handleParsedKeyboardEvent = (key:keyPressReturnType) => {
  // console.clear()
  // Grid.Render()
  // console.log('ApplyActions _BLUEPRINT: ', _BLUEPRINT)
  console.log('handleParsedKeyboardEvent: ', key)
  console.log('key.isKey(): ', key.isKey(RESERVED_KEYPRESS.TAB))
  // console.log('Tab?: ', isKey(key,RESERVED_KEYPRESS.TAB))
}

export const ApplyActions = () => {
  // listens for keyboard events
  //  and prevents the process from exiting
  processKeyPress(handleParsedKeyboardEvent)
}