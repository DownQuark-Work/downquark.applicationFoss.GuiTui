import {DOWNQUARK_FILE_EXTENSION, VERSION_GUITUI} from './_constants.ts'

const validateVersion = (persistedVersion:string) => {
  console.log('persistedVersion: ', persistedVersion, VERSION_GUITUI)
}

export const loadSrcFile = (path:string) => Deno.readTextFileSync(path)
