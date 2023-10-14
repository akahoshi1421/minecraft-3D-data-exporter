/**
 * トラップドアの詳細を返す
 * @param {Record<string, string | number | boolean>} data
 * @returns ブロックデータ
 */

function trapDoor(data: Record<string, string | number | boolean>) {
  const direction = data.direction;
  const openBit = data.open_bit;
  const upsideDownBit = data.upside_down_bit;

  switch (direction) {
    case 0:
      if (openBit) return 15.01;
      else if (!upsideDownBit) return 15.11;
      else return 15.12;

    case 1:
      if (openBit) return 15.02;
      else if (!upsideDownBit) return 15.11;
      else return 15.12;

    case 2:
      if (openBit) return 15.21;
      else if (!upsideDownBit) return 15.11;
      else return 15.12;

    case 3:
      if (openBit) return 15.22;
      else if (!upsideDownBit) return 15.11;
      else return 15.12;
  }

  return 1;
}

export { trapDoor };
