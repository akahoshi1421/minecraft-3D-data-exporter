import { world } from "@minecraft/server";
import { whichBlock } from "../whichBlock";

/**
 * 木のフェンスの詳細を返す
 * @param {Record<string, string | number | boolean>} data
 * @returns ブロックデータ
 */

function woodFence(x: number, y: number, z: number) {
  const checkList = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const hitNeighbors: number[][] = [];

  checkList.forEach((checkCoord) => {
    const blockData = world
      .getDimension("overworld")
      .getBlock({ x: x + checkCoord[0], y: y, z: z + checkCoord[1] });

    if (!blockData) return 0;

    const block = blockData.type.id.split(":")[1];

    //隣接ブロックが通常ブロックもしくは木のフェンスの場合
    if (
      whichBlock(block, blockData, x, y, z, true) === 1 ||
      whichBlock(block, blockData, x, y, z, true) === 1.1
    ) {
      hitNeighbors.push(checkCoord);
    }
  });

  const hitNeighborsSorted = hitNeighbors.sort();

  switch (hitNeighbors.length) {
    case 0:
      return 6.0;
    case 1:
      if (JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0])) {
        return 6.11;
      } else if (
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([1, 0])
      ) {
        return 6.12;
      } else if (
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([0, -1])
      ) {
        return 6.13;
      } else if (
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([0, 1])
      ) {
        return 6.14;
      }
      break;
    case 2:
      // xMinusZMinus
      if (
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, -1])
      ) {
        return 6.21;
      }

      // xMinusZPlus
      else if (
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, 1])
      ) {
        return 6.22;
      }

      // xPlusXMinus
      else if (
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0])
      ) {
        return 6.23;
      }

      // xPlusZMinus
      else if (
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([0, -1])
      ) {
        return 6.24;
      }

      // xPlusZPlus
      else if (
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([0, 1])
      ) {
        return 6.25;
      }

      // zPlusZMinus
      else if (
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, 1]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([0, -1])
      ) {
        return 6.26;
      }
      break;

    case 3:
      // xMinusZPlusZMinus
      if (
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[2]) === JSON.stringify([0, 1]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, -1])
      ) {
        return 6.31;
      }

      // xPlusXMinusZMinus
      if (
        JSON.stringify(hitNeighborsSorted[2]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, -1])
      ) {
        return 6.32;
      }

      // xPlusXMinusZPlus
      if (
        JSON.stringify(hitNeighborsSorted[2]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, 1])
      ) {
        return 6.33;
      }

      // xPlusZPlusZMinus
      if (
        JSON.stringify(hitNeighborsSorted[2]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, 1]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([0, -1])
      ) {
        return 6.34;
      }
      break;

    case 4:
      return 6.4;
  }

  return 0;
}

export { woodFence };
