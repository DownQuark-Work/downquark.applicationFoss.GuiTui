import { _BLUEPRINT } from "./blueprint.ts";
import { RESERVED_KEYPRESS, processKeyPress } from "../interactions/keyboard.ts";

import { keyPressReturnType, toggleCursor } from "../interactions/keyboard.ts";
import { Content } from "./blueprint.content.ts";

const handleParsedKeyboardEvent = (key:keyPressReturnType) => {
  key.isKey(RESERVED_KEYPRESS.TAB) && Content.Set.idActive()
}

export const ApplyActions = () => {
  toggleCursor() // removes cursor from shell
  
  /** processKeyPress:
   * listens for keyboard events
   * - and prevents the process from exiting
   */
  processKeyPress(handleParsedKeyboardEvent)
}