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

// sectionScript._INIT() // initialize dynamic imports
    // else { // initialize shell scripts
    //   // make sure scripts are executable
    //   const chmod = Deno.run({ cmd: shellParams(sectionScript)._CHMOD })
    //   await chmod.status()
    //   // run the init function
    //   const init = Deno.run({ cmd: shellParams(sectionScript).INIT })
    //   await init.status()
      // show initial content
      // runScriptCommand(sectionId,shellParams(sectionScript).UPDATE.CONTENT,{stdout: 'piped'},(cntnt:any)=>{
      //   // handle content update
      // })
    // }
  // })

  // The below are all valid to run custom commands:
  // runScriptCommand('_global','CustomGlobalFunction',{testing:321},(tst:any)=>{console.log('tui-global CustomGlobalFunction Example:',tst)})
  // runScriptCommand('0-top',['-custom','top'])
  // runScriptCommand('0-top',['-custom','top'],{stdout: 'piped'},(tst:any)=>{console.log('PIPED OUTPUT:: shellscript CustomGlobalFunction Example:',tst,':: END PIPED OUTPUT')})
// }

// export const runScriptCommand = async (section:string,command:OneOrMany<string>,commandArgs:KeyValueType<unknown>={},cb?:Function) => {
//   const sectionScript = SECTION_SCRIPTS[section]
//   if(sectionScript[command as string]) { // dynamic import
//     const retVal = sectionScript[command as string](commandArgs)
//     if(cb) retVal ? cb(retVal) : cb()
//   }
//   else { // shell script
//     const cmd = [sectionScript,...command] as string[] // force a file to be referenced, no anonymous `Deno.run` calls
//     const shellCmd = Deno.run({ cmd, ...commandArgs })
//     await shellCmd.status()
//     if(commandArgs.stdout && commandArgs.stdout === 'piped'){
//       const pipedOutput = new TextDecoder().decode(await shellCmd.output())
//       cb && cb(pipedOutput)
//     }
//   }
// }

/**
 * TODO:
 * above are the main calls from the template files
 * - [x] we need to make the ability to call a custom command
 * - [ ] we need to have one more templated method that provides the 
 *   handshake for updating content from the script files
 *   - [ ] any file should be able to update any section's content by specifying the id
 *     although it would be for the current selected section by default
 * Those should both live here because this holds the go-between methods
 * 
 * - [ ] remember to add the scrollability
 */
