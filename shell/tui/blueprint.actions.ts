import { _BLUEPRINT } from "./blueprint.ts";
import {
  keyPressReturnType,
  processKeyPress,
  RESERVED_KEYPRESS,
  toggleCursor
} from "../interactions/keyboard.ts";
import { Content } from "./blueprint.content.ts";


type ScrollSectionType = (_:{section:[w:number,h:number],content:[w:number,h:number],offset:[x:number,y:number]}) => void

const handleParsedKeyboardEvent = (key:keyPressReturnType) => {
  key.isKey(RESERVED_KEYPRESS.TAB) && Content.Set.idActive()
}

export const handleParsedScriptEvent = (scriptEvent:any) => {
  console.log('scriptEvent: ', scriptEvent)
}

export const ApplyActions = () => {
  toggleCursor() // removes cursor from shell
  
  /** processKeyPress:
   * listens for keyboard events
   * - and prevents the process from exiting
   */
  processKeyPress(handleParsedKeyboardEvent)
}

export const ScrollSection:ScrollSectionType = ({section,content,offset}) => {
  console.log('{section,content,offset}: ', section,content,offset)
}