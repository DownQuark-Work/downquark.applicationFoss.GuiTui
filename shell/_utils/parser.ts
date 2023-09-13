type rawArgsType = {[x: string]: unknown; _: string[]; '--': string[];}

import {loadSrcFile} from './fs.ts'
import { stringify, parse } from '../../modules/downquark.ventureCore.SubatomicModules/external/iarna-toml/toml-esm.mjs'
import { SECTION_SCRIPTS } from './grid.ts';

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
  // const p=Deno.run({ cmd: ["../_notes/sample-scripts/tui-footer.sh","-section","blur",] });
  // await p.status();


export const parseDynamicScripts = async () => {
  console.log('SECTION_SCRIPTS: ', SECTION_SCRIPTS)
  Object.values(SECTION_SCRIPTS).forEach(async sectionScript => {
    if(typeof sectionScript !== 'string')
      sectionScript._INIT() // initialize dynamic imports
    else { // initialize shell scripts
      // make sure scripts are executable
      const chmod=Deno.run({ cmd: shellParams(sectionScript)._CHMOD });
      await chmod.status();
      // run the init function
      const init=Deno.run({ cmd: shellParams(sectionScript).INIT });
      await init.status();
    }
  })
}
