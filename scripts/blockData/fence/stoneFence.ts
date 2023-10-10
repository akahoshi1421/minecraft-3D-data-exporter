import { world } from "@minecraft/server";
import { whichBlock } from "../whichBlock";

function stoneFence(
  data: Record<string, string | number | boolean>,
  x: number,
  y: number,
  z: number
): number {
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

    //隣接ブロックが通常ブロックもしくは板ガラスもしくは鉄格子もしくは石のフェンスもしくはフェンスゲートの場合
    if (
      whichBlock(block, blockData, x, y, z, true) === 1 ||
      whichBlock(block, blockData, x, y, z, true) === 1.2 ||
      whichBlock(block, blockData, x, y, z, true) === 1.3 ||
      whichBlock(block, blockData, x, y, z, true) === 1.4
    ) {
      hitNeighbors.push(checkCoord);
    }
  });

  const hitNeighborsSorted = hitNeighbors.sort();

  switch (hitNeighbors.length) {
    case 0:
      return 8.0;
    case 1:
      // xMinus
      if (JSON.stringify(hitNeighbors[0]) === JSON.stringify([-1, 0])) {
        return Number(
          `8.11${data.wall_connection_type_west === "short" ? 1 : 2}`
        );
      }

      // xPlus
      if (JSON.stringify(hitNeighbors[0]) === JSON.stringify([1, 0])) {
        return Number(
          `8.12${data.wall_connection_type_east === "short" ? 1 : 2}`
        );
      }

      // zMinus
      if (JSON.stringify(hitNeighbors[0]) === JSON.stringify([0, -1])) {
        return Number(
          `8.13${data.wall_connection_type_north === "short" ? 1 : 2}`
        );
      }

      // zPlus
      if (JSON.stringify(hitNeighbors[0]) === JSON.stringify([0, 1])) {
        return Number(
          `8.14${data.wall_connection_type_south === "short" ? 1 : 2}`
        );
      }
      break;
    case 2:
      // xMinusZMinus
      if (
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, -1])
      ) {
        return Number(
          `8.21${data.wall_connection_type_west === "short" ? 1 : 2}${
            data.wall_connection_type_north === "short" ? 1 : 2
          }`
        );
      }

      // xMinusZPlus
      else if (
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, 1])
      ) {
        return Number(
          `8.22${data.wall_connection_type_west === "short" ? 1 : 2}${
            data.wall_connection_type_south === "short" ? 1 : 2
          }`
        );
      }

      // xPlusXMinus
      else if (
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0])
      ) {
        if (data.wall_post_bit) {
          return Number(
            `8.23${data.wall_connection_type_east === "short" ? 1 : 2}${
              data.wall_connection_type_west === "short" ? 1 : 2
            }21`
          );
        } else {
          const blockDataX = world
            .getDimension("overworld")
            .getBlock({ x: x, y: y + 1, z: z });

          if (!blockDataX) return 8.231111;

          const blockX = blockDataX.type.id.split(":")[1];

          return Number(
            `8.23${data.wall_connection_type_east === "short" ? 1 : 2}${
              data.wall_connection_type_west === "short" ? 1 : 2
            }1${whichBlock(blockX, blockDataX, x, y, z, true) !== 0 ? 2 : 1}`
          );
        }
      }

      // xPlusZMinus
      else if (
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([0, -1])
      ) {
        return Number(
          `8.24${data.wall_connection_type_east === "short" ? 1 : 2}${
            data.wall_connection_type_north === "short" ? 1 : 2
          }`
        );
      }

      // xPlusZPlus
      else if (
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([0, 1])
      ) {
        return Number(
          `8.25${data.wall_connection_type_east === "short" ? 1 : 2}${
            data.wall_connection_type_south === "short" ? 1 : 2
          }`
        );
      }

      // zPlusZMinus
      else if (
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, 1]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([0, -1])
      ) {
        if (data.wall_post_bit) {
          return Number(
            `8.26${data.wall_connection_type_south === "short" ? 1 : 2}${
              data.wall_connection_type_north === "short" ? 1 : 2
            }21`
          );
        } else {
          const blockDataZ = world
            .getDimension("overworld")
            .getBlock({ x: x, y: y + 1, z: z });

          if (!blockDataZ) return 8.231111;

          const blockZ = blockDataZ.type.id.split(":")[1];

          return Number(
            `8.26${data.wall_connection_type_south === "short" ? 1 : 2}${
              data.wall_connection_type_north === "short" ? 1 : 2
            }1${whichBlock(blockZ, blockDataZ, x, y, z, true) !== 0 ? 2 : 1}`
          );
        }
      }
      break;

    case 3:
      // xMinusZPlusZMinus
      if (
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[2]) === JSON.stringify([0, 1]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, -1])
      ) {
        return Number(
          `8.31${data.wall_connection_type_west === "short" ? 1 : 2}${
            data.wall_connection_type_south === "short" ? 1 : 2
          }${data.wall_connection_type_north === "short" ? 1 : 2}`
        );
      }

      // xPlusXMinusZMinus
      if (
        JSON.stringify(hitNeighborsSorted[2]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, -1])
      ) {
        return Number(
          `8.32${data.wall_connection_type_east === "short" ? 1 : 2}${
            data.wall_connection_type_west === "short" ? 1 : 2
          }${data.wall_connection_type_north === "short" ? 1 : 2}`
        );
      }

      // xPlusXMinusZPlus
      if (
        JSON.stringify(hitNeighborsSorted[2]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([-1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, 1])
      ) {
        return Number(
          `8.33${data.wall_connection_type_east === "short" ? 1 : 2}${
            data.wall_connection_type_west === "short" ? 1 : 2
          }${data.wall_connection_type_south === "short" ? 1 : 2}`
        );
      }

      // xPlusZPlusZMinus
      if (
        JSON.stringify(hitNeighborsSorted[2]) === JSON.stringify([1, 0]) &&
        JSON.stringify(hitNeighborsSorted[1]) === JSON.stringify([0, 1]) &&
        JSON.stringify(hitNeighborsSorted[0]) === JSON.stringify([0, -1])
      ) {
        return Number(
          `8.34${data.wall_connection_type_east === "short" ? 1 : 2}${
            data.wall_connection_type_south === "short" ? 1 : 2
          }${data.wall_connection_type_north === "short" ? 1 : 2}`
        );
      }

      break;

    case 4:
      return Number(
        `8.41${data.wall_connection_type_east === "short" ? 1 : 2}${
          data.wall_connection_type_west === "short" ? 1 : 2
        }${data.wall_connection_type_south === "short" ? 1 : 2}${
          data.wall_connection_type_north === "short" ? 1 : 2
        }`
      );
  }

  return 0;
}

export { stoneFence };
