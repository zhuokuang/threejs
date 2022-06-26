/**
 * 鼠标拖动
 */

import { OrbitControls } from 'three/OrbitControls';
import { camera } from './camera';
import { rendererDomElement } from './roomRender';
// import { GLOBALHOUSE } from '@/const';

function initControls() {
  controls.enableDamping = true;
  controls.dampingFactor = 0.5;
  // 视角最小距离
  controls.minDistance = 100;
  // 视角最远距离
  controls.maxDistance = 5000;
  // 最大角度
  controls.maxPolarAngle = Math.PI / 2.1;

  // const { controlsTarget, cameraPosition } = GLOBALHOUSE;
  // 控制器焦点
  // controls.target.set(...controlsTarget);
  // 相机位置
  // camera.position.set(...cameraPosition);
  // render();
}

const controls = new OrbitControls(camera, rendererDomElement);

initControls();

export { controls };
