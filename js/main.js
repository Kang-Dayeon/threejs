import * as THREE from "./three.module.js";

// 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// 미리 만들어놓은 캔버스에 랜더하기
// render : 화면에서 보여지는 장면
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true //계단현상 없애기
});
renderer.setSize(window.innerWidth, window.innerHeight);

// scene : 무대
const scene = new THREE.Scene();

// camera : 카메라
// perspective camera : 사람눈으로 보는 것과 같이 요소의 원근감이 있음 (제일 많이 사용)
const camera = new THREE.PerspectiveCamera(
    75, //시야각(field of view)
    window.innerWidth / window.innerHeight, // 종횡비(aspect)
    0.1, // near
    1000 // fal
);
// x = 가로위치, y = 세로위치, z = 앞뒤위치
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;

// orthographic camera : 게임에서 많이 사용됨(롤이나 디아블로등..) 거리와 상관없이 요소크기 똑같음
// const camera = new THREE.OrthographicCamera(
//     -(window.innerWidth / window.innerHeight), // left
//     window.innerWidth / window.innerHeight, // right
//     1, // top
//     -1, // bottom
//     0.1,
//     1000
// );
// camera.position.x = 1;
// camera.position.y = 2;
// camera.position.z = 5;
// camera.lookAt(0,0,0);
// camera.zoom = 0.5;
// camera.updateProjectionMatrix();

// scene(무대)에 카메라를 추가해준는것
scene.add(camera);

// mesh만들기
// Mesh : 보여지는 오브젝트 (geometry(모양) + meterial(재질))
const geometry = new THREE.BoxGeometry(1,1,1);
const meterial = new THREE.MeshBasicMaterial({
    color: '#ff0000'
});
// geometry와 meterial을 합쳐서 요소를 변수에 넣음
const mesh = new THREE.Mesh(geometry, meterial);
scene.add(mesh);

// 그리기 : 만들어 놓은 scene과 camera를 랜더링 해주는 문법
renderer.render(scene, camera);