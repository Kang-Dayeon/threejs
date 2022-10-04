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
  const geometry = new THREE.SphereGeometry(3, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: 'orangered',
    side: THREE.DoubleSide,
    flatShading: true
  });
  const wireMaterial = new THREE.MeshStandardMaterial({
    wireframe: true
  })
  const phongMaterial = new THREE.MeshPhongMaterial({
    color: 'blue'
  })
  const phongMaterialGreen = new THREE.MeshPhongMaterial({
    color: '#55E617',
    shininess: 1000
  })

  const torusGeometery = new THREE.TorusGeometry(0.57, 0.25, 20, 30);

  const torusMesh = new THREE.Mesh(torusGeometery, phongMaterialGreen);

  const group1 = new THREE.Group();
  const group2 = new THREE.Group();
  const box1 = new THREE.Mesh(geometry, wireMaterial);
  const box2 = new THREE.Mesh(geometry, material);
  const box3 = new THREE.Mesh(geometry, phongMaterial);
  box2.scale.set(0.09, 0.09, 0.09);
  box2.position.x = 2;
  box3.scale.set(0.1, 0.1, 0.1);

  torusMesh.position.x = 2;

  group1.add(box1, box2);
  group2.add(box3, torusMesh);

  scene.add(group1, group2);




  camera.lookAt(group1.position);

  renderer.render(scene, camera);

  const clock = new THREE.Clock();

  // 애니메이션
  const drew = () => {
    const time = clock.getDelta();
    // 카메라가 계속 요소 바라보게
    camera.lookAt(group1.position);
    // mesh.rotation.x = THREE.MathUtils.degToRad(90);

    group1.rotation.y += 0.3 * time;
    group2.rotation.y -= 0.6 * time;


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