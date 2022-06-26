/**
 * 场景
 */

import { house } from '@/house';
import { light } from './light';
import { axesHelper } from './aiesHelper';

const scene = new THREE.Scene();
scene.add(house);
scene.add(light);
scene.add(axesHelper);

export { scene };
