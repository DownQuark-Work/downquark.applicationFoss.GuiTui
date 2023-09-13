type rawArgsType = {[x: string]: unknown; _: string[]; '--': string[];}

import {loadSrcFile} from './fs.ts'
import { stringify, parse } from '../../modules/downquark.ventureCore.SubatomicModules/external/iarna-toml/toml-esm.mjs'
import { SECTION_SCRIPTS } from './grid.ts';

const _parseToml = (rawData:string) => parse(rawData)
export const parseArgs = (rawArgs:string[]) => _parseToml(loadSrcFile(rawArgs[0]))

export const parseDynamicScripts = () => {
  Object.values(SECTION_SCRIPTS).forEach(sectionScript => {
    if(typeof sectionScript !== 'string')
      sectionScript._INIT() // initialize dynamic imports
    else // initialize shell scripts
    console.log('initialize shell scripts: ')
      // console.log(script)
  })
}
