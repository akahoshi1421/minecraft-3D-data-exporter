function checkStair(data: Record<string, string | number | boolean>) {
  // x+
  if (!data.upside_down_bit && data.weirdo_direction === 1) {
    return 4.0;
  }

  // x-
  if (!data.upside_down_bit && data.weirdo_direction === 0) {
    return 4.1;
  }

  // z+
  if (!data.upside_down_bit && data.weirdo_direction === 3) {
    return 4.2;
  }

  // z-
  if (!data.upside_down_bit && data.weirdo_direction === 2) {
    return 4.3;
  }

  // x+
  if (data.upside_down_bit && data.weirdo_direction === 1) {
    return 4.4;
  }

  // x-
  if (data.upside_down_bit && data.weirdo_direction === 0) {
    return 4.5;
  }

  // z+
  if (data.upside_down_bit && data.weirdo_direction === 3) {
    return 4.6;
  }

  // z-
  if (data.upside_down_bit && data.weirdo_direction === 2) {
    return 4.7;
  }

  return 1;
}

export { checkStair };
