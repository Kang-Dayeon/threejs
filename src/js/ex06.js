import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { KeyController } from './keyController.js';

// -----tcontrols
export default function example() {
  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true //계단현상 없애기
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // scene : 무대
  const scene = new THREE.Scene();

  // camera : 카메라
  const camera = new THREE.PerspectiveCamera(
    75, //시야각(field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // fal
  );

  camera.position.set(1, 3, 5);

  // scene(무대)에 카메라를 추가해준는것
  scene.add(camera);

  // light 조명 설정
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);
  
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // controls
  const controls = new PointerLockControls(camera, renderer.domElement);

  controls.domElement.addEventListener('click', ()=>{
    controls.lock();
  });

  const keyController = new KeyController();

  function walk(){
    if(keyController.keys['KeyW'] || keyController.keys['ArrowUp']){
      controls.moveForward(0.02);
    }
    if(keyController.keys['KeyS'] || keyController.keys['ArrowDown']){
      controls.moveForward(-0.02);
    }
    if(keyController.keys['KeyA'] || keyController.keys['ArrowLeft']){
      controls.moveRight(-0.02);
    }
    if(keyController.keys['KeyD'] || keyController.keys['ArrowRight']){
      controls.moveRight(0.02);
    }
  }

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  let mesh;
  let material;
  for(let i = 0; i < 20; i++){
    material = new THREE.MeshStandardMaterial({
      color: `rgb(
          ${50 + Math.floor(Math.random() * 255)},
          ${50 + Math.floor(Math.random() * 255)},
          ${50 + Math.floor(Math.random() * 255)}
        )
      `
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 5
    mesh.position.y = (Math.random() - 0.5) * 5
    mesh.position.z = (Math.random() - 0.5) * 5
    scene.add(mesh);
  }


  camera.lookAt(mesh.position);

  renderer.render(scene, camera);

  // const clock = new THREE.Clock();

  // 애니메이션
  const drew = () => {
    camera.lookAt(mesh.position);
    walk();
    renderer.render(scene, camera);
    renderer.setAnimationLoop(drew);
  }

  // 브라우저 창 사이즈에 따라서 사이즈 조절하는 함수
  const setSize = () => {
    // 카메라 종횡비 설정
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();

    // 랜더러 설정
    renderer.setSize(innerWidth, innerHeight);
    renderer.render(scene, camera);
  }
  // 이벤트
  window.addEventListener('resize', setSize);

  drew();
}