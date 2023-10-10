/**
 * フェンスゲートの詳細を返す
 * @param {Record<string, string | number | boolean>} data
 * @returns ブロックデータ
 */

function fenceGate(data: Record<string, string | number | boolean>) {
  switch (data.direction) {
    case 0:
    case 2:
      if (data.in_wall_bit) return 14.02;
      else return 14.01;
    case 1:
    case 3:
      if (data.in_wall_bit) return 14.12;
      else return 14.11;
  }
  return 0;
}

export { fenceGate };
