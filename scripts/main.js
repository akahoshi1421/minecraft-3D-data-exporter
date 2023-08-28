/**
 * Supported by RetoRuto9900K
 */

import { world, Player } from '@minecraft/server';
import { ModalFormData } from '@minecraft/server-ui';

const startPos = {x: 0, y: 0, z: 0};
const endPos = {x: 0, y: 0, z: 0};
let email = "";
let toggleValue = false;

// 特定のアイテムを使った時にFormを開く例
world.afterEvents.itemUse.subscribe(event => { // アイテムを使用した時に動くイベント
  if (!(event.source instanceof Player)) return; // プレイヤーでなければ処理を抜ける

  const player = event.source; // 変数に使った人(Player)を代入
  
  if (event.itemStack.typeId === 'minecraft:stick') { // 使ったアイテムのtypeIdが棒だったら
    menu(player).catch(console.error); // Formを表示
  }
});

/** @param {Player} player */
async function menu(player) {

  const playerLocation = player.getHeadLocation();

  const form = new ModalFormData();  
  form.title(`範囲を入力してください §l§4現在座標(${Math.floor(playerLocation.x)}, ${Math.floor(playerLocation.y) - 1}, ${Math.floor(playerLocation.z)})`);
  form.textField("始点座標(,区切り)", "ここに入力", `${startPos.x},${startPos.y},${startPos.z}`);
  form.textField("終点座標(,区切り)", "ここに入力", `${endPos.x},${endPos.y},${endPos.z}`);
  form.textField("メールアドレス", "ここに入力", email);
  form.toggle("サーバに送信しますか？", toggleValue);

  const { canceled, formValues } = await form.show(player); // 表示する selectionに何番目のボタンを押したかが入る
  
  if (canceled) return; // キャンセルされていたら処理を抜ける

  // 始点座標が不正な値(,数の不整合)なら抜ける 
  if(formValues[0].split(",").length !== 3){
    player.sendMessage("座標はカンマ「,」区切りです。");
    return;
  }

  // 始点座標が不正な値(数字ではない値が入っている)なら抜ける
  if(formValues[0].split(",").filter(n => Number(n) === NaN).length !== 0){
    player.sendMessage("始点座標が不正な値です。");
    return;
  }
    
  [startPos.x, startPos.y, startPos.z] = formValues[0].split(",").map(n => Number(n));

  // 終点座標が不正な値(,数の不整合)なら抜ける
  if(formValues[1].split(",").length !== 3){
    player.sendMessage("座標はカンマ「,」区切りです。");
    return;
  }

  // 終点座標が不正な値(数字ではない値が入っている)なら抜ける
  if(formValues[1].split(",").filter(n => Number(n) === NaN).length !== 0){
    player.sendMessage("終点座標が不正な値です。");
    return;
  }

  [endPos.x, endPos.y, endPos.z] = formValues[1].split(",").map(n => Number(n));

  email = formValues[2];
  toggleValue = formValues[3];

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