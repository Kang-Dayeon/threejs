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
  // 안개만들기
  scene.fog = new THREE.Fog('black', 3, 7);

  // camera : 카메라
  const camera = new THREE.PerspectiveCamera(
    75, //시야각(field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // fal
  );

  camera.position.y = 1;
  camera.position.z = 8;

  // scene(무대)에 카메라를 추가해준는것
  scene.add(camera);

  // light 조명 설정
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.x = 2;
  light.position.y = 4;
  light.position.z = 10;
  scene.add(light);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshStandardMaterial({
    color: '#ff0000'
  });

  // mesh 여러개 만들기
  const meshes = [];
  let mesh;
  for (let i = 0; i < 10; i++) {
    mesh = new THREE.Mesh(geometry, meterial);
    mesh.position.x = Math.random() * 8 - 4;
    mesh.position.z = Math.random() * 8 - 4;
    scene.add(mesh);
    meshes.push(mesh)
  }

  renderer.render(scene, camera);

  const clock = new THREE.Clock();

  // 애니메이션
  const drew = () => {
    const time = clock.getDelta();
    meshes.forEach(item => {
      item.rotation.y += 2 * time;
    })
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