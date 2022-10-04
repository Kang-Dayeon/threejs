import * as THREE from 'three';


export default function example() {

  let SCREEN_WIDTH = window.innerWidth;
  let SCREEN_HEIGHT = window.innerHeight;
  let aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

  let container, stats;
  let scene, renderer, mesh;
  let cameraRig, activeCamera;
  let cameraPerspective;
  let cameraPerspectiveHelper;

  init();
  animate();

  function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    cameraPerspective = new THREE.PerspectiveCamera(50, aspect, 150, 1000);

    activeCamera = cameraPerspective;


    cameraPerspective.rotation.y = Math.PI;

    cameraRig = new THREE.Group();

    cameraRig.add(cameraPerspective);

    scene.add(cameraRig);

    //mesh
    mesh = new THREE.Mesh(
      new THREE.SphereGeometry(100, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
    );
    scene.add(mesh);

    const mesh2 = new THREE.Mesh(
      new THREE.SphereGeometry(50, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    );
    mesh2.position.y = 150;
    mesh.add(mesh2);

    const mesh3 = new THREE.Mesh(
      new THREE.SphereGeometry(5, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true })
    );
    mesh3.position.z = 150;
    cameraRig.add(mesh3);

    //파티클
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = 0; i < 10000; i++) {

      vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
      vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
      vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z

    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x888888 }));
    scene.add(particles);

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container.appendChild(renderer.domElement);

    renderer.autoClear = false;

    window.addEventListener('resize', onWindowResize);
    // document.addEventListener('keydown', onKeyDown);

  }

  // 윈도우 창 조절시
  function onWindowResize() {

    SCREEN_WIDTH = window.innerWidth;
    SCREEN_HEIGHT = window.innerHeight;
    aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    cameraPerspective.aspect = aspect;
    cameraPerspective.updateProjectionMatrix();

  }
  //
  function animate() {

    requestAnimationFrame(animate);

    render();

  }

  function render() {

    // console.log(Date.now() * 5);
    const r = Date.now() * 0.0003;

    mesh.position.x = 700 * Math.cos(r);
    mesh.position.z = 700 * Math.sin(r);
    mesh.position.y = 700 * Math.sin(r);

    mesh.children[0].position.x = 70 * Math.cos(2 * r);
    mesh.children[0].position.z = 70 * Math.sin(r);

    if (activeCamera === cameraPerspective) {

      cameraPerspective.fov = 35 + 30 * Math.sin(0.5 * r);
      cameraPerspective.far = mesh.position.length();
      cameraPerspective.updateProjectionMatrix();

    }

    cameraRig.lookAt(mesh.position);

    renderer.clear();

    renderer.render(scene, activeCamera);
  }
}