import { TrackballControls } from 'three/TrackballControls';
import { PDBLoader } from 'three/PDBLoader';
import { CSS2DRenderer, CSS2DObject } from 'three/CSS2DRenderer';
import { changeScene } from '@/context';

let camera, scene, renderer, labelRenderer;
let controls;

let root;

const MOLECULES = {
  Ethanol: 'ethanol.pdb',
  Aspirin: 'aspirin.pdb',
  Caffeine: 'caffeine.pdb',
  Nicotine: 'nicotine.pdb',
  LSD: 'lsd.pdb',
  Cocaine: 'cocaine.pdb',
  Cholesterol: 'cholesterol.pdb',
  Lycopene: 'lycopene.pdb',
  Glucose: 'glucose.pdb',
  'Aluminium oxide': 'Al2O3.pdb',
  Cubane: 'cubane.pdb',
  Copper: 'cu.pdb',
  Fluorite: 'caf2.pdb',
  Salt: 'nacl.pdb',
  'YBCO superconductor': 'ybco.pdb',
  Buckyball: 'buckyball.pdb',
  Graphite: 'graphite.pdb',
};

const mapMoleculesNameToChinese = {
  Ethanol: '乙醇',
  Aspirin: '阿司匹林',
  Caffeine: '咖啡因',
  Nicotine: '尼古丁',
  LSD: '迷幻剂',
  Cocaine: '可卡因',
  Cholesterol: '胆固醇',
  Lycopene: '番茄红素',
  Glucose: '葡萄糖',
  'Aluminium oxide': '氧化铝',
  Cubane: '立方烷',
  Copper: '铜',
  Fluorite: '萤石',
  Salt: '氯化钠',
  'YBCO superconductor': 'YBCO超导体',
  Buckyball: '富勒烯',
  Graphite: '石墨',
};

const loader = new PDBLoader();
const offset = new THREE.Vector3();

const menu = document.getElementById('menu');

init();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050505);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.z = 1000;
  scene.add(camera);

  const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
  light1.position.set(1, 1, 1);
  scene.add(light1);

  const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
  light2.position.set(-1, -1, 1);
  scene.add(light2);

  root = new THREE.Group();
  scene.add(root);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('molecules').appendChild(renderer.domElement);

  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.pointerEvents = 'none';
  document.getElementById('molecules').appendChild(labelRenderer.domElement);

  controls = new TrackballControls(camera, renderer.domElement);
  controls.minDistance = 500;
  controls.maxDistance = 2000;

  import('@/pdb/caffeine.pdb').then((res) => {
    loadMolecule(res.default);
    createMenu();

    window.addEventListener('resize', onWindowResize);
  });
}

function generateButtonCallback(url) {
  return function () {
    loadMolecule(url);
  };
}

function createMenu() {
  for (const m in MOLECULES) {
    const button = document.createElement('button');
    button.innerHTML = mapMoleculesNameToChinese[m];
    menu.appendChild(button);

    import('@/pdb/' + MOLECULES[m]).then((res) => {
      button.addEventListener('click', generateButtonCallback(res.default));
    });
  }

  const button = document.createElement('button');
  button.innerHTML = '返回实验室';
  menu.appendChild(button);
  button.addEventListener('click', changeScene);
}

function loadMolecule(url) {
  while (root.children.length > 0) {
    const object = root.children[0];
    object.parent.remove(object);
  }

  loader.load(url, function (pdb) {
    const geometryAtoms = pdb.geometryAtoms;
    const geometryBonds = pdb.geometryBonds;
    const json = pdb.json;

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const sphereGeometry = new THREE.IcosahedronGeometry(1, 3);

    geometryAtoms.computeBoundingBox();
    geometryAtoms.boundingBox.getCenter(offset).negate();

    geometryAtoms.translate(offset.x, offset.y, offset.z);
    geometryBonds.translate(offset.x, offset.y, offset.z);

    let positions = geometryAtoms.getAttribute('position');
    const colors = geometryAtoms.getAttribute('color');

    const position = new THREE.Vector3();
    const color = new THREE.Color();

    for (let i = 0; i < positions.count; i++) {
      position.x = positions.getX(i);
      position.y = positions.getY(i);
      position.z = positions.getZ(i);

      color.r = colors.getX(i);
      color.g = colors.getY(i);
      color.b = colors.getZ(i);

      const material = new THREE.MeshPhongMaterial({ color: color });

      const object = new THREE.Mesh(sphereGeometry, material);
      object.position.copy(position);
      object.position.multiplyScalar(75);
      object.scale.multiplyScalar(25);
      root.add(object);

      const atom = json.atoms[i];

      const text = document.createElement('div');
      text.className = 'label';
      text.style.color = 'rgb(' + atom[3][0] + ',' + atom[3][1] + ',' + atom[3][2] + ')';
      text.textContent = atom[4];

      const label = new CSS2DObject(text);
      label.position.copy(object.position);
      root.add(label);
    }

    positions = geometryBonds.getAttribute('position');

    const start = new THREE.Vector3();
    const end = new THREE.Vector3();

    for (let i = 0; i < positions.count; i += 2) {
      start.x = positions.getX(i);
      start.y = positions.getY(i);
      start.z = positions.getZ(i);

      end.x = positions.getX(i + 1);
      end.y = positions.getY(i + 1);
      end.z = positions.getZ(i + 1);

      start.multiplyScalar(75);
      end.multiplyScalar(75);

      const object = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial(0xffffff));
      object.position.copy(start);
      object.position.lerp(end, 0.5);
      object.scale.set(5, 5, start.distanceTo(end));
      object.lookAt(end);
      root.add(object);
    }

    render();
  });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function render() {
  document.getElementById('text').style.display = 'none';
  document.getElementById('lab-room').style.display = 'none';
  document.getElementById('molecules').style.display = 'block';
  document.getElementById('menu').style.display = 'block';

  controls.update();

  const time = Date.now() * 0.0004;

  root.rotation.x = time;
  root.rotation.y = time * 0.7;

  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

export { render };
