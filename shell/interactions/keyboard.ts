import { KeyCodeType, keyParse } from '../_deps.ts'

type keyPressType = AsyncGenerator<KeyCodeType, void>

export enum RESERVED_KEYPRESS {
  TAB = 'TAB',
  QUIT = 'QUIT'
}
export const isKey = (k:KeyCodeType,type:RESERVED_KEYPRESS) => {
  switch(type) {
    case RESERVED_KEYPRESS.TAB:
      return k.name === 'tab' && !(k.ctrl || k.meta || k.shift)
    case RESERVED_KEYPRESS.QUIT:
      return k.ctrl && k.name === 'c'
    default:
      return false
  }
}

async function* keypress(): keyPressType {
  while (true) {
    const data = new Uint8Array(8)

    Deno.stdin.setRaw(true)
    const nread = await Deno.stdin.read(data)
    Deno.stdin.setRaw(false);

    if (nread === null) return

    const keys: Array<KeyCodeType> = keyParse(data.subarray(0, nread))
    for (const key of keys) yield key
  }
}

export const processKeyPress = async (cb?:(key:KeyCodeType)=>void) => {
  // console.log("Hit ctrl + c to exit.")
  for await (const key of keypress()) {
    if(isKey(key,RESERVED_KEYPRESS.QUIT)) {
      console.log("exit")
      break
    }
    cb && cb(key)
  }
}