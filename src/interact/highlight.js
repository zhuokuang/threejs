/**
 * 后期处理，高亮显示模型
 */

import { EffectComposer } from 'three/EffectComposer';
import { RenderPass } from 'three/RenderPass';
import { OutlinePass } from 'three/OutlinePass';
import { ShaderPass } from 'three/ShaderPass';
import { FXAAShader } from 'three/FXAAShader';
import { onPointerMove } from '@/interact';

function addHighlight(renderer, scene, camera) {
  // 效果组合器
  const composer = new EffectComposer(renderer);
  // 渲染通道
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  // 高亮通道
  const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
  outlinePass.edgeStrength = 5;
  outlinePass.edgeGlow = 1;
  outlinePass.edgeThickness = 3;
  outlinePass.pulsePeriod = 5;
  outlinePass.visibleEdgeColor.set('#ff7000');
  outlinePass.hiddenEdgeColor.set('#FFFFFF');

  // 文字提示 DOM
  const textBox = document.getElementById('text');

  composer.addPass(outlinePass);
  // 着色器通道
  const effectFXAA = new ShaderPass(FXAAShader);
  effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
  composer.addPass(effectFXAA);

  renderer.domElement.style.touchAction = 'none';
  renderer.domElement.addEventListener('pointermove', onPointerMove(onPointerMoveCallback));

  return composer.render.bind(composer);

  function onPointerMoveCallback(event, intersects, INTERSECTED) {
    if (intersects.length > 0) {
      const selectedObject = intersects[0].object.parent;
      outlinePass.selectedObjects = selectedObject.children;

      if (INTERSECTED.current !== intersects[0].object.parent) {
        // 存储需要提示的模型
        INTERSECTED.current = intersects[0].object.parent;

        // 展示提示框
        textBox.style.display = 'inline-block';
        textBox.innerHTML = `<span style="color: #ea6040">${INTERSECTED.current.name}</span>: ${
          INTERSECTED.current.userData?.description || '暂无描述'
        }`;
        textBox.style.left = event.x - textBox.clientWidth / 2 + 'px';
        textBox.style.top = event.y - textBox.clientHeight - 5 + 'px';
      }
    } else {
      outlinePass.selectedObjects = [];

      //未选中物体时
      if (INTERSECTED.current) {
        textBox.style.display = 'none';
      }
      INTERSECTED.current = null;
    }
  }
}

export { addHighlight };
