export const _INIT = () => {
  console.log('INITTING: ', Date.now())
}

export const _ON_SECTION_BLUR = () => {
  console.log('_ON_SECTION_BLUR: ')
  // will be called each time a new section has focus
  // this method in the other files will _only_ trigger when their section has focus
  // same with the focus function below
}

export const _ON_SECTION_FOCUS = () => {
  console.log('_ON_SECTION_FOCUS: ')
}