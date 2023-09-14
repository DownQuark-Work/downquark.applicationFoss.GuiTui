type rawArgsType = {[x: string]: unknown; _: string[]; '--': string[];}

import {loadSrcFile} from './fs.ts'
import { stringify, parse } from '../../modules/downquark.ventureCore.SubatomicModules/external/iarna-toml/toml-esm.mjs'
import { SECTION_SCRIPTS, runScriptCommand } from '../interactions/scripts.ts';

const _parseToml = (rawData:string) => parse(rawData)
export const parseArgs = (rawArgs:string[]) => _parseToml(loadSrcFile(rawArgs[0]))

const shellParams = (sh:string) => ({
  _CHMOD: ['chmod','755',sh],
})

export const parseDynamicScripts = () => { // allow shell files to be executable
  Object.entries(SECTION_SCRIPTS).forEach(async ([sectionId,sectionScript]) => {
    if(typeof sectionScript === 'string'){ // if not a dynamically loaded module
      const chmod = Deno.run({ cmd: shellParams(sectionScript)._CHMOD })
      await chmod.status()
      runScriptCommand(sectionId,['init'])
    }
    else
      runScriptCommand(sectionId,'_INIT')
  })
}