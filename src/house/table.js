import { FBXLoader } from 'three/FBXLoader';
import { addInteractObj } from '@/interact';
import microscopeTableUrl from '@/obj/实验台-显微镜.fbx';
import reagentTableUrl from '@/obj/实验台-试剂实验.fbx';

function addTable({
  tableUrl,
  x = 0,
  y = 0,
  z = 0,
  scale = 1,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  callback = () => {},
}) {
  const loader = new FBXLoader();
  loader.load(tableUrl, function (obj) {
    // 平移
    obj.translateX(x);
    obj.translateY(y);
    obj.translateZ(z);
    // 旋转
    obj.rotateX(rotateX);
    obj.rotateY(rotateY);
    obj.rotateZ(rotateZ);
    // 缩放
    obj.scale.set(scale, scale, scale);
    // 回调函数，外部可修正 obj 属性。
    callback(obj);
  });
}

// 因显微镜实验台模型某些属性使用 Maya 不好改，所以直接使用 Three.js 进行修改
function completeMicroscopeTable({ scene }) {
  const callback = (obj) => {
    obj.name = '显微镜实验台';
    const reagentBottle = obj.getChildByName('药瓶01');
    reagentBottle.name = '药瓶';
    reagentBottle.userData.description = '玻璃材质，用于装载各种药剂，实验完成之后记得处理好废弃药剂，盖好瓶盖';
    const microscope = obj.getChildByName('显微镜01');
    microscope.name = '显微镜';
    microscope.userData.description = '点击显微镜查看各种分子结构';
    const stool1 = obj.getChildByName('实验凳002');
    stool1.name = '实验凳';
    stool1.userData.description = '实验完成记得将凳子放回桌子底下';
    const stool2 = obj.getChildByName('实验凳01');
    stool2.name = '实验凳';
    stool2.userData.description = '实验完成记得将凳子放回桌子底下';
    const table = obj.getChildByName('实验桌01');
    table.name = '实验桌';
    table.userData.description = '显微镜实验桌，用于摆放显微镜和药剂瓶，观察完药品的分子结构之后，要记得清理实验桌';

    scene.add(obj);
    addInteractObj(obj);
  };

  // 添加显微镜实验桌
  addTable({
    scene,
    tableUrl: microscopeTableUrl,
    x: 50,
    y: 40,
    z: 0,
    scale: 4,
    rotateX: -Math.PI / 2,
    callback,
  });
  addTable({
    scene,
    tableUrl: microscopeTableUrl,
    x: 50,
    y: 40,
    z: 400,
    scale: 4,
    rotateX: -Math.PI / 2,
    callback,
  });
  addTable({
    scene,
    tableUrl: microscopeTableUrl,
    x: 50,
    y: 40,
    z: -400,
    scale: 4,
    rotateX: -Math.PI / 2,
    callback,
  });
  // 常用显微镜实验台
  addTable({
    scene,
    tableUrl: microscopeTableUrl,
    x: 550,
    y: 40,
    z: 0,
    scale: 4,
    rotateX: -Math.PI / 2,
    callback,
  });
  addTable({
    scene,
    tableUrl: microscopeTableUrl,
    x: 550,
    y: 40,
    z: 400,
    scale: 4,
    rotateX: -Math.PI / 2,
    callback,
  });
  addTable({
    scene,
    tableUrl: microscopeTableUrl,
    x: 550,
    y: 40,
    z: -400,
    scale: 4,
    rotateX: -Math.PI / 2,
    callback,
  });
}

// 因普通实验台模型某些属性使用 Maya 不好改，所以直接使用 Three.js 进行修改
function completeReagentTable({ scene }) {
  const callback = (obj) => {
    obj.name = '普通实验台';
    const desk = obj.getChildByName('组063');
    desk.name = '实验桌';
    desk.userData.description = '包括桌子和支架，用于放置实验物品，是一个进行实验的平台';
    const testTube = obj.getChildByName('组001');
    testTube.name = '试管';
    testTube.userData.description =
      '试管可以作为少量物质反应的容器，当多种微量化学或生物样品需要操作或贮藏时，试管通常比烧杯更好用';
    const beaker1 = obj.getChildByName('Group-404679-915');
    beaker1.name = '烧杯';
    beaker1.userData.description =
      '主要用途如下：1、物质的反应器、确定燃烧产物。2、溶解、结晶某物质。3、盛取、蒸发浓缩或加热溶液';
    const beaker2 = obj.getChildByName('Group-404679-426');
    beaker2.name = '烧杯';
    beaker2.userData.description =
      '主要用途如下：1、物质的反应器、确定燃烧产物。2、溶解、结晶某物质。3、盛取、蒸发浓缩或加热溶液';
    const separatingFunnel = obj.getChildByName('Group-404679-745');
    separatingFunnel.name = '分液漏斗';
    separatingFunnel.userData.description =
      '主要用途如下： 1、固液或液体与液体反应发生装置：控制所加液体的量及反应速率的大小。2、物质分离提纯：对萃取后形成的互不相溶的两液体进行分液。';
    const cabinet1 = obj.getChildByName('组030');
    cabinet1.name = '柜子';
    cabinet1.userData.description = '装载物品';
    const cabinet2 = obj.getChildByName('组028');
    cabinet2.name = '柜子';
    cabinet2.userData.description = '装载物品';
    const cabinet3 = obj.getChildByName('组027');
    cabinet3.name = '柜子';
    cabinet3.userData.description = '装载物品';
    const cabinet4 = obj.getChildByName('组029');
    cabinet4.name = '柜子';
    cabinet4.userData.description = '装载物品';
    const cabinet5 = obj.getChildByName('组022');
    cabinet5.name = '柜子';
    cabinet5.userData.description = '装载物品';
    const cabinet6 = obj.getChildByName('组023');
    cabinet6.name = '柜子';
    cabinet6.userData.description = '装载物品';
    const cabinet7 = obj.getChildByName('组024');
    cabinet7.name = '柜子';
    cabinet7.userData.description = '装载物品';
    const cabinet8 = obj.getChildByName('组026');
    cabinet8.name = '柜子';
    cabinet8.userData.description = '装载物品';
    const tableStand = obj.getChildByName('组033');
    tableStand.name = '实验桌支架';
    tableStand.userData.description = '固定实验桌';
    const reagentBottle1 = obj.getChildByName('Group-404679-913');
    reagentBottle1.name = '药剂瓶';
    reagentBottle1.userData.description = '装载各种药剂';
    const reagentBottle2 = obj.getChildByName('Group-404679-576');
    reagentBottle2.name = '药剂瓶';
    reagentBottle2.userData.description = '装载各种药剂';
    const reagentBottle3 = obj.getChildByName('Group-404679-352');
    reagentBottle3.name = '药剂瓶';
    reagentBottle3.userData.description = '装载各种药剂';
    const ErlenmeyerFlask = obj.getChildByName('Group-404679-729');
    ErlenmeyerFlask.name = '锥形瓶';
    ErlenmeyerFlask.userData.description =
      '锥形瓶一般使用于滴定实验中，盛装反应物，定量分析，回流加热，其外形使它适合这些工作。锥瓶亦可用于普通实验，制取气体或作为反应容器。其锥形结构相对稳定，不易倾倒。';

    scene.add(obj);
    addInteractObj(obj);
  };

  // 添加试剂实验桌
  addTable({
    scene,
    tableUrl: reagentTableUrl,
    x: 1500,
    y: 0,
    z: -900,
    scale: 3,
    rotateX: -Math.PI / 2,
    callback,
  });
  addTable({
    scene,
    tableUrl: reagentTableUrl,
    x: 1500,
    y: 0,
    z: -300,
    scale: 3,
    rotateX: -Math.PI / 2,
    callback,
  });
  // 常用试剂实验台
  addTable({
    scene,
    tableUrl: reagentTableUrl,
    x: 1000,
    y: 0,
    z: -900,
    scale: 3,
    rotateX: -Math.PI / 2,
    callback,
  });
  addTable({
    scene,
    tableUrl: reagentTableUrl,
    x: 1000,
    y: 0,
    z: -300,
    scale: 3,
    rotateX: -Math.PI / 2,
    callback,
  });
}

export { completeMicroscopeTable, completeReagentTable };
