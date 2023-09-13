import { DEBUG_GUITUI } from "../_utils/_constants.ts";
import { _BLUEPRINT } from "./blueprint.ts";

import { char } from "../_utils/characters.ts";
import { processKeyPress } from "../interactions/keyboard.ts";

const handleParsedKeyboardEvent = (key:any) => {
  // console.clear()
  // Grid.Render()
  // console.log('ApplyActions _BLUEPRINT: ', _BLUEPRINT)
  // console.log('char: ', char)
  console.log('handleParsedKeyboardEvent: ', key)
}

export const ApplyActions = () => {
  // listens for keyboard events
  //  and prevents the process from exiting
  processKeyPress(handleParsedKeyboardEvent)
}