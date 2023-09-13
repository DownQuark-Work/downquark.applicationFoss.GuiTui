import { KeyCodeType, keyParse } from '../_deps.ts'

type keyPressType = AsyncGenerator<KeyCodeType, void>
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
    if (key.ctrl && key.name === "c") {
      console.log("exit")
      break
    }
    // console.log('key: ', key)
    cb && cb(key)
    // handleParsedKeyboardEvent(key)
  }
}