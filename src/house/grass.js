// 为门或窗户添加玻璃
function addGrass({
  scene,
  width,
  height,
  depth = 2,
  angle = 0,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  x,
  y,
  z,
  name,
  imgUrl,
}) {
  const loader = new THREE.TextureLoader();
  loader.load(imgUrl, function (texture) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    geometry.translate(translateX, translateY, translateZ);
    const material = new THREE.MeshBasicMaterial({ map: texture, color: 0xffffff, opacity: 1, transparent: true });
    const grass = new THREE.Mesh(geometry, material);
    grass.position.set(x, y, z);
    grass.rotation.y += angle * Math.PI; // -逆时针旋转，+顺时针
    grass.name = name;
    // 异步的原因，不能使用外部变量将它 return
    // 只能在回调函数中添加
    scene.add(grass);
    // reRender();
  });
}

export { addGrass };
