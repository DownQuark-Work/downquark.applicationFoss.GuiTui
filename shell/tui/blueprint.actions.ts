import { DEBUG_GUITUI } from "../_utils/_constants.ts";
import { UtilsGrid } from '../../modules/downquark.ventureCore.SubatomicModules/_dq/_utils/array.grid.ts'

import { char } from "../_utils/characters.ts";
import { processKeyPress } from "../interactions/keyboard.ts";

const { Grid } = UtilsGrid
  export const InitActions = () => {
    console.clear()
    Grid.Render()
    console.log('char: ', char)

    // listens for keyboard events
    //  and prevents the process from exiting
    processKeyPress()
  }