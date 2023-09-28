/**
 * 雪ブロックの詳細を返す
 * @param {Record<string, string | number | boolean>} data
 * @returns ブロックデータ
 */

function snow(data: Record<string, string | number | boolean>) {
  switch (data.height) {
    case 0:
      return 5.0;
    case 1:
      return 5.1;
    case 2:
      return 5.2;
    case 3:
      return 5.3;
    case 4:
      return 5.4;
    case 5:
      return 5.5;
    case 6:
      return 5.6;
    case 7:
      return 1;
  }
  return 0;
}

export { snow };
