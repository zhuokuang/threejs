import { hideDatGui, showDatGui } from '@/dat';

// 控制场景的变量
// isRoomSenen 为 true 代表当前显示实验室场景
// isRoomSenen 为 false 代表当前显示分子场景
let isRoomScene = true;

// 改变场景函数
// 如果当前显示实验室场景，则转换至分子场景
// 如果当前显示分子场景，则转换至实验室场景
function changeScene() {
  if (isRoomScene) {
    isRoomScene = false;
    hideDatGui();
  } else {
    isRoomScene = true;
    showDatGui();
  }
}

function getIsRoomScene() {
  return isRoomScene;
}

export { getIsRoomScene, changeScene };
