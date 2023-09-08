import { Block } from "@minecraft/server";
import { blockDict } from "../lib/dict";

/**
 * そのブロックが何のブロックか判別します。
 * @param {string} block ブロック名
 * @param {Block} blockData ブロックデータ(JSON)
 * @returns ブロックデータ(数値)
 */
function whichBlock(block, blockData) {
  const data = blockData.permutation.getAllStates();

  if (block in blockDict.ignoreBlocks) {
    return 0;
  }

  if (block in blockDict.carpetBlocks) {
    return 2;
  }

  if (block in blockDict.halfBlocks) {
    if (data.top_slot_bit) {
      return 3.0;
    } else {
      return 3.1;
    }
  }

  if (block in blockDict.stairBlocks) {
    if (!data.upside_down_bit && data.weirdo_direction === 1) {
      return 4.0;
    }
    if (!data.upside_down_bit && data.weirdo_direction === 0) {
      return 4.1;
    }
    if (!data.upside_down_bit && data.weirdo_direction === 3) {
      return 4.2;
    }
    if (!data.upside_down_bit && data.weirdo_direction === 2) {
      return 4.3;
    }

    if (data.upside_down_bit && data.weirdo_direction === 1) {
      return 4.4;
    }
    if (data.upside_down_bit && data.weirdo_direction === 0) {
      return 4.5;
    }
    if (data.upside_down_bit && data.weirdo_direction === 3) {
      return 4.6;
    }
    if (data.upside_down_bit && data.weirdo_direction === 2) {
      return 4.7;
    }
  }

  return 1;
}

export { whichBlock };
