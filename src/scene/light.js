//直光灯
const directionalLight = new THREE.DirectionalLight(0xddffdd, 0.6);
directionalLight.color.setHSL(0.1, 1, 0.95);
directionalLight.position.set(0, 200, 0).normalize();

//环境光
const ambient = new THREE.AmbientLight(0xffffff, 1);
ambient.position.set(0, 0, 0);

/**
 * 光源设置
 */

const light = new THREE.Group();
light.add(directionalLight);
light.add(ambient);

export { light };
