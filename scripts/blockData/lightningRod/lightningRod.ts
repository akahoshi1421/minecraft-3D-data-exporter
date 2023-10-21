/**
 * 避雷針の詳細を返す
 * @param {Record<string, string | number | boolean>} data
 * @returns ブロックデータ
 */

function lightningRod(data: Record<string, string | number | boolean>) {
  switch (data.facing_direction) {
    case 4:
      return 18.01;
    case 5:
      return 18.02;
    case 0:
      return 18.11;
    case 1:
      return 18.12;
    case 2:
      return 18.21;
    case 3:
      return 18.22;
  }

  return 0;
}

export { lightningRod };
