#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

/**
 * Above allows for:
 * -`./guitui.ts '../_notes/tui-sample.toml'`
 * However the deno command still works as well:
 * - `deno run --allow-read --allow-write --allow-run guitui.ts '../_notes/tui-sample.toml'`
 * 
 * > NOTE: To enable bash to run you must: `chmod 755 ./guitui.ts`
 */


import { TomlType } from '../guitui.d.ts';
import {parse} from './_deps.ts'
import {parseArgs} from './_utils/parser.ts'

import * as BluePrint from './tui/blueprint.ts'

type TOMLType = {
  data:TomlType
}

const TOML:TOMLType = {
  data:{
    project: "",
    created: "",
    version: "",
    owner: {
      "@": ""
    },
    sections: []
  }
}

if (import.meta.main) {
  const args = parse(Deno.args, {
    boolean: ["help"],
    alias: {
      help: ["h"],
    },
  '--': true })
  
  if (args.h || args.help) {
    console.log('Example Usage:');
    console.log('`% deno run --allow-read --allow-write --allow-run guitui.ts FILE_CREATED_BY_GUI.toml`');
  }
  else {
    if ((Deno.args?.[0] as string).split('.').at(-1) !== 'toml')
      throw new Error('.toml file must be specified.')
    
    TOML.data = parseArgs(args._ as string[])
    // console.log('TOML.data:: ', TOML.data)
    BluePrint.Init(TOML.data) 
  }
}