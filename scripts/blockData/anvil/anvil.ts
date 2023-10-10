/**
 * 金床ブロックの詳細を返す
 * @param {Record<string, string | number | boolean>} data
 * @returns ブロックデータ
 */

function anvil(data: Record<string, string | number | boolean>) {
  switch (data["minecraft:cardinal_direction"]) {
    case "east":
    case "west":
      return 13.0;
    case "north":
    case "south":
      return 13.1;
  }
  return 0;
}

export { anvil };
