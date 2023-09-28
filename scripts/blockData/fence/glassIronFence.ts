import { world } from "@minecraft/server";
import { whichBlock } from "../whichBlock";

function glassIronFence(x: number, y: number, z: number) {
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

    //隣接ブロックが通常ブロックもしくは板ガラスもしくは鉄格子もしくは石のフェンスの場合
    if (
      whichBlock(block, blockData, x, y, z, true) === 1 ||
      whichBlock(block, blockData, x, y, z, true) === 1.2 ||
      whichBlock(block, blockData, x, y, z, true) === 1.3
    ) {
      hitNeighbors.push(checkCoord);
    }
  });

  const hitNeighborsSorted = hitNeighbors.sort();

  switch (hitNeighbors.length) {
    case 0:
      return 7.0;
    case 1:
      // xMinus
      if (JSON.stringify(hitNeighbors[0]) === JSON.stringify([-1, 0])) {
        return 7.11;
      }

      // xPlus
      if (JSON.stringify(hitNeighbors[0]) === JSON.stringify([1, 0])) {
        return 7.12;
      }

      // zMinus
      if (JSON.stringify(hitNeighbors[0]) === JSON.stringify([0, -1])) {
        return 7.13;
      }

      // zPlus
      if (JSON.stringify(hitNeighbors[0]) === JSON.stringify([0, 1])) {
        return 7.14;
      }
      break;
    case 2:
      // xMinusZMinus
      if (
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, -1])
      ) {
        return 7.21;
      }

      // xMinusZPlus
      else if (
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, 1])
      ) {
        return 7.22;
      }

      // xPlusXMinus
      else if (
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0])
      ) {
        return 7.23;
      }

      // xPlusZMinus
      else if (
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([0, -1])
      ) {
        return 7.24;
      }

      // xPlusZPlus
      else if (
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([0, 1])
      ) {
        return 7.25;
      }

      // zPlusZMinus
      else if (
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, 1]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([0, -1])
      ) {
        return 7.26;
      }
      break;
    case 3:
      // xMinusZPlusZMinus
      if (
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[2]) === JSON.stringify([0, 1]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, -1])
      ) {
        return 7.31;
      }

      // xPlusXMinusZMinus
      if (
        JSON.stringify(hitNeighborsSorted[2]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, -1])
      ) {
        return 7.32;
      }

      // xPlusXMinusZPlus
      if (
        JSON.stringify(hitNeighborsSorted[2]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, 1])
      ) {
        return 7.33;
      }

      // xPlusZPlusZMinus
      if (
        JSON.stringify(hitNeighborsSorted[2]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, 1]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([0, -1])
      ) {
        return 7.34;
      }
      break;
    case 4:
      return 7.4;
  }

  return 0;
}

export { glassIronFence };
