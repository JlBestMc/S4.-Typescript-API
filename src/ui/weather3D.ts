import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import { GLTFLoader } from "three-stdlib";
import { DRACOLoader } from "three-stdlib";

//declaramos las partes fundamentales de la escena
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let controls: OrbitControls;
let currentModel: THREE.Group | null = null;

//creamos la función y seleccionas por el id la parte en el html
export function initThreeViewer(): void {
  const canvas = document.getElementById("weather-canvas") as HTMLCanvasElement;
  if (!canvas) return;

  //creamos la escena, camara (con algunos valores) y la posición a 3 unidades de Z
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  camera.position.z = 3;

  //En el render, le deamos los valores alpha:true para que el fondo sea transparente y antialias para los bordes suaves
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  //luces que daran un brillo al modelo 3D
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  //creamos los controles que permitirán interaccionar con el modelo 3D
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; //suavizado de movimiento
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.autoRotate = false;

  animate();
}

//creamos la funcion que cargará el modelo
export function loadModel(path: string): void {
  const loader = new GLTFLoader();

  //Incorporamos el dracoLoadore, que leera los modelos 3D comprimidos
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  loader.setDRACOLoader(dracoLoader);

  loader.load(
    path,
    (gltf) => {
      if (currentModel) {
        scene.remove(currentModel); //si ya tenemos un modelo 3D, lo elimina, esto permite no solapar modelos 3D
      }

      currentModel = gltf.scene;

      // Conseguimos el tamaño del modelo y permitimos el escalarlo
      const box = new THREE.Box3().setFromObject(currentModel);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);
      currentModel.position.sub(center);

      const maxAxis = Math.max(size.x, size.y, size.z);
      const scaleFactor = 3.0 / maxAxis;
      currentModel.scale.setScalar(scaleFactor);

      // Cambiamos el color del modelo si es luna o sol
      if (path.includes("sol") || path.includes("luna")) {
        currentModel.traverse((child) => {
          //traverse examinará todas las partes hijas del modelo 3D
          if ((child as THREE.Mesh).isMesh) {
            //mesh siginifica parte del modelo 3D
            const mesh = child as THREE.Mesh;
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => {
                (m as THREE.MeshStandardMaterial).color.set("#FFFF00");
              });
            } else {
              (mesh.material as THREE.MeshStandardMaterial).color.set(
                "#FFFF00"
              );
            }
          }
        });
      }

      scene.add(currentModel); //añadimos el modelo a la escena
    },
    undefined,
    (error) => {
      console.error("Error carregant model DRACO:", error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);

  controls.update(); //actualizará todo el rato el movimiento del modelo 3D
  renderer.render(scene, camera); //renderiza la escena y camara
}
