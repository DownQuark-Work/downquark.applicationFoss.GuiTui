import {chalq, ensureFileSync} from '../_deps.ts'
import { UtilsGrid } from '../../modules/downquark.ventureCore.SubatomicModules/_dq/_utils/array.grid.ts'
import { TomlType } from '../../guitui.d.ts';

type ConversionFncType = 
  (id:string,tl:[string|number|Array<string|number>,string|number|Array<string|number>],br:[string|number|Array<string|number>,string|number|Array<string|number>])
    => [number,number,number,number]

const { Grid } = UtilsGrid,
      TUI:TomlType = {
        project: "",created: "",
        version: "",owner: { "@": ""},
        sections: []
      },
      BP = {
        DIMENSION: {
          h: Deno.consoleSize().rows,
          w: Deno.consoleSize().columns,
        },
        SubSectionGrids:[],
        TUI,
      }

// const ambiguousSections = [] // sections without w/h defined
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
  
  const convertedSectionCoordsMap:{[k:string]:[number,number,number,number]} = {}
  BP.TUI.sections.forEach(section => {
    const coordPoint = atCoord(section.id,[section.x,section.y],[section.w,section.h])
    // below for phase 2 with optional w/h
    // const botRt = [section.w||null,section.h||null]
    // // console.log('section: ', botRt,section)
    // const coordPoint = botRt.filter(Boolean).length
    //   ? atCoord(section.id,[section.x,section.y],botRt)
    //   : atCoord(section.id,[section.x,section.y])
    // console.log('coordPoint: ', coordPoint)
    //
    const [t,l,b,r] = coordPoint
    convertedSectionCoordsMap[section.id] = [t,l,Math.min(b,BP.DIMENSION.w-1),Math.min(r,BP.DIMENSION.h-1)]
    // check for ambiguity overlap here (phase 2)

    const subGrid = Grid.Create.SubGrid([t,l],[Math.min(b,BP.DIMENSION.w-1),Math.min(r,BP.DIMENSION.h-1)])

    Grid.Set.Cells({location:subGrid.subGridIndexes,value:section.fillCharacter||''})
  });
  // console.clear()
  Grid.Render()
  console.log('convertedSectionCoordsMap: ', convertedSectionCoordsMap)
  console.log('BP: ', BP)
}

export const Init = (tuiData:TomlType) => {
  BP.TUI = tuiData
  console.clear() // start with a blank output
  Grid.Create.Config({
    FILL_CHARACTER:'.',
    GRID_HEIGHT:BP.DIMENSION.h,
    GRID_WIDTH:BP.DIMENSION.w,
  })
  Grid.Create.Initial()

  tuiData.sections?.length
  ? createSubSections()
  : Grid.Render()
}