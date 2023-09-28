import { Block } from "@minecraft/server";
import { blockDict } from "../lib/dict";
import { glassIronFence } from "./fence/glassIronFence";
import { stoneFence } from "./fence/stoneFence";
import { woodFence } from "./fence/woodFence";
import { snow } from "./snow/snow";

/**
 * そのブロックが何のブロックか判別します。
 * @param {string} block ブロック名
 * @param {Block} blockData ブロックデータ(JSON)
 * @param {number} x x座標
 * @param {number} y y座標
 * @param {number} z z座標
 * @param {boolean} isCheck 隣接ブロックチェック時の処理か
 * @returns ブロックデータ(数値)
 */
function whichBlock(
  block: string,
  blockData: Block,
  x: number,
  y: number,
  z: number,
  isCheck = false
) {
  const data = blockData.permutation.getAllStates();

  if (blockDict.ignoreBlocks.includes(block)) {
    return 0;
  }

  if (blockDict.carpetBlocks.includes(block)) {
    return 2;
  }

  if (blockDict.halfBlocks.includes(block)) {
    if (data["minecraft:vertical_half"] === "top") {
      return 3.0;
    } else {
      return 3.1;
    }
  }

  if (blockDict.stairBlocks.includes(block)) {
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

  if (block === "snow_layer") {
    return snow(data);
  }

  if (blockDict.woodFence.includes(block)) {
    if (isCheck) return 1.1;
    else return woodFence(x, y, z);
  }

  if (blockDict.glassIronFence.includes(block)) {
    if (isCheck) return 1.2;
    else return glassIronFence(x, y, z);
  }

  if (blockDict.stoneFence.includes(block)) {
    if (isCheck) return 1.3;
    else return stoneFence(data, x, y, z);
  }

  if (block === "end_portal_frame") {
    return 9.0;
  }

  if (blockDict.pressurePlate.includes(block)) {
    return 10.0;
  }

  if (block === "enchanting_table") {
    return 11.0;
  }

  return 1;
}

export { whichBlock };
