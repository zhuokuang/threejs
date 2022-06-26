import { camera } from '@/scene/camera';
import { controls } from '../scene/control';

const InteractObjs = [];
const INTERSECTED = { current: null };

function addInteractObj(obj) {
  InteractObjs.push(...obj.children);
}

function onPointerMove(callback) {
  return function (event) {
    event.preventDefault();
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    // 必须先改变 pointer 的坐标，才能调用 raycaster 的 setFromCamera 方法
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    controls.update();
    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(InteractObjs, true);
    callback?.(event, intersects, INTERSECTED);
  };
}

export { addInteractObj, onPointerMove };
