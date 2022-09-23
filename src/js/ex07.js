import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function example() {
  // 텍스쳐 로드
  const textureLoder = new THREE.TextureLoader();
  const rightTexture = textureLoder.load('./../textures/mcstyle/right.png');
  const leftTexture = textureLoder.load('./../textures/mcstyle/left.png');
  const topTexture = textureLoder.load('./../textures/mcstyle/top.png');
  const bottomTexture = textureLoder.load('./../textures/mcstyle/bottom.png');
  const backTexture = textureLoder.load('./../textures/mcstyle/back.png');
  const frontTexture = textureLoder.load('./../textures/mcstyle/front.png');

  const materials = [
    new THREE.MeshBasicMaterial({ map: rightTexture }),
    new THREE.MeshBasicMaterial({ map: leftTexture }),
    new THREE.MeshBasicMaterial({ map: topTexture }),
    new THREE.MeshBasicMaterial({ map: bottomTexture }),
    new THREE.MeshBasicMaterial({ map: backTexture }),
    new THREE.MeshBasicMaterial({ map: frontTexture }),
  ];

  rightTexture.magFilter = THREE.NearestFilter;
  leftTexture.magFilter = THREE.NearestFilter;
  topTexture.magFilter = THREE.NearestFilter;
  bottomTexture.magFilter = THREE.NearestFilter;
  backTexture.magFilter = THREE.NearestFilter;
  frontTexture.magFilter = THREE.NearestFilter;

  const canvas = document.getElementById('three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true //계단현상 없애기
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // scene : 무대
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('white')


  const camera = new THREE.PerspectiveCamera(
    75, //시야각(field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // fal
  );

  camera.position.z = 5;

  // scene(무대)에 카메라를 추가해준는것
  scene.add(camera);

  // light 조명 설정
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 2;
  light.position.y = 1;
  light.position.z = 3;
  scene.add(light);

  // controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // mesh만들기
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshBasicMaterial({
  //   // color: '#ff0000',
  //   map: topTexture
  // });
  const mesh = new THREE.Mesh(geometry, materials);
  scene.add(mesh);

  renderer.render(scene, camera);

  const clock = new THREE.Clock();

  // 애니메이션
  const drew = () => {

    const time = clock.getDelta();

    renderer.render(scene, camera);
    renderer.setAnimationLoop(drew);
  }

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