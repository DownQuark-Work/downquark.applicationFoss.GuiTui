import { _BLUEPRINT } from "./blueprint.ts";
import { SECTION_SCRIPTS } from "../_utils/grid.ts";
import { loadSrcFile } from "../_utils/fs.ts";
import { parseDynamicScripts } from "../_utils/parser.ts";
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

export const ApplyActions = () => {
  toggleCursor() // removes cursor from shell
  
  /** processKeyPress:
   * listens for keyboard events
   * - and prevents the process from exiting
   */
  processKeyPress(handleParsedKeyboardEvent)
}

export const LoadScripts = () => {
  if(!SECTION_SCRIPTS.srcDir) {
    const tomlFilePath = (Deno.args?.[0] as string).split('/')
    tomlFilePath.pop()
    SECTION_SCRIPTS.srcDir = tomlFilePath.join('/')+'/'
  }
  if(_BLUEPRINT.TUI.CONFIG?.SCRIPT_SOURCE){ // handle global
    SECTION_SCRIPTS._global = loadSrcFile(SECTION_SCRIPTS.srcDir+_BLUEPRINT.TUI.CONFIG?.SCRIPT_SOURCE)
  }
  _BLUEPRINT.TUI.sections.forEach(section => {
    if(section.scriptSrc)
      SECTION_SCRIPTS[section.id] = loadSrcFile(SECTION_SCRIPTS.srcDir+section.scriptSrc)
  })
}
export const ParseScripts = () => {
  console.log('parsing dynamics');
  parseDynamicScripts()
  console.log('SECTION_SCRIPTS: ', SECTION_SCRIPTS)
}

export const ScrollSection:ScrollSectionType = ({section,content,offset}) => {
  console.log('{section,content,offset}: ', section,content,offset)
}