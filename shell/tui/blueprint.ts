import { DEBUG_GUITUI, EnumConfigSetup } from "../_utils/_constants.ts";
import { UtilsGrid } from '../../modules/downquark.ventureCore.SubatomicModules/_dq/_utils/array.grid.ts'

import { InitBlueprint } from "./blueprint.initialize.ts";
import { ApplyActions } from "./blueprint.actions.ts";

import { BluePrintType,TomlType } from '../../guitui.d.ts';

const { Grid } = UtilsGrid,
      TUI:TomlType = {
        project: "",created: "",
        version: "",owner: { "@": ""},
        sections: []
      }
export const _BLUEPRINT:BluePrintType = {
        DIMENSION: {
          h: Deno.consoleSize().rows,
          w: Deno.consoleSize().columns,
        },
        SubSectionCoordsMap:{},
        SubSectionGrids:{},
        TUI,
      }

const replit = () => {
  console.clear()
  Grid.Render()
  // console.log('Grid.Get.Cells(): ', Grid.Get.Cells())
}

export const Init = (tuiData:TomlType) => {
  // Basic configuration and setup
  _BLUEPRINT.TUI = tuiData
  console.clear() // start with a blank output
  Grid.Create.Config({
    FILL_CHARACTER:_BLUEPRINT.TUI.CONFIG?.FILL_CHARACTER||'',
    GRID_HEIGHT:_BLUEPRINT.DIMENSION.h,
    GRID_WIDTH:_BLUEPRINT.DIMENSION.w,
  })
  Grid.Create.Initial()

  InitBlueprint()
  ApplyActions()
  
  replit()
}