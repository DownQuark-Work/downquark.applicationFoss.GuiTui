// extraneous helpers that are useful but not essential, and therefore not in the submodule
import { Grid } from '../_deps.ts'
import { COORDINATE_TLBR_ARRAY_INDEX_ENUM, TLBR_KEY_INDEX_ENUM } from "./_constants.ts"

import { KeyValueType, TLBRobjWithEnumKeyType } from "../../guitui.d.ts";

export const cornerCoords = (tlbr:[number,number,number,number], removeAdjacent=true):TLBRobjWithEnumKeyType => {
  const rawObj:TLBRobjWithEnumKeyType = {
    TL: {...Grid.Set.Position([tlbr[COORDINATE_TLBR_ARRAY_INDEX_ENUM.LEFT],tlbr[COORDINATE_TLBR_ARRAY_INDEX_ENUM.TOP]])},
    TR: {...Grid.Set.Position([tlbr[COORDINATE_TLBR_ARRAY_INDEX_ENUM.RIGHT],tlbr[COORDINATE_TLBR_ARRAY_INDEX_ENUM.TOP]])},
    BL: {...Grid.Set.Position([tlbr[COORDINATE_TLBR_ARRAY_INDEX_ENUM.LEFT],tlbr[COORDINATE_TLBR_ARRAY_INDEX_ENUM.BOTTOM]])},
    BR: {...Grid.Set.Position([tlbr[COORDINATE_TLBR_ARRAY_INDEX_ENUM.RIGHT],tlbr[COORDINATE_TLBR_ARRAY_INDEX_ENUM.BOTTOM]])},
  }
  if(removeAdjacent) {
    delete rawObj.TL.ADJACENT
    delete rawObj.TR.ADJACENT
    delete rawObj.BL.ADJACENT
    delete rawObj.BR.ADJACENT
  }
  return rawObj
}