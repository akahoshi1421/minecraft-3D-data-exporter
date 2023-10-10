/**
 * ボタンの詳細を返す
 * @param {Record<string, string | number | boolean>} data
 * @returns ブロックデータ
 */

function button(data: Record<string, string | number | boolean>) {
  switch (data.facing_direction) {
    case 4:
      return 12.01;
    case 5:
      return 12.02;
    case 0:
      return 12.11;
    case 1:
      return 12.12;
    case 2:
      return 12.21;
    case 3:
      return 12.22;
  }

  return 0;
}

export { button };
