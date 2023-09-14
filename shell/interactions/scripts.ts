// This is the file responsible for interacting with the dynamically
// loaded `ts` or `sh` files and handling any side effects

import { KeyValueType,OneOrMany,SectionScriptsType } from "../../guitui.d.ts";

export const SECTION_SCRIPTS:KeyValueType<SectionScriptsType> = {}

export const runScriptCommand = async (section:string,command:OneOrMany<string>,commandArgs:KeyValueType<unknown>={},cb?:Function) => {
  const sectionScript = SECTION_SCRIPTS[section]
  if(sectionScript[command as string]) { // dynamic import
    const retVal = sectionScript[command as string](commandArgs)
    if(cb) retVal ? cb(retVal) : cb()
  }
  else { // shell script
    const cmd = [sectionScript,...command] as string[] // force a file to be referenced, no anonymous `Deno.run` calls
    const shellCmd = Deno.run({ cmd, ...commandArgs })
    await shellCmd.status()
    if(commandArgs.stdout && commandArgs.stdout === 'piped'){
      const pipedOutput = new TextDecoder().decode(await shellCmd.output())
      cb && cb(pipedOutput)
    }
  }
}

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


// The below are all valid to run custom commands:
  // runScriptCommand('_global','CustomGlobalFunction',{testing:321},(tst:any)=>{console.log('tui-global CustomGlobalFunction Example:',tst)})
  // runScriptCommand('0-top',['-custom','top'])
  // runScriptCommand('0-top',['-custom','top'],{stdout: 'piped'},(tst:any)=>{console.log('PIPED OUTPUT:: shellscript CustomGlobalFunction Example:',tst,':: END PIPED OUTPUT')})

  // runScriptCommand('0-top',['-update','content'],{stdout: 'piped'},(cntnt:any)=> {
  //   // handle content update
  // })


      // maybe future reference: https://github.com/terkelg/prompts/tree/master/lib/elements
