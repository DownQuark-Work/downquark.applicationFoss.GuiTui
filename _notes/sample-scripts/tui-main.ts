export const _INIT = () => {
  console.log('INITTING tui-main: ', Date.now())
}

export const _UPDATE_CONTENT = () => {
  console.log('UPDATING CONTENT :: from tui-main.ts');
}

export const _ON_SECTION_BLUR = () => {
  console.log('tui-main _ON_SECTION_BLUR: ')
  // will be called _only_ when this section has focus
  // however, it will trigger each time
  // same with the focus function below
}

export const _ON_SECTION_FOCUS = () => {
  console.log('tui-main _ON_SECTION_FOCUS: ')
}