import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// -----그룹
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
  const controls = new OrbitControls(camera, renderer.domElement);

  // Mesh
  const geometry = new THREE.SphereGeometry(1, 64, 64);
  const meterial = new THREE.MeshStandardMaterial({
    color: 'orangered',
    side: THREE.DoubleSide,
    flatShading: true
  });

  const group1 = new THREE.Group();
  const box1 = new THREE.Mesh(geometry, meterial);

  const group2 = new THREE.Group();
  const box2 = box1.clone();
  box2.scale.set(0.3, 0.3, 0.3);
  group2.position.x = 3;

  const group3 = new THREE.Group();
  const box3 = box1.clone();
  box3.scale.set(0.15, 0.15, 0.15);
  group3.position.x = 0.8;

  group3.add(box3);
  group2.add(box2, group3);
  group1.add(box1, group2);

  scene.add(group1);


  camera.lookAt(group1.position);

  renderer.render(scene, camera);

  const clock = new THREE.Clock();

  // 애니메이션
  const drew = () => {
    const time = clock.getDelta();
    // 카메라가 계속 요소 바라보게
    camera.lookAt(group1.position);
    // mesh.rotation.x = THREE.MathUtils.degToRad(90);

    group1.rotation.y += 0.5 * time;
    group2.rotation.y += 0.5 * time;
    group3.rotation.y += 0.5 * time;
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