import { world } from "@minecraft/server";
import { whichBlock } from "../whichBlock";

/**
 * ドアの詳細を返す
 * @param {Record<string, string | number | boolean>} data
 * @param x
 * @param y
 * @param z
 * @param isCheck 無限ループ対策用
 * @returns ブロックデータ
 */

function door(
  data: Record<string, string | number | boolean>,
  x: number,
  y: number,
  z: number,
  isCheck: boolean = false
) {
  const direction = data.direction;
  const openBit = data.open_bit;

  // ドアの上部は正常なデータを取れないので下準拠にさせる
  if (data.upper_direction_bit && !isCheck) {
    const blockData = world
      .getDimension("overworld")
      .getBlock({ x: x, y: y - 1, z: z });

    if (!blockData) return 0;

    const block = blockData.type.id.split(":")[1];
    return whichBlock(block, blockData, x, y, z, true);
  }

  switch (direction) {
    case 0:
      return openBit ? 15.11 : 15.01;
    case 1:
      return openBit ? 15.02 : 15.11;
    case 2:
      return openBit ? 15.12 : 15.02;
    case 3:
      return openBit ? 15.01 : 15.12;
  }

  return 1;
}

export { door };
