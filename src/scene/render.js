import { initDatGui } from '@/dat';
import { render as roomRender } from './roomRender';
import { render as moleculesRender } from './moleculesRender';
import { getIsRoomScene } from '@/context';

// 初始化控制面板
initDatGui();
// 开始循环
function animate() {
  requestAnimationFrame(animate);

  if (getIsRoomScene()) {
    roomRender();
  } else {
    moleculesRender();
  }
}

export { animate };
