import { KeyValueType } from "../../guitui.d.ts";

export const _INIT = () => {
  console.log('INITTING tui-global: ', Date.now())
}

let tmpData = 'pickle me!!'
export const _UPDATE_CONTENT = () => {
  console.log('UPDATING CONTENT :: from tui-global.ts');
  console.log('changing pickle to tickle');
  tmpData = 'tickle me!!'
  
}
export const _UPDATE_DISPLAY = () => {
  console.log('UPDATING DISPLAY :: from tui-global.ts');
  console.log('should show `tickle me` if mutations were correct');
  
  console.log('USING DATA: ', tmpData)
}


export const _ON_SECTION_BLUR = () => {
  console.log('tui-global _ON_SECTION_BLUR: ')
  // will be called each time a new section has focus
  // this method in the other files will _only_ trigger when their section has focus
  // same with the focus function below
}

export const _ON_SECTION_FOCUS = () => {
  console.log('tui-global _ON_SECTION_FOCUS: ')
}

export const CustomGlobalFunction = (props:KeyValueType<any>) => {
  console.log('tui-global CustomGlobalFunction: ', props)

  return 1342
}