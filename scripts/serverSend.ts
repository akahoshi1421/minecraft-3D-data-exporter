import { Player, system } from "@minecraft/server";
import { UserData } from "./types";

/**
 * サーバに対してデータを切り分けて送信します。
 * @param {number[][][]} wantSendData 送信したい構造物データ
 * @param {Player} player プレイヤー情報
 * @param {string} email 送信先アドレス
 * @param {number} scale 倍率
 */
function serverSend(
  wantSendData: number[][][],
  player: Player,
  email: string,
  scale: number
) {
  const wantSendDataJson = JSON.stringify(wantSendData);

  const stringArray: UserData[] = [];

  for (let i = 0; i < wantSendDataJson.length; i += 400) {
    if (i === 0 && i + 400 >= wantSendDataJson.length) {
      stringArray.push({
        email: email,
        state: 3,
        scale: scale,
        data: wantSendDataJson.substring(i, i + 400),
      });
    } else if (i === 0)
      stringArray.push({
        email: email,
        state: 0,
        scale: scale,
        data: wantSendDataJson.substring(i, i + 400),
      });
    else if (i + 400 >= wantSendDataJson.length)
      stringArray.push({
        email: email,
        state: 2,
        scale: scale,
        data: wantSendDataJson.substring(i, i + 400),
      });
    else
      stringArray.push({
        email: email,
        state: 1,
        scale: scale,
        data: wantSendDataJson.substring(i, i + 400),
      });
  }

  const arrayLength = stringArray.length;
  let cnt = 0;

  const sendInterval = system.runInterval(() => {
    if (cnt === arrayLength) {
      system.clearRun(sendInterval);
      player.sendMessage("§l§cデータの送信が完了しました§r");
      return;
    }

    player.runCommand(`say ${JSON.stringify(stringArray[cnt])}`);
    cnt++;
  }, 20);
}

export { serverSend };
