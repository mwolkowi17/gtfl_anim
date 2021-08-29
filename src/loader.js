import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

export let mixer= new THREE.AnimationMixer();
export let action;
export const gltfLoader2 = new GLTFLoader()
    gltfLoader2.load('./zawor_kulowy_three2.glb', (gltf) => {
      const root = gltf.scene;
      const anim = gltf.animations;
      scene.add(root); //co zrobic z tym?
      mixer = new THREE.AnimationMixer(root);
      
      action = mixer.clipAction( anim[ 0 ])
     
      //action.play();

     
    })