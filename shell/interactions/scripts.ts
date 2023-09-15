// This is the file responsible for interacting with the dynamically
// loaded `ts` or `sh` files and handling any side effects

import { KeyValueType,OneOrMany,OrNull,SectionScriptsType } from "../../guitui.d.ts";
import { handleParsedScriptEvent } from "../tui/blueprint.actions.ts";

export const SECTION_SCRIPTS:KeyValueType<SectionScriptsType> = {}

interface RunScriptCommandInterface {
  (section:string,command:OneOrMany<string>,commandArgs?:KeyValueType<unknown>,cb?:Function):void
  (section:string,command:OneOrMany<string>,commandArgs?:KeyValueType<unknown>,cb?:OneOrMany<ApplyCallbackByNameEnum>):void }

export enum ApplyCallbackByNameEnum { // this should be used in conjunction with the default methods below
  _DEBUG = '_DEBUG',
  REQUEST_UPDATED_CONTENT_FROM_SCRIPT = 'REQUEST_UPDATED_CONTENT_FROM_SCRIPT',
  UPDATE_CONTENT_ON_COMPLETION = 'UPDATE_CONTENT_ON_COMPLETION',
}
// The below are used for the templating system.
// These methods can be no-op but will need to be created when we export the template files
const parsedCommonParams = (sh:string='',args:any) => ({
  DISPLAY_CONTENT: {
    SH:[],TS:[]
  },
  REQ_UPDATE_CONTENT: {
    SH:[sh,['-update','content'],{stdout: 'piped'}],
    TS:[sh,'_UPDATE_CONTENT',undefined]
  },
})

/**
 * helper methood to return common callbacks that
 * could otherwise be painful when dealing with the shell and dynamically loaded modules
 * @returns Function
 */
let hasAppliedCallback = false
const applyCallback = (cb:Function|ApplyCallbackByNameEnum):OrNull<Function> => {
  hasAppliedCallback = false // reset each run
  if(typeof cb === 'function') return cb
  hasAppliedCallback = true // something in the switch case matches and val persists
  switch (cb) {
    case ApplyCallbackByNameEnum.REQUEST_UPDATED_CONTENT_FROM_SCRIPT:
      return (secCb:any,a:any) => {
        const {k,section,cb} = secCb
        const parsedParams:any = parsedCommonParams(section,a).REQ_UPDATE_CONTENT
        cb & parsedParams[k].push(cb)
        // console.log('CALLBACK OCCURED: ', parsedCommonParams(s,a).REQ_UPDATE_CONTENT)
        console.log('called back: ', parsedParams[k])
      }
    case ApplyCallbackByNameEnum.UPDATE_CONTENT_ON_COMPLETION:
    return null // ()=>{} // 
  }
  hasAppliedCallback = false // or no match and val resets
  return null
}

export const runScriptCommand:RunScriptCommandInterface = async (section,command,commandArgs={},cb) => {
  console.log('cb: ', cb, section)
  const cbArg = (Array.isArray(cb)) ? cb.shift() : cb
  const callback = cbArg ? applyCallback(cbArg) : null
  const sectionScript = SECTION_SCRIPTS[section]
  if(sectionScript[command as string]) { // dynamic import
    let retVal = sectionScript[command as string](commandArgs)
    if(callback) {
      if(hasAppliedCallback){ // send section and return val if applicable
        retVal ? callback({k:'TS',section,cb},retVal) : callback({k:'TS',section,cb})
      } else retVal ? callback(retVal) : callback()
    }
  }
  else { // shell script
    const cmd = [sectionScript,...command] as string[] // force a file to be referenced, no anonymous `Deno.run` calls
    const shellCmd = Deno.run({ cmd, ...commandArgs })
    await shellCmd.status()
    if(commandArgs.stdout && commandArgs.stdout === 'piped'){
      const pipedOutput = new TextDecoder().decode(await shellCmd.output())
      if(callback) {
        hasAppliedCallback ? callback({k:'SH',section,cb},pipedOutput) : callback(pipedOutput)
      } 
    }
    else if(hasAppliedCallback) { // even if no pipe to await run callback if it was specified
      callback && callback({k:'SH',section,cb})
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
