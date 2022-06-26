/**
 * 地板
 */

//创建地板
function addFloor({ scene, width, height, depth = 1, imgUrl, name = '地面' }) {
  const loader = new THREE.TextureLoader();
  loader.load(imgUrl, function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10);
    const floorGeometry = new THREE.BoxGeometry(width, height, depth);
    const floorMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    floor.name = name;
    scene.add(floor);
    // reRender();
  });
}

export { addFloor };
