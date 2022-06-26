import { addFloor } from './floor';
import { createCubeWall, createResultBsp } from './wall';
import { addGrass } from './grass';
import { completeMicroscopeTable, completeReagentTable } from './table';
import floorImg from '@/images/floor.jpg';
import doorLeftImg from '@/images/door_left.png';
import doorRightImg from '@/images/door_right.png';
import windowImg from '@/images/window.png';

/**
 * 实验室室内场景
 */

const house = new THREE.Group();

// 添加地板，房间 长：2600，宽：1400，高：100
addFloor({ scene: house, width: 3600, height: 2400, imgUrl: floorImg });

// 左侧的墙
const wall1 = createCubeWall({
  width: 10,
  height: 200,
  depth: 1400,
  angle: 0,
  material: new THREE.MeshPhongMaterial({ color: 0xafc0ca }),
  x: -1295,
  y: 100,
  z: 0,
  name: '左侧的墙',
});
// 右侧的墙
const wall2 = createCubeWall({
  width: 10,
  height: 200,
  depth: 1400,
  angle: 1,
  material: new THREE.MeshPhongMaterial({ color: 0xafc0ca }),
  x: 1295,
  y: 100,
  z: 0,
  name: '右侧的墙',
});
// 后面的墙
const wall3 = createCubeWall({
  width: 10,
  height: 200,
  depth: 2600,
  angle: 1.5,
  material: new THREE.MeshPhongMaterial({ color: 0xafc0ca }),
  x: 0,
  y: 100,
  z: -700,
  name: '后面的墙',
});
// 正面的墙，需要被挖去门窗
const wall4 = createCubeWall({
  width: 2600,
  height: 200,
  depth: 10,
  angle: 0,
  material: new THREE.MeshPhongMaterial({ color: 0x9fb2ce }),
  x: 0,
  y: 100,
  z: 700,
  name: '正面的墙',
});
// 中间的墙
const wall5 = createCubeWall({
  width: 10,
  height: 200,
  depth: 1400,
  angle: 0,
  material: new THREE.MeshPhongMaterial({ color: 0xafc0ca }),
  x: 0,
  y: 100,
  z: 0,
  name: '中间的墙',
});

// 门和窗户
const door1 = createCubeWall({
  width: 200,
  height: 180,
  depth: 10,
  angle: 0,
  material: new THREE.MeshPhongMaterial({ color: 0xd6e4ec }),
  x: -600,
  y: 90,
  z: 700,
  name: '左门',
});
const door2 = createCubeWall({
  width: 200,
  height: 180,
  depth: 10,
  angle: 0,
  material: new THREE.MeshPhongMaterial({ color: 0xd6e4ec }),
  x: 600,
  y: 90,
  z: 700,
  name: '右门',
});
const window1 = createCubeWall({
  width: 100,
  height: 100,
  depth: 10,
  angle: 0,
  material: new THREE.MeshPhongMaterial({ color: 0xd6e4ec }),
  x: -900,
  y: 90,
  z: 700,
  name: '窗户1',
});
const window2 = createCubeWall({
  width: 100,
  height: 100,
  depth: 10,
  angle: 0,
  material: new THREE.MeshPhongMaterial({ color: 0xd6e4ec }),
  x: 900,
  y: 90,
  z: 700,
  name: '窗户2',
});
const window3 = createCubeWall({
  width: 100,
  height: 100,
  depth: 10,
  angle: 0,
  material: new THREE.MeshPhongMaterial({ color: 0xd6e4ec }),
  x: -200,
  y: 90,
  z: 700,
  name: '窗户3',
});
const window4 = createCubeWall({
  width: 100,
  height: 100,
  depth: 10,
  angle: 0,
  material: new THREE.MeshPhongMaterial({ color: 0xd6e4ec }),
  x: 200,
  y: 90,
  z: 700,
  name: '窗户4',
});

// 挖去门和窗户
const wallWithHole = createResultBsp(wall4, [door1, door2, window1, window2, window3, window4]);

// 安装门玻璃
addGrass({
  scene: house,
  width: 100,
  height: 180,
  translateX: -50,
  x: -500,
  y: 90,
  z: 700,
  name: '左门',
  imgUrl: doorRightImg,
});
addGrass({
  scene: house,
  width: 100,
  height: 180,
  translateX: 50,
  x: -700,
  y: 90,
  z: 700,
  name: '左门',
  imgUrl: doorLeftImg,
});
addGrass({
  scene: house,
  width: 100,
  height: 180,
  translateX: 50,
  x: 500,
  y: 90,
  z: 700,
  name: '右门',
  imgUrl: doorLeftImg,
});
addGrass({
  scene: house,
  width: 100,
  height: 180,
  translateX: -50,
  x: 700,
  y: 90,
  z: 700,
  name: '右门',
  imgUrl: doorRightImg,
});
// 安装窗户玻璃
addGrass({
  scene: house,
  width: 100,
  height: 100,
  translateX: 0,
  x: -900,
  y: 90,
  z: 700,
  name: '窗户',
  imgUrl: windowImg,
});
addGrass({
  scene: house,
  width: 100,
  height: 100,
  translateX: 0,
  x: 900,
  y: 90,
  z: 700,
  name: '窗户',
  imgUrl: windowImg,
});
addGrass({
  scene: house,
  width: 100,
  height: 100,
  translateX: 0,
  x: -200,
  y: 90,
  z: 700,
  name: '窗户',
  imgUrl: windowImg,
});
addGrass({
  scene: house,
  width: 100,
  height: 100,
  translateX: 0,
  x: 200,
  y: 90,
  z: 700,
  name: '窗户',
  imgUrl: windowImg,
});

// // 添加四面墙
house.add(wall1);
house.add(wall2);
house.add(wall3);
house.add(wallWithHole);
house.add(wall5);

completeMicroscopeTable({ scene: house });
completeReagentTable({ scene: house });

export { house };
