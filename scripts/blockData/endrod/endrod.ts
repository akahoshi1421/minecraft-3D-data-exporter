/**
 * エンドロッドの詳細を返す
 * @param {Record<string, string | number | boolean>} data
 * @returns ブロックデータ
 */

function endRod(data: Record<string, string | number | boolean>) {
  switch (data.facing_direction) {
    case 5:
      return 17.01;
    case 4:
      return 17.02;
    case 0:
      return 17.11;
    case 1:
      return 17.12;
    case 3:
      return 17.21;
    case 2:
      return 17.22;
  }

  return 0;
}

export { endRod };
