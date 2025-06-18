import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import { GLTFLoader } from "three-stdlib";
import { DRACOLoader } from "three-stdlib";

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let currentModel: THREE.Group | null = null;

export function initThreeViewer(): void {
  const canvas = document.getElementById("weather-canvas") as HTMLCanvasElement;
  if (!canvas) return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 3;

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.autoRotate = false;

  animate();

  loadModel("/sol-draco.glb"); // 👈 aquí cargas el modelo con DRACO
}

export function loadModel(path: string): void {
  const loader = new GLTFLoader();

  // Añadimos DRACO Loader
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  loader.setDRACOLoader(dracoLoader);

  loader.load(
    path,
    (gltf) => {
      if (currentModel) {
        scene.remove(currentModel);
      }

      currentModel = gltf.scene;

      // Centrar y escalar
      const box = new THREE.Box3().setFromObject(currentModel);
      const size = new THREE.Vector3();
      box.getSize(size);

      const center = new THREE.Vector3();
      box.getCenter(center);
      currentModel.position.sub(center);

      const maxAxis = Math.max(size.x, size.y, size.z);
      const scaleFactor = 3.0 / maxAxis;
      currentModel.scale.setScalar(scaleFactor);

      scene.add(currentModel);
    },
    undefined,
    (error) => {
      console.error("Error carregant model DRACO:", error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();
  renderer.render(scene, camera);
}
