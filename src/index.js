import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import { light2, light3, light4 } from './direct_light.js';
import { mixer, action, gltfLoader2 } from './loader';

export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color( 0xFFFFFF );

scene.add(light2);
scene.add(light2.target);
scene.add(light3);
scene.add(light3.target);
scene.add(light4);
scene.add(light4.target);

let ifPlayed=false;
let actionbutton = document.getElementById("start_button")
actionbutton.addEventListener("click",function(){
  if(ifPlayed===false){
    mixer.setTime(0);
  }
  
  /*if(ifPlayed===true){
    mixer.setTime(a);
  }*/
  mixer.timeScale=1
  
 action.play();
 
},false)
let a;

let stopbutton = document.getElementById("stop_button");
stopbutton.addEventListener("click", function(){
  mixer.timeScale=0
  a=mixer.time;
  ifPlayed=true;
 //action.stop();
}, false)

let resetbutton = document.getElementById("reset_button");
resetbutton.addEventListener("click", function(){
  ifPlayed=false;
  if(ifPlayed===false){
    mixer.setTime(0);
  };
  mixer.timeScale=1;
  mixer.timeScale=0;
}, false)


    
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
    if (mixer.time>5){
      //console.log("time");
      mixer.timeScale=0
     }

};

animate();