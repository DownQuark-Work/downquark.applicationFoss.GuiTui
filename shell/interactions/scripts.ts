// This is the file responsible for interacting with the dynamically
// loaded `ts` or `sh` files and handling any side effects

import { KeyValueType,OneOrMany,SectionScriptsType } from "../../guitui.d.ts";

export const SECTION_SCRIPTS:KeyValueType<SectionScriptsType> = {}

export const runScriptCommand = async (section:string,command:OneOrMany<string>,commandArgs:KeyValueType<unknown>={},cb?:Function) => {
  const sectionScript = SECTION_SCRIPTS[section]
  if(sectionScript[command as string]) { // dynamic import
    const retVal = sectionScript[command as string](commandArgs)
    if(cb) retVal ? cb(retVal) : cb()
    console.log('DYN sectionScript: ', sectionScript)
  }
  else { // shell script
    console.log('sectionScript: ', sectionScript) 
    const cmd = [sectionScript,...command] as string[] // force a file to be referenced, no anonymous `Deno.run` calls
    console.log('cmd: ', cmd)
    console.log('commandArgs: ', commandArgs)
    // return
    const shellCmd = Deno.run({ cmd, ...commandArgs })
    // const shellCmd = Deno.run({ cmd, ...commandArgs })
    await shellCmd.status()
    if(commandArgs.stdout && commandArgs.stdout === 'piped'){
      const pipedOutput = new TextDecoder().decode(await shellCmd.output())
      cb && cb(pipedOutput)
    }
  }
}

// maybe future reference: https://github.com/terkelg/prompts/tree/master/lib/elements
