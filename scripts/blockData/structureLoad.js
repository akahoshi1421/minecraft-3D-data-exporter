import { world, Player } from "@minecraft/server";

/**
 * 指定範囲の構造物をJSONデータに変換します。
 * @param {Player} player 対象プレイヤー
 * @param startPos 始点座標
 * @param endPos 終点座標
 * @returns 構造物データ
 */
function structureLoad(player, startPos, endPos){
  const resultStrcture = [];
  
  const yourWorld = world.getDimension("overworld");

  const xMin = startPos.x <= endPos.x ? startPos.x : endPos.x;
  const xMax = startPos.x > endPos.x ? startPos.x : endPos.x;

  const yMin = startPos.y <= endPos.y ? startPos.y : endPos.y;
  const yMax = startPos.y > endPos.y ? startPos.y : endPos.y;

  const zMin = startPos.z <= endPos.z ? startPos.z : endPos.z;
  const zMax = startPos.z > endPos.z ? startPos.z : endPos.z;

//   let y = 0;
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

export { structureLoad }