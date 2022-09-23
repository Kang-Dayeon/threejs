import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function example() {
  // 텍스쳐 로드
  const textureLoder = new THREE.TextureLoader();
  const baseColorTex = textureLoder.load('./../textures/brick/Brick_Wall_016_basecolor.jpg');
  const ambienTex = textureLoder.load('./../textures/brick/Brick_Wall_016_ambientOcclusion.jpg');
  const normalTex = textureLoder.load('./../textures/brick/Brick_Wall_016_normal.jpg');
  const roughnessTex = textureLoder.load('./../textures/brick/Brick_Wall_016_roughness.jpg');
  const heightTex = textureLoder.load('./../textures/brick/Brick_Wall_016_height.png');

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
  light.position.z = 2;
  scene.add(light);

  // controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // mesh만들기
  const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
  const material = new THREE.MeshStandardMaterial({
    map: baseColorTex,
    roughness: 0.1,
    normalMap: normalTex,
    roughnessMap: roughnessTex,
    aoMap: ambienTex
  });
  const mesh = new THREE.Mesh(geometry, material);
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