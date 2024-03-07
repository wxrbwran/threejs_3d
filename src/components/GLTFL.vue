<template>
  <canvas :id="id"></canvas>
</template>
<script lang="ts" setup>
import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // 引入相机控件
// 引入stats性能监视器
import Stats from "three/addons/libs/stats.module.js";
// 加载gltfLoader
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { onMounted, ref } from "vue";
// import glTFHorse from "";

const id = ref("LIGHT");

const gltfLoaderPromise = async (
  path: string,
  onProgress = (xhr) => {},
  onError = (error) => {}
) => {
  // 将GLTFLoader.load方法返回的promise
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      path,
      (gltf) => {
        resolve(gltf);
      },
      (xhr) => {
        if (onProgress) {
          onProgress(xhr);
        }
        // console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (e) => {
        if (onError) {
          onError(error);
        }
        reject(error);
      }
    );
  });
};

const drawCanvas = async () => {
  const width = 800;
  const height = 500;
  const canvas = document.getElementById(id.value) as HTMLCanvasElement;
  const scene = new THREE.Scene();
  const geometry = new THREE.PlaneGeometry(200, 120);
  // 实例化GLTFLoader
  const loader = new GLTFLoader();

  const gltf = await gltfLoaderPromise(
    // "./gltf/MaterialsVariantsShoe/glTF/MaterialsVariantsShoe.gltf"
    "./gltf/Parrot.glb"
  );

  scene.add(gltf.scene);

  const axesHelper = new THREE.AxesHelper(200);
  axesHelper.position.y = -1;
  scene.add(axesHelper);

  const camera = new THREE.PerspectiveCamera(120, width / height, 1, 2000); // fov, aspect ratio, near, far
  camera.position.set(0, 30, 60);
  // camera.lookAt(mesh.position);
  camera.lookAt(0, 0, 0);
  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(width, height);
  // renderer.outputColorSpace = THREE.SRGBColorSpace;
  // renderer.render(scene, camera);

  // 创建stats对象
  const stats = new Stats();
  document.body.appendChild(stats.domElement);
  // 周期性执行
  const render = () => {
    stats.update();
    // mesh.rotateY(0.01); // 旋转物体
    renderer.render(scene, camera); // 渲染场景, 更新相机
    requestAnimationFrame(render);
  };
  // 创建一个网格辅助对象
  const gridHelper = new THREE.GridHelper(300, 30, 0x888888, 0x888888);
  scene.add(gridHelper);

  // 创建一个相机控件对象
  const controls = new OrbitControls(camera, canvas);
  // controls.target.set(0, 0, 0);

  // controls.update();
  controls.addEventListener("change", function () {
    console.log("change", camera.position);
    // renderer.render(scene, camera);
  });
  console.log("end");
  render();
};
onMounted(() => {
  drawCanvas();
});
</script>
<style scoped>
#First3D {
  width: 100%;
  height: 100%;
}
</style>
