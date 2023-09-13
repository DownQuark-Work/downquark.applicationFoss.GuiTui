type rawArgsType = {[x: string]: unknown; _: string[]; '--': string[];}

import {loadSrcFile} from './fs.ts'
import { stringify, parse } from '../../modules/downquark.ventureCore.SubatomicModules/external/iarna-toml/toml-esm.mjs'
import { SECTION_SCRIPTS } from './grid.ts';

const _parseToml = (rawData:string) => parse(rawData)
export const parseArgs = (rawArgs:string[]) => _parseToml(loadSrcFile(rawArgs[0]))

export const parseDynamicScripts = () => {
  // scripts must be either IIFE or have an `init` function
  console.log('not sure yet');
  console.log('SECTION_SCRIPTS: ', SECTION_SCRIPTS)
}
