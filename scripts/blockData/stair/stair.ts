import { world } from "@minecraft/server";
import { whichBlock } from "../whichBlock";
import { checkStair } from "./checkStair";

/**
 * 階段ブロックの詳細を返す
 * @param {Record<string, string | number | boolean>} data
 * @param x
 * @param y
 * @param z
 * @returns ブロックデータ
 */

function stair(
  data: Record<string, string | number | boolean>,
  x: number,
  y: number,
  z: number,
  isCheck: boolean = false
) {
  // 階段ブロックチェック用
  if (isCheck) return checkStair(data);

  // 通常ブロック返却用
  // 下
  if (!data.upside_down_bit && data.weirdo_direction === 1) {
    if (searchBlock(x - 1, y, z) === 4.2 && searchBlock(x, y, z + 1) !== 4.0)
      return 4.814;
    if (searchBlock(x - 1, y, z) === 4.3 && searchBlock(x, y, z - 1) !== 4.0)
      return 4.813;
    if (searchBlock(x + 1, y, z) === 4.2 && searchBlock(x, y, z - 1) !== 4.0)
      return 4.824;
    if (searchBlock(x + 1, y, z) === 4.3 && searchBlock(x, y, z + 1) !== 4.0)
      return 4.823;

    return 4.0;
  }
  if (!data.upside_down_bit && data.weirdo_direction === 0) {
    if (searchBlock(x + 1, y, z) === 4.2 && searchBlock(x, y, z + 1) !== 4.1)
      return 4.812;
    if (searchBlock(x + 1, y, z) === 4.3 && searchBlock(x, y, z - 1) !== 4.1)
      return 4.811;
    if (searchBlock(x - 1, y, z) === 4.2 && searchBlock(x, y, z - 1) !== 4.1)
      return 4.822;
    if (searchBlock(x - 1, y, z) === 4.3 && searchBlock(x, y, z + 1) !== 4.1)
      return 4.821;

    return 4.1;
  }
  if (!data.upside_down_bit && data.weirdo_direction === 3) {
    if (searchBlock(x, y, z - 1) === 4.0 && searchBlock(x + 1, y, z) !== 4.2)
      return 4.814;
    if (searchBlock(x, y, z - 1) === 4.1 && searchBlock(x - 1, y, z) !== 4.2)
      return 4.812;
    if (searchBlock(x, y, z + 1) === 4.0 && searchBlock(x - 1, y, z) !== 4.2)
      return 4.824;
    if (searchBlock(x, y, z + 1) === 4.1 && searchBlock(x + 1, y, z) !== 4.2)
      return 4.822;

    return 4.2;
  }
  if (!data.upside_down_bit && data.weirdo_direction === 2) {
    if (searchBlock(x, y, z + 1) === 4.0 && searchBlock(x + 1, y, z) !== 4.3)
      return 4.813;
    if (searchBlock(x, y, z + 1) === 4.1 && searchBlock(x - 1, y, z) !== 4.3)
      return 4.811;
    if (searchBlock(x, y, z - 1) === 4.1 && searchBlock(x - 1, y, z) !== 4.3)
      return 4.823;
    if (searchBlock(x, y, z - 1) === 4.0 && searchBlock(x + 1, y, z) !== 4.3)
      return 4.821;

    return 4.3;
  }

  // 上
  if (data.upside_down_bit && data.weirdo_direction === 1) {
    if (searchBlock(x - 1, y, z) === 4.6 && searchBlock(x, y, z + 1) !== 4.4)
      return 4.914;
    if (searchBlock(x - 1, y, z) === 4.7 && searchBlock(x, y, z - 1) !== 4.4)
      return 4.913;
    if (searchBlock(x + 1, y, z) === 4.6 && searchBlock(x, y, z - 1) !== 4.4)
      return 4.924;
    if (searchBlock(x + 1, y, z) === 4.7 && searchBlock(x, y, z + 1) !== 4.4)
      return 4.923;

    return 4.4;
  }
  if (data.upside_down_bit && data.weirdo_direction === 0) {
    if (searchBlock(x + 1, y, z) === 4.6 && searchBlock(x, y, z + 1) !== 4.5)
      return 4.912;
    if (searchBlock(x + 1, y, z) === 4.7 && searchBlock(x, y, z - 1) !== 4.5)
      return 4.911;
    if (searchBlock(x - 1, y, z) === 4.6 && searchBlock(x, y, z - 1) !== 4.5)
      return 4.922;
    if (searchBlock(x - 1, y, z) === 4.7 && searchBlock(x, y, z + 1) !== 4.5)
      return 4.921;

    return 4.5;
  }
  if (data.upside_down_bit && data.weirdo_direction === 3) {
    if (searchBlock(x, y, z - 1) === 4.4 && searchBlock(x + 1, y, z) !== 4.6)
      return 4.914;
    if (searchBlock(x, y, z - 1) === 4.5 && searchBlock(x - 1, y, z) !== 4.6)
      return 4.912;
    if (searchBlock(x, y, z + 1) === 4.4 && searchBlock(x - 1, y, z) !== 4.6)
      return 4.924;
    if (searchBlock(x, y, z + 1) === 4.5 && searchBlock(x + 1, y, z) !== 4.6)
      return 4.922;

    return 4.6;
  }
  if (data.upside_down_bit && data.weirdo_direction === 2) {
    if (searchBlock(x, y, z + 1) === 4.4 && searchBlock(x + 1, y, z) !== 4.7)
      return 4.913;
    if (searchBlock(x, y, z + 1) === 4.5 && searchBlock(x - 1, y, z) !== 4.7)
      return 4.911;
    if (searchBlock(x, y, z - 1) === 4.4 && searchBlock(x - 1, y, z) !== 4.7)
      return 4.923;
    if (searchBlock(x, y, z - 1) === 4.5 && searchBlock(x + 1, y, z) !== 4.7)
      return 4.921;

    return 4.7;
  }
}

/**
 * 特定の場所のブロックを検索する
 * @param x
 * @param y
 * @param z
 * @returns ブロックの種類
 */
function searchBlock(x: number, y: number, z: number) {
  const blockData = world
    .getDimension("overworld")
    .getBlock({ x: x, y: y, z: z });

  if (!blockData) return 0;

  const block = blockData.type.id.split(":")[1];

  return whichBlock(block, blockData, x, y, z, true);
}

export { stair };
