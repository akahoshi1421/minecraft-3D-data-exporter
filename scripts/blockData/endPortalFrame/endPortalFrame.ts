/**
 * エンドポータルの詳細を返す
 * @param {Record<string, string | number | boolean>} data
 * @returns ブロックデータ
 */

function endPortalFrame(data: Record<string, string | number | boolean>) {
  if (data.end_portal_eye_bit) return 9.0;
  else return 9.1;
}

export { endPortalFrame };
