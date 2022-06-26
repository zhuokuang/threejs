/**
 * 相机
 */

const width = window.innerWidth; //窗口宽度
const height = window.innerHeight; //窗口高度

//创建相机对象
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
camera.position.set(0, 800, 1800);
camera.lookAt(0, 0, 0);

export { camera };
