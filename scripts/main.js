/**
 * Supported by RetoRuto9900K
 */

import { world, Player } from '@minecraft/server';
import { ModalFormData } from '@minecraft/server-ui';

//内部処理用座標
const startPos = {x: 0, y: 0, z: 0};
const endPos = {x: 0, y: 0, z: 0};

//メニュー保存用
let startPosString = "";
let endPosString = "";
let email = "";
let toggleValue = false;

// 始点終点フラグ(始点がfalse、終点がtrue)
let positionIs = false;

// 特定のアイテムを使った時にFormを開く例
world.afterEvents.itemUse.subscribe(event => { // アイテムを使用した時に動くイベント
  if (!(event.source instanceof Player)) return; // プレイヤーでなければ処理を抜ける

  const player = event.source; // 変数に使った人(Player)を代入

  switch(event.itemStack.typeId){
    case "minecraft:stick":
      menu(player).catch(console.error); // Formを表示
      break;

    case "minecraft:diamond_sword":
      positionRegister(player); // 座標登録処理
      break;

    default:
      break;
  }
});

/** @param {Player} player */
function positionRegister(player){
  //プレイヤーの座標取り出し
  const playerLocation = player.getHeadLocation();
  const [x, y, z] = [Math.floor(playerLocation.x), Math.floor(playerLocation.y) - 1, Math.floor(playerLocation.z)];

  // 始点座標の登録
  if(!positionIs){
    startPos = {x, y, z};
    player.sendMessage(`始点座標が登録されました ${x}, ${y}, ${z}`);
  }
  // 終点座標の登録
  else{
    endPos = {x, y, z};
    player.sendMessage(`終点座標が登録されました ${x}, ${y}, ${z}`);
  }

  positionIs = !positionIs;
}


/** @param {Player} player */
async function menu(player) {

  const playerLocation = player.getHeadLocation();

  const form = new ModalFormData();  
  form.title("メールアドレスを入力してください");
  form.textField("メールアドレス", "hoge@example.com", email);
  form.toggle("サーバに送信しますか？", toggleValue);

  const { canceled, formValues } = await form.show(player); // 表示する selectionに何番目のボタンを押したかが入る
  
  if (canceled) return; // キャンセルされていたら処理を抜ける

  //メニュー保存
  startPosString = formValues[0];
  endPosString = formValues[1];
  email = formValues[2];
  toggleValue = formValues[3];

  // 始点座標が不正な値(,数の不整合)なら抜ける 
  if(startPosString.split(",").length !== 3){
    player.sendMessage("座標はカンマ「,」区切りです。");
    return;
  }

  // 始点座標が不正な値(数字ではない値が入っている)なら抜ける
  if(startPosString.split(",").filter(n => Number.isNaN(Number(n))).length !== 0){
    player.sendMessage(`始点座標が不正な値です。`);
    return;
  }
    
  [startPos.x, startPos.y, startPos.z] = startPosString.split(",").map(n => Number(n));

  // 終点座標が不正な値(,数の不整合)なら抜ける
  if(endPosString.split(",").length !== 3){
    player.sendMessage("座標はカンマ「,」区切りです。");
    return;
  }

  // 終点座標が不正な値(数字ではない値が入っている)なら抜ける
  if(endPosString.split(",").filter(n => Number.isNaN(Number(n))).length !== 0){
    player.sendMessage("終点座標が不正な値です。");
    return;
  }

  [endPos.x, endPos.y, endPos.z] = endPosString.split(",").map(n => Number(n));

  //メールの形が正しくなければ抜ける
  if(!email.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/)){
    player.sendMessage("メールの形が正しくありません");
    return;
  }

  // サーバに送信しないモードなら抜ける
  if(toggleValue === false) return;
 

  const result = structureLoad(player);

  player.runCommand(`say ${JSON.stringify({email: email, structure: result})}`);
}

function structureLoad(player){
  const resultStrcture = [];
  
  const yourWorld = world.getDimension("overworld");

  const xMin = startPos.x <= endPos.x ? startPos.x : endPos.x;
  const xMax = startPos.x > endPos.x ? startPos.x : endPos.x;

  const yMin = startPos.y <= endPos.y ? startPos.y : endPos.y;
  const yMax = startPos.y > endPos.y ? startPos.y : endPos.y;

  const zMin = startPos.z <= endPos.z ? startPos.z : endPos.z;
  const zMax = startPos.z > endPos.z ? startPos.z : endPos.z;

  let y = 0;
  let x = 0;
  let z = 0;

  try{
    for(y = yMin; y <= yMax; y++){
      const xArray = [];
  
      for(x = xMin; x <= xMax; x++){
        const zArray = [];
  
        for(z = zMin; z<= zMax; z++){
          const blockData = yourWorld.getBlock({x: x, y: y, z: z});
          if(!blockData.permutation.matches("air")){
            zArray.push(1);
          }
          else{
            zArray.push(0);
          }
        }
  
        xArray.push(zArray);
      }
  
      resultStrcture.push(xArray);
    }
  }
  catch(e){
    player.sendMessage(`${x}, ${y}, ${z}   ${e}`);
  }
  

 return resultStrcture;
}