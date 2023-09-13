import {DOWNQUARK_FILE_EXTENSION, VERSION_GUITUI} from './_constants.ts'
import { _BLUEPRINT } from '../tui/blueprint.ts'
import { SECTION_SCRIPTS } from './grid.ts'

import { parseDynamicScripts } from './parser.ts'

const validateVersion = (persistedVersion:string) => {
  console.log('persistedVersion: ', persistedVersion, VERSION_GUITUI)
}

export const loadSrcFile = (path:string) => Deno.readTextFileSync(path)

const loadScriptByType = (fileName:string) => {
  const isDynamicImport = fileName.split('.').pop() === 'ts'
  console.log('fileName: ', fileName,loadSrcFile(fileName))
  
  // return Promise.resolve({a:'b'})
  return isDynamicImport
    ? import('../'+fileName)
    : loadSrcFile(fileName)
}
const asyncForEach = async(array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
}
export const LoadDynamicScripts = async () => {
  if(Object.keys(SECTION_SCRIPTS).length) return // failsafe: scripts have already been loaded
  
  const tomlFilePath = (Deno.args?.[0] as string).split('/')
  tomlFilePath.pop()
  const srcDir = tomlFilePath.join('/')+'/'

  if(_BLUEPRINT.TUI.CONFIG?.SCRIPT_SOURCE)// handle global
    SECTION_SCRIPTS._global = await loadScriptByType(srcDir+_BLUEPRINT.TUI.CONFIG?.SCRIPT_SOURCE)
    
  
  const sectionScripts = []
  _BLUEPRINT.TUI.sections.forEach((section) => {
    // if(section.scriptSrc) // load scripts for all applicable sections
    section.scriptSrc && sectionScripts.push([section.id,section.scriptSrc])
      // SECTION_SCRIPTS[section.id] = await loadScriptByType(srcDir+section.scriptSrc)
  })

  const asyncForEachWrapper = async () => {
    await asyncForEach(sectionScripts,async (curScript) => {
      SECTION_SCRIPTS[curScript[0]] = await loadScriptByType(srcDir+curScript[1])
      console.log('INSIDE SECTION_SCRIPTS: ', SECTION_SCRIPTS)
    })
    parseDynamicScripts()
  }
  asyncForEachWrapper()
}