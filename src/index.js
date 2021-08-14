import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import { light2, light3, light4 } from './direct_light.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color( 0xE8E8E8 );

scene.add(light2);
scene.add(light2.target);
scene.add(light3);
scene.add(light3.target);
scene.add(light4);
scene.add(light4.target);

let mixer= new THREE.AnimationMixer();
let action;
const gltfLoader2 = new GLTFLoader()
    gltfLoader2.load('./zawor_kulowy_three2.glb', (gltf) => {
      const root = gltf.scene;
      const anim = gltf.animations;
      scene.add(root);
      mixer = new THREE.AnimationMixer(root);

      action = mixer.clipAction( anim[ 0 ] )
      //action.play();

     
    })

let actionbutton = document.getElementById("start_button")
actionbutton.addEventListener("click",function(){
 action.play();
},false)

let stopbutton = document.getElementById("stop_button")
stopbutton.addEventListener("click", function(){
 action.stop();
}, false)

const gltfLoader3 = new GLTFLoader()
    gltfLoader3.load('./zawor_kulowy_three2.glb', (gltf) => {
      const root = gltf.scene;
      //scene.add(root);
    })  

    
camera.position.z = 8;
camera.position.y = 1.5;

const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
//camera.position.set( 0, 20, 100 );
controls.update();
controls.autoRotate=false;
const clock= new THREE.Clock();

const animate = function () {
    requestAnimationFrame(animate);

    //cube.rotation.x += 0.02;
    //cube.rotation.y += 0.01;
   
    var delta = clock.getDelta(); // clock is an instance of THREE.Clock

    renderer.render(scene, camera);
    
  
    controls.update();
    if (mixer ) mixer.update( delta );

};

animate();