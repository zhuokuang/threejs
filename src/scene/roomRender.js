import { scene } from './scene';
import { camera } from './camera';
import { controls } from './control';
import { changeScene } from '@/context';
import { onPointerMove, addHighlight } from '@/interact';

/**
 * 渲染器
 */
// 实验室渲染器
const roomRenderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });

// 初始化实验室渲染器
function initRoomRenderer() {
  roomRenderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染区域尺寸
  roomRenderer.setClearColor(0x4682b4, 1); // 设置背景颜色
  roomRenderer.shadowMap.enabled = true;
  roomRenderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap

  document.getElementById('lab-room').appendChild(roomRenderer.domElement); // body元素中插入canvas对象
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  roomRenderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
  // 渲染实验室场景时，隐藏分子场景
  document.getElementById('molecules').style.display = 'none';
  document.getElementById('menu').style.display = 'none';
  document.getElementById('lab-room').style.display = 'block';

  controls.update();
  roomRenderer.render(scene, camera);

  // 渲染高亮
  composerRender();
}

const textBox = document.getElementById('text');
function onPointerClkCallback(_event, intersects, INTERSECTED) {
  if (intersects.length > 0) {
    if (intersects[0].object.parent.name === '显微镜') {
      changeScene();
    }
  } else {
    //未选中物体时
    if (INTERSECTED.current) {
      textBox.style.display = 'none';
    }
    INTERSECTED.current = null;
  }
}

initRoomRenderer();
// 监听浏览器窗口大小变化
window.addEventListener('resize', onWindowResize);
// 监听模型点击事件
roomRenderer.domElement.addEventListener('click', onPointerMove(onPointerClkCallback));

/**
 * 后期处理，高亮显示模型
 */
const composerRender = addHighlight(roomRenderer, scene, camera);

const rendererDomElement = roomRenderer.domElement;
export { rendererDomElement, render };
