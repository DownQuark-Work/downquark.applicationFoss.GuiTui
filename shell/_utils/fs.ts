import {DOWNQUARK_FILE_EXTENSION, VERSION_GUITUI} from './_constants.ts'
import { _BLUEPRINT } from '../tui/blueprint.ts'
import { SECTION_SCRIPTS } from './grid.ts'

import { parseDynamicScripts } from './parser.ts'

const validateVersion = (persistedVersion:string) => {
  console.log('persistedVersion: ', persistedVersion, VERSION_GUITUI)
}

export const loadSrcFile = (path:string) => Deno.readTextFileSync(path)

const asyncForEach = async (arr, cb) => {
  for (let i = 0; i < arr.length; i++) {
    await cb(arr[i]);
  }
}

const loadScriptByType = async (fileName:string) => {
  const isDynamicImport = fileName.split('.').pop() === 'ts'
  
  return isDynamicImport
    ? await import('../'+fileName)
    : loadSrcFile(fileName)
}
export const LoadDynamicScripts = async () => {
  if(Object.keys(SECTION_SCRIPTS).length) return // failsafe: scripts have already been loaded
  
  const tomlFilePath = (Deno.args?.[0] as string).split('/')
  tomlFilePath.pop()
  const srcDir = tomlFilePath.join('/')+'/'

  if(_BLUEPRINT.TUI.CONFIG?.SCRIPT_SOURCE)// handle global
    SECTION_SCRIPTS._global = await loadScriptByType(srcDir+_BLUEPRINT.TUI.CONFIG?.SCRIPT_SOURCE)
    
  
  const sectionScripts:Array<[string,string]> = []
  _BLUEPRINT.TUI.sections.forEach((section) => 
    section.scriptSrc && sectionScripts.push([section.id,section.scriptSrc]))

  const asyncForEachWrapper = async () => {
    await asyncForEach(sectionScripts,async (curScript:[string,string]) => 
      SECTION_SCRIPTS[curScript[0]] = await loadScriptByType(srcDir+curScript[1]))
    parseDynamicScripts()
  }
  asyncForEachWrapper()
}