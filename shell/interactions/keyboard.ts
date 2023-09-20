import { KeyCodeType, keyParse } from '../_deps.ts'

type keyPressType = AsyncGenerator<KeyCodeType, void>
type keyPressReturnFncType = (type:RESERVED_KEYPRESS)=>boolean
export type keyPressReturnType = KeyCodeType & {isKey:keyPressReturnFncType}

export const toggleCursor = async (hide=true) => {
  // https://deno.land/x/cursor@v2.2.0/cursor.ts?source
  const encoder = new TextEncoder();
  if(hide)
    await Deno.stdout.write(encoder.encode("\u001B[?25l")) // hide
  else
    await Deno.stdout.write(encoder.encode("\u001B[?25h")) // show
}

export enum RESERVED_KEYPRESS {
  TAB = 'TAB',
  QUIT = 'QUIT'
}
export const isKey = (k:KeyCodeType) => {
  return function(type:RESERVED_KEYPRESS) {
    switch(type) {
      case RESERVED_KEYPRESS.TAB:
        return k.name === 'tab' && !(k.ctrl || k.meta || k.shift)
      case RESERVED_KEYPRESS.QUIT:
        return k.ctrl && k.name === 'c'
      default:
        return false
    }
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

export const processKeyPress = async (cb?:(key:keyPressReturnType)=>void) => {
  // export const processKeyPress = async (cb?:(key:KeyCodeType)=>void) => {
  // console.log("Hit ctrl + c to exit.")
  for await (const key of keypress()) {
    const k:keyPressReturnType = {...key, isKey:isKey(key) as keyPressReturnFncType}
    if(k.isKey(RESERVED_KEYPRESS.QUIT)) {
      await toggleCursor(false)
      console.log("exit")
      break
    }
    cb && cb(k)
  }
}