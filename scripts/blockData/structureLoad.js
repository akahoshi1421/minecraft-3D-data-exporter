import { world, Player } from "@minecraft/server";
import { whichBlock } from "./whichBlock";

/**
 * 指定範囲の構造物をJSONデータに変換します。
 * @param {Player} player 対象プレイヤー
 * @param startPos 始点座標
 * @param endPos 終点座標
 * @returns 構造物データ
 */
function structureLoad(player, startPos, endPos) {
  const resultStrcture = [];

  const yourWorld = world.getDimension("overworld");

  const xMin = startPos.x <= endPos.x ? startPos.x : endPos.x;
  const xMax = startPos.x > endPos.x ? startPos.x : endPos.x;

  const yMin = startPos.y <= endPos.y ? startPos.y : endPos.y;
  const yMax = startPos.y > endPos.y ? startPos.y : endPos.y;

  const zMin = startPos.z <= endPos.z ? startPos.z : endPos.z;
  const zMax = startPos.z > endPos.z ? startPos.z : endPos.z;

  //   let y = 0;
  let x = 0;
  let z = 0;

  for (y = yMin; y <= yMax; y++) {
    const xArray = [];

    for (x = xMin; x <= xMax; x++) {
      const zArray = [];

      for (z = zMin; z <= zMax; z++) {
        const blockData = yourWorld.getBlock({ x: x, y: y, z: z });

        if (blockData === undefined) {
          player.sendMessage("block data is unkown");
          throw new Error("block data is unknown");
        }

        const block = blockData.split(":")[1];
        zArray.push(whichBlock(block, blockData));
      }

      xArray.push(zArray);
    }

    resultStrcture.push(xArray);
  }

  return resultStrcture;
}

export { structureLoad };
