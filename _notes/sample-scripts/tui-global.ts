export const _INIT = () => {
  console.log('INITTING tui-global: ', Date.now())
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