/**
 * Supported by RetoRuto9900K
 */

import { world, Player, system } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { structureLoad } from "./blockData/structureLoad";

// Subscribe to an event that calls every Minecraft tick
// system.runInterval(() => {
//   // Spams the chat with "Hello World" with world.sendMessage function in API
//   // or run a command in overworld dimension
//   // using native API methods (such as world.sendMessage) are recommended whenever possible.
//   const d = world.getDimension("overworld");
//   try {
//     const blockData = d.getBlock({ x: 0, y: 0, z: 0 })!;
//     d.getPlayers()[0].sendMessage(
//       `${JSON.stringify(blockData.permutation.getAllStates())}   ${
//         blockData.type.id
//       }`
//     );
//   } catch (e) {
//     d.runCommand(`say ${e}`);
//   }
// }, 60);

//内部処理用座標
const startPos = { x: 0, y: 0, z: 0 };
const endPos = { x: 0, y: 0, z: 0 };

//メニュー保存用
let email = "";
let toggleValue = false;

// 始点終点フラグ(始点がfalse、終点がtrue)
let positionIs = false;

// 特定のアイテムを使った時にFormを開く例
world.afterEvents.itemUse.subscribe((event) => {
  // アイテムを使用した時に動くイベント
  if (!(event.source instanceof Player)) return; // プレイヤーでなければ処理を抜ける

  const player = event.source; // 変数に使った人(Player)を代入

  switch (event.itemStack.typeId) {
    case "minecraft:stick":
      menu(player); // Formを表示
      break;

    case "minecraft:diamond_sword":
      positionRegister(player); // 座標登録処理
      break;

    default:
      break;
  }
});

/** @param {Player} player */
function positionRegister(player: Player) {
  //プレイヤーの座標取り出し
  const playerLocation = player.getHeadLocation();
  const [x, y, z] = [
    Math.floor(playerLocation.x),
    Math.floor(playerLocation.y) - 1,
    Math.floor(playerLocation.z),
  ];

  // 始点座標の登録
  if (!positionIs) {
    startPos.x = x;
    startPos.y = y;
    startPos.z = z;

    player.sendMessage(`始点座標が登録されました (§l§c${x}, ${y}, ${z}§r)`);
  }
  // 終点座標の登録
  else {
    endPos.x = x;
    endPos.y = y;
    endPos.z = z;

    player.sendMessage(`終点座標が登録されました (§l§c${x}, ${y}, ${z}§r)`);
  }

  positionIs = !positionIs;
}

/** @param {Player} player */
async function menu(player: Player) {
  const playerLocation = player.getHeadLocation();

  const form = new ModalFormData();
  form.title("メールアドレスを入力してください");
  form.textField(
    `現在登録された座標は\n
  始点座標: (§l§c${startPos.x}, ${startPos.y}, ${startPos.z}§r)\n
  終点座標: (§l§c${endPos.x}, ${endPos.y}, ${endPos.z}§r)\n\n
  メールアドレス`,
    "hoge@example.com",
    email
  );
  form.toggle("サーバに送信しますか？", toggleValue);

  const { canceled, formValues } = await form.show(player); // 表示する selectionに何番目のボタンを押したかが入る

  if (canceled) return; // キャンセルされていたら処理を抜ける
  if (!formValues) return;

  //メニュー保存
  email = formValues[0] as string;
  toggleValue = formValues[1] as boolean;

  //メールの形が正しくなければ抜ける
  if (
    !email.match(
      /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
    )
  ) {
    player.sendMessage("メールの形が正しくありません");
    return;
  }

  // サーバに送信しないモードなら抜ける
  if (toggleValue === false) return;

  player.sendMessage("§l§cデータの送信を開始します§r");
  const result = structureLoad(player, startPos, endPos);

  player.runCommand(
    `say ${JSON.stringify({ email: email, structure: result })}`
  );

  player.sendMessage("§l§cデータの送信が完了しました§r");
}
