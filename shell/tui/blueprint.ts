import { DEBUG_GUITUI, EnumConfigSetup } from "../_utils/_constants.ts";
import { UtilsGrid } from '../../modules/downquark.ventureCore.SubatomicModules/_dq/_utils/array.grid.ts'

import { char } from "../_utils/characters.ts";
import { InitActions } from "./blueprint.actions.ts";

import { BluePrintType,TomlType } from '../../guitui.d.ts';


type ConversionFncType = 
  (id:string,tl:[string|number|Array<string|number>,string|number|Array<string|number>],br:[string|number|Array<string|number>,string|number|Array<string|number>])
    => [number,number,number,number]

const { Grid } = UtilsGrid,
      TUI:TomlType = {
        project: "",created: "",
        version: "",owner: { "@": ""},
        sections: []
      },
      BP:BluePrintType = {
        DIMENSION: {
          h: Deno.consoleSize().rows,
          w: Deno.consoleSize().columns,
        },
        SubSectionCoordsMap:{},
        SubSectionGrids:{},
        TUI,
      }

const applyConfigs = () => {
  if(BP.TUI.CONFIG?.RENDER?.includes(EnumConfigSetup.SCROLLABLE_SECTION_WITH_BORDER)) { // currently the only config
    // console.log('char: ', char)
    const typeMapForSubGrid = Grid.Create.SubGrid
    for(const subGrid in BP.SubSectionGrids) {
      const appliedSG = (BP.SubSectionGrids[subGrid] as ReturnType<typeof typeMapForSubGrid>).subGridPerimeter.applied
      // console.log('subGrid: ', appliedSG)
      // Grid.Set.Cells({location:appliedSG,value:subGrid})
    }
  }
  
  // InitActions()
  
  // if(DEBUG_GUITUI === 2){
  //   console.clear()
  //   Grid.Render()
  //   // console.log('convertedSectionCoordsMap: ', BP.SubSectionCoordsMap)
  //   // console.log('BP: ', BP)
  //   // console.log('char: ', char)

  // }
}

// const ambiguousSections = [] // sections without w/h defined - for phase 2
const createSubSections = () => {
  const atCoord:ConversionFncType = (id,tl,br) => {
    const tlbr = [...tl,...br||[]],
          widthHeight = ['w','h'],
          retCoord:number[] = []
    for(let i=0;i<4;i++) { // 4 is full coord length
      const fullSize = (BP.DIMENSION as {[k:string]:number})[widthHeight[i%widthHeight.length]],
        standardizeValue = (override?:string|number) => {
          const stndrd = override || tlbr[i]
          switch(typeof stndrd) {
            case 'undefined':
              throw new Error('All coordinates must be defined') // For Phase 1 - all coords should be defined (this will happen by default if using the GUI)
              // TODO: Make ambiguous section overrideable in Phase 2 // ambiguousSections.push(id) // retCoord.push(fullSize-1)
            case 'string':
              // convert character width to percentage to determine main grid offset
              const offsetStartPos:number = override
                ? 0 // if not being used for an override
                : retCoord[i-2] || 0 // if w||h, take into account x||y
              return offsetStartPos+parseInt(String(stndrd),10)
            default: // percentage
              const offsetStartPercentPos:number = override
                ? 0 // if not being used for an override
                : retCoord[i-2] || 0 // if w||h, take into account x||y
              const gridPercent = Math.ceil((parseInt(String(stndrd),10)/100)*fullSize)+offsetStartPercentPos
              return gridPercent
          }
        }

      if(Array.isArray(tlbr[i])){
        const diffArr = tlbr[i] as Array<string|number>
        let difference = standardizeValue(diffArr.shift()) - 0 // set initial value // -1 for zero offset
        while(diffArr.length) // subtract until finished
          difference -= standardizeValue(diffArr.shift())
        retCoord.push(difference + (retCoord[i-2] || 0))
      }
      else {
        retCoord.push(standardizeValue())
      }
    }
    return retCoord as [number,number,number,number]
  }
  
  BP.TUI.sections?.forEach(section => {
    const coordPoint = atCoord(section.id,[section.x,section.y],[section.w,section.h]),
          [t,l,b,r] = coordPoint,
          convertedSectionCoords:[number,number,number,number] = [t,l,Math.min(b,BP.DIMENSION.w-1),Math.min(r,BP.DIMENSION.h-1)]
    
    // store bounding coordinates
    BP.SubSectionCoordsMap[section.id] = [...convertedSectionCoords]

    const subGrid = Grid.Create.SubGrid([t,l],[Math.min(b,BP.DIMENSION.w-1),Math.min(r,BP.DIMENSION.h-1)])
    
    // store indexes
    BP.SubSectionGrids[section.id] = subGrid

    Grid.Set.Cells({location:subGrid.subGridIndexes,value:section.fillCharacter||''})
  });

  // applyConfigs()
  if(DEBUG_GUITUI === 2){
    console.clear()
    Grid.Render()
    // console.log('convertedSectionCoordsMap: ', BP.SubSectionCoordsMap)
    // console.log('BP: ', BP)
    // console.log('char: ', char)

  }
}

export const Init = (tuiData:TomlType) => {
  BP.TUI = tuiData
  console.clear() // start with a blank output
  Grid.Create.Config({
    FILL_CHARACTER:BP.TUI.CONFIG?.FILL_CHARACTER||'',
    GRID_HEIGHT:BP.DIMENSION.h,
    GRID_WIDTH:BP.DIMENSION.w,
  })
  Grid.Create.Initial()

  createSubSections()
}