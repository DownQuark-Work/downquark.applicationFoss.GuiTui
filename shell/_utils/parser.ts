type rawArgsType = {[x: string]: unknown; _: string[]; '--': string[];}

import {loadTomlFile} from './fs.ts'
import { stringify, parse } from '../../modules/downquark.ventureCore.SubatomicModules/external/iarna-toml/toml-esm.mjs'

const _parseToml = (rawData:string) => parse(rawData)

export const parseArgs = (rawArgs:string[]) => _parseToml(loadTomlFile(rawArgs[0]))