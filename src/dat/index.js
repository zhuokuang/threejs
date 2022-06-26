import * as dat from 'dat.gui';
import { camera } from '@/scene/camera';
import { controls } from '@/scene/control';
import * as PERSPECTIVE from '@/const';

const datGui = new dat.GUI();
// 视角属性配置，true 代表当前处于该视角下
// 如果设置多个视角，以最后一个视角为主
const perspectiveOption = {
  // 全局视角
  GLOBALHOUSE: true,
  // 显微镜实验台视角
  MICROSCOPETABLE: false,
  // 试剂实验台视角
  REAGENTTABLE: false,
};

function changePerspective(perspective) {
  camera.position.set(...perspective.cameraPosition);
  controls.target.set(...perspective.controlsTarget);
  controls.enableZoom = perspective.enableZoom;
}

function change(key) {
  for (const key in perspectiveOption) {
    perspectiveOption[key] = false;
  }
  perspectiveOption[key] = true;
  changePerspective(PERSPECTIVE[key]);
}

function initDatGui() {
  datGui
    .add(perspectiveOption, 'GLOBALHOUSE')
    .name('全局视角')
    .listen()
    .onChange(() => change('GLOBALHOUSE'));
  datGui
    .add(perspectiveOption, 'MICROSCOPETABLE')
    .name('显微镜实验台视角')
    .listen()
    .onChange(() => change('MICROSCOPETABLE'));
  datGui
    .add(perspectiveOption, 'REAGENTTABLE')
    .name('普通实验台视角')
    .listen()
    .onChange(() => change('REAGENTTABLE'));
}

function hideDatGui() {
  datGui.hide();
}

function showDatGui() {
  datGui.show();
}

export { initDatGui, hideDatGui, showDatGui };
