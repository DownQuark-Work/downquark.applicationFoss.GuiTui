import { _BLUEPRINT } from "./blueprint.ts";
import {
  keyPressReturnType,
  processKeyPress,
  RESERVED_KEYPRESS,
  toggleCursor
} from "../interactions/keyboard.ts";
import { Content } from "./blueprint.content.ts";
import { UtilsGrid } from "../../modules/downquark.ventureCore.SubatomicModules/_dq/_utils/array.grid.ts";


type ScrollSectionType = (_:{section:[w:number,h:number],content:[w:number,h:number],offset:[x:number,y:number]}) => void

const handleParsedKeyboardEvent = (key:keyPressReturnType) => {
  key.isKey(RESERVED_KEYPRESS.TAB) && Content.Set.idActive()
}

export const handleParsedScriptEvent = (section:string,scriptEvent:string) => {
  console.log('START HERE!!!! -- NEEDS to be corrected ... but were getting the updates to the TUI happening in a flash!')
  console.log('Pretty sure it is just too much happening too fast ... maybe find a way to concat the changes before an update?')
  console.log('although that may be hard bc you dont know on this page how many sections are updating -')
  console.log('it would more than likely have to be concatted from the `scripts.ts` and dispatched? may be worth a shot though');
  console.log('and thats also where the manager.ts might be able to help -.. dunno ... Ill get it though');
  
  
  //make the array of indexes - move this to a more global location when working
  const contentIndexes = new Array(scriptEvent.length).fill('.').map((_,i) => scriptEvent.length+i),
        vals = scriptEvent.split('')
  // console.clear()
  setTimeout(()=>{
    Content.Set.CellValues(contentIndexes,scriptEvent.split(''))
    Content.Set.idActive()
  },3000)
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