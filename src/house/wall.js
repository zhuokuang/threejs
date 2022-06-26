import { ThreeBSP } from 'three-js-csg-es6';

function createCubeWall({ width, height, depth, angle, material, x, y, z, name }) {
  const cubeGeometry = new THREE.BoxGeometry(width, height, depth);
  const cube = new THREE.Mesh(cubeGeometry, material);
  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;
  cube.rotation.y += angle * Math.PI; // -逆时针 +顺时针
  cube.name = name;
  return cube;
}

// 使用驼峰命名法
function createResultBsp(bsp, cubes) {
  const material = new THREE.MeshPhongMaterial({
    color: 0x9cb2d1,
    specular: 0x9cb2d1,
    shininess: 30,
    transparent: true,
    opacity: 1,
  });

  let BSP = new ThreeBSP(bsp);
  for (let i = 0; i < cubes.length; i++) {
    const less_bsp = new ThreeBSP(cubes[i]);
    BSP = BSP.subtract(less_bsp);
  }
  const result = BSP.toMesh(material);
  result.material.flatshading = THREE.FlatShading;
  result.geometry.computeFaceNormals(); //重新计算几何体侧面法向量
  result.geometry.computeVertexNormals();
  result.material.needsUpdate = true; //更新纹理
  result.geometry.buffersNeedUpdate = true;
  result.geometry.uvsNeedUpdate = true;
  return result;
}

export { createCubeWall, createResultBsp };
