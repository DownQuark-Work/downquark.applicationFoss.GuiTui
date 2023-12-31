import { Grid } from '../_deps.ts'
import { LoadDynamicScripts } from '../_utils/fs.ts';

import { InitBlueprint } from './blueprint.initialize.ts';
import { ApplyActions } from './blueprint.actions.ts';
import { Content } from './blueprint.content.ts'

import { BluePrintType,TomlType } from '../../guitui.d.ts';

const TUI:TomlType = {
        project: "",created: "",
        version: "",owner: { "@": ""},
        sections: []
      }
export const _BLUEPRINT:BluePrintType = {
        DIMENSION: {
          h: Deno.consoleSize().rows-2, // -2 for cursor and line break after render
          w: Deno.consoleSize().columns,
        },
        SubSectionCoordsMap:{},
        SubSectionGrids:{},
        TUI,
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
  LoadDynamicScripts()
  ApplyActions()

  Content.Set.Initial()
}