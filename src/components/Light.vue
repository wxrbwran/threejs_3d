<template>
  <canvas :id="id"></canvas>
</template>
<script lang="ts" setup>
import * as THREE from "three";
import { onMounted, ref } from "vue";

const id = ref("LIGHT");
const drawCanvas = () => {
  const width = 800;
  const height = 500;
  const canvas = document.getElementById(id.value) as HTMLCanvasElement;
  const scene = new THREE.Scene();
  const geometry = new THREE.BoxGeometry(100, 100, 100);
  // const material = new THREE.MeshBasicMaterial({
  const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    // transparent: true,
    // opacity: 0.5,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);

  const axesHelper = new THREE.AxesHelper(200);
  scene.add(axesHelper);

  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 2000); // fov, aspect ratio, near, far
  camera.position.set(400, 400, 400);
  // camera.lookAt(mesh.position);
  camera.lookAt(0, 0, 0);

  const pointLight = new THREE.PointLight(0xffffff, 1.0);
  pointLight.intensity = 50000.0; // 光照强度
  pointLight.decay = 0; // 光源衰减速度
  pointLight.position.set(800, 200, 300);
  scene.add(pointLight);

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(width, height);
  renderer.render(scene, camera);
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
