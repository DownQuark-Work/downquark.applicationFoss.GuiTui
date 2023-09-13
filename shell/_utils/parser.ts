type rawArgsType = {[x: string]: unknown; _: string[]; '--': string[];}

import {loadSrcFile} from './fs.ts'
import { stringify, parse } from '../../modules/downquark.ventureCore.SubatomicModules/external/iarna-toml/toml-esm.mjs'
import { SECTION_SCRIPTS } from './grid.ts'

const _parseToml = (rawData:string) => parse(rawData)
export const parseArgs = (rawArgs:string[]) => _parseToml(loadSrcFile(rawArgs[0]))

const shellParams = (sh:string) => ({
  _CHMOD: ['chmod','755',sh],
  INIT:[sh,'init'],
  SECTION:{
    BLUR:[sh,'-section','blur',],
    FOCUS:[sh,'-section','focus'],
  },
})

export const parseDynamicScripts = async () => {
  Object.values(SECTION_SCRIPTS).forEach(async sectionScript => {
    if(typeof sectionScript !== 'string')
      sectionScript._INIT() // initialize dynamic imports
    else { // initialize shell scripts
      // make sure scripts are executable
      const chmod = Deno.run({ cmd: shellParams(sectionScript)._CHMOD })
      await chmod.status()
      // run the init function
      const init = Deno.run({ cmd: shellParams(sectionScript).INIT })
      await init.status()
    }
  })
}

/**
 * TODO:
 * above are the main calls from the template files
 * - [ ] we need to make the ability to call a custom command
 * - [ ] we need to have one more templated method that provides the 
 *   handshake for updating content from the script files
 * Those should both live here because this holds the go-between methods
 */
