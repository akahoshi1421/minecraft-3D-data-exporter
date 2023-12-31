import { world, Player } from "@minecraft/server";
import { whichBlock } from "./whichBlock";

/**
 * 指定範囲の構造物をJSONデータに変換します。
 * @param {Player} player 対象プレイヤー
 * @param { {x: Number, y: Number, z: Number} } startPos 始点座標
 * @param { {x: Number, y: Number, z: Number} } endPos 終点座標
 * @returns 構造物データ
 */
function structureLoad(
  player: Player,
  startPos: { x: number; y: number; z: number },
  endPos: { x: number; y: number; z: number }
) {
  const resultStrcture = [];

  const yourWorld = world.getDimension("overworld");

  const xMin = startPos.x <= endPos.x ? startPos.x : endPos.x;
  const xMax = startPos.x > endPos.x ? startPos.x : endPos.x;

  const yMin = startPos.y <= endPos.y ? startPos.y : endPos.y;
  const yMax = startPos.y > endPos.y ? startPos.y : endPos.y;

  const zMin = startPos.z <= endPos.z ? startPos.z : endPos.z;
  const zMax = startPos.z > endPos.z ? startPos.z : endPos.z;

  let x = 0;
  let y = 0;
  let z = 0;

  for (y = yMin; y <= yMax; y++) {
    const xArray = [];

    for (x = xMin; x <= xMax; x++) {
      const zArray = [];

      for (z = zMin; z <= zMax; z++) {
        const blockData = yourWorld.getBlock({ x: x, y: y, z: z });

        if (blockData === undefined) {
          player.sendMessage("block data is unknown");
          throw new Error("block data is unknown");
        }

        const block = blockData.type.id.split(":")[1];
        zArray.push(whichBlock(block, blockData, x, y, z));
      }

      xArray.push(zArray);
    }

    resultStrcture.push(xArray);
  }

  return resultStrcture;
}

export { structureLoad };
