import * as THREE from 'three';

// 안개 만들기
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

  camera.position.x = 1;
  camera.position.y = 3;
  camera.position.z = 5;

  // scene(무대)에 카메라를 추가해준는것
  scene.add(camera);

  // light 조명 설정
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 1;
  light.position.z = 2;
  scene.add(light);

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper)

  // GridHelper
  const gridHelper = new THREE.GridHelper(5);
  scene.add(gridHelper);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshStandardMaterial({
    color: '#ff0000'
  });

  const mesh = new THREE.Mesh(geometry, meterial);
  mesh.position.x = 2;
  scene.add(mesh);

  camera.lookAt(mesh.position);

  renderer.render(scene, camera);

  const clock = new THREE.Clock();

  // 애니메이션
  const drew = () => {
    const time = clock.getDelta();
    mesh.rotation.y += 1 * time;
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