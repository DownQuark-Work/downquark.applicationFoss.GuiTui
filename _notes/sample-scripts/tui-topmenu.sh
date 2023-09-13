export const _INIT = () => {
  console.log('INITTING: ', Date.now())
}

export const _ON_SECTION_BLUR = () => {
  console.log('_ON_SECTION_BLUR: ')
  // will be called _only_ when this section has focus
  // however, it will trigger each time
  // same with the focus function below
}

export const _ON_SECTION_FOCUS = () => {
  console.log('_ON_SECTION_FOCUS: ')
}