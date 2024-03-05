<template>
  <canvas id="First3D"></canvas>
  <div id="webgl"></div>
</template>
<script lang="ts" setup>
import * as THREE from "three";
import { onMounted } from "vue";
const drawCanvas = () => {
  const width = 800;
  const height = 500;
  const canvas = document.getElementById("First3D") as HTMLCanvasElement;
  const scene = new THREE.Scene();
  const geometry = new THREE.BoxGeometry(100, 60, 20);
  const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    transparent: true,
    opacity: 0.5,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);

  const axesHelper = new THREE.AxesHelper(200);
  scene.add(axesHelper);

  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000); // fov, aspect ratio, near, far
  camera.position.set(-1000, 0, 0);
  camera.lookAt(mesh.position);

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
