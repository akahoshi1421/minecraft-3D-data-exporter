import { Block } from "@minecraft/server";
import { blockDict } from "../lib/dict";
import { anvil } from "./anvil/anvil";
import { button } from "./button/button";
import { door } from "./door/door";
import { endPortalFrame } from "./endPortalFrame/endPortalFrame";
import { endRod } from "./endrod/endrod";
import { glassIronFence } from "./fence/glassIronFence";
import { stoneFence } from "./fence/stoneFence";
import { woodFence } from "./fence/woodFence";
import { fenceGate } from "./fenceGate/fenceGate";
import { lightningRod } from "./lightningRod/lightningRod";
import { snow } from "./snow/snow";
import { stair } from "./stair/stair";
import { trapDoor } from "./trapDoor/trapDoor";

/**
 * そのブロックが何のブロックか判別します。
 * @param {string} block ブロック名
 * @param {Block} blockData ブロックデータ(JSON)
 * @param {number} x x座標
 * @param {number} y y座標
 * @param {number} z z座標
 * @param {boolean} isCheck 隣接ブロックチェック時の処理か
 * @returns ブロックデータ(数値)
 */
function whichBlock(
  block: string,
  blockData: Block,
  x: number,
  y: number,
  z: number,
  isCheck = false
): number {
  const data = blockData.permutation.getAllStates();

  if (blockDict.ignoreBlocks.includes(block)) {
    return 0;
  }

  if (blockDict.carpetBlocks.includes(block)) {
    return 2;
  }

  if (blockDict.halfBlocks.includes(block)) {
    if (data["minecraft:vertical_half"] === "top") {
      return 3.0;
    } else {
      return 3.1;
    }
  }

  if (blockDict.stairBlocks.includes(block)) {
    return stair(data, x, y, z, isCheck);
  }

  if (block === "snow_layer") {
    return snow(data);
  }

  if (blockDict.woodFence.includes(block)) {
    if (isCheck) return 1.1;
    else return woodFence(x, y, z);
  }

  if (blockDict.glassIronFence.includes(block)) {
    if (isCheck) return 1.2;
    else return glassIronFence(x, y, z);
  }

  if (blockDict.stoneFence.includes(block)) {
    if (isCheck) return 1.3;
    else return stoneFence(data, x, y, z);
  }

  if (block === "end_portal_frame") {
    return endPortalFrame(data);
  }

  if (blockDict.pressurePlate.includes(block)) {
    return 10.0;
  }

  if (block === "enchanting_table") {
    return 11.0;
  }

  if (blockDict.button.includes(block)) {
    return button(data);
  }

  if (block === "anvil") {
    return anvil(data);
  }

  if (blockDict.fencegate.includes(block)) {
    if (isCheck) return 1.4;
    return fenceGate(data);
  }

  if (blockDict.trapDoor.includes(block)) {
    return trapDoor(data);
  }

  if (blockDict.door.includes(block)) {
    if (isCheck) return door(data, x, y, z, true);
    return door(data, x, y, z);
  }

  if (block === "grass_path" || block === "farmland") {
    return 16.0;
  }

  if (block === "end_rod") {
    return endRod(data);
  }

  if (block === "lightning_rod") {
    return lightningRod(data);
  }

  return 1;
}

export { whichBlock };
