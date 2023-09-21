type rawArgsType = {[x: string]: unknown; _: string[]; '--': string[];}

import {loadSrcFile} from './fs.ts'
import { stringify, parseToml } from '../_deps.ts'
import { ApplyCallbackByNameEnum, SECTION_SCRIPTS, runScriptCommand } from '../interactions/scripts.ts';

const _parseToml = (rawData:string) => parseToml(rawData)
export const parseArgs = (rawArgs:string[]) => _parseToml(loadSrcFile(rawArgs[0]))

const onInitCallbackChain = [
  ApplyCallbackByNameEnum.REQUEST_UPDATED_CONTENT_FROM_SCRIPT,
  ApplyCallbackByNameEnum.UPDATE_DISPLAY_ON_COMPLETION,
]
export const parseDynamicScripts = () => { // allow shell files to be executable
  Object.entries(SECTION_SCRIPTS).forEach(async ([sectionId,sectionScript]) => {
    if(typeof sectionScript === 'string'){ // if not a dynamically loaded module
      const chmod = Deno.run({ cmd: ['chmod','755',sectionScript] })
      await chmod.status()
      runScriptCommand(sectionId,['init'],undefined,[...onInitCallbackChain])
    }
    else
      runScriptCommand(sectionId,'_INIT',undefined,[...onInitCallbackChain])
  })
  // leaving for debug - but should not need the below
  // runScriptCommand('_global','CustomGlobalFunction',{testing:321},[...onInitCallbackChain])
  // runScriptCommand('0-top',['-update','content'],{stdout: 'piped'},[...onInitCallbackChain])

}