const main = {
  arrowDown: '↓', arrowLeft: '←', arrowRight: '→', arrowUp: '↑',
  borderCorner: '🟆',
  borderH: '⎯',
  borderScroll: '◊',
  borderV: '⏐',
  cross: '✖',
  ellipsis: '…',
  line: '─',
  pointer: '❯', pointerSmall: '›',
  radioOff: '◯', radioOn: '◉',
  tick: '✔',
};	
const win = {
  ...main,
  cross: '×',
  ellipsis: '...',
  pointer: '>',
  pointerSmall: '»',
  radioOff: '( )',
  radioOn: '(*)',
  tick: '√',
};	

export const char = Deno.build.os === 'darwin' ? main : win