<template>
  <canvas :id="id"></canvas>
</template>
<script lang="ts" setup>
import * as THREE from "three";
import pointsMesh from "../geometry/CustomPointsModel";
import linesMesh from "../geometry/CustomLinesModel";

import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // 引入相机控件
// 引入stats性能监视器
import Stats from "three/addons/libs/stats.module.js";
import { onMounted, ref } from "vue";

const id = ref("LIGHT");
const drawCanvas = () => {
  const width = 800;
  const height = 500;
  const canvas = document.getElementById(id.value) as HTMLCanvasElement;
  const scene = new THREE.Scene();

  const mesh = linesMesh;
  mesh.position.set(0, 0, 0);
  scene.add(mesh);

  const axesHelper = new THREE.AxesHelper(200);
  scene.add(axesHelper);

  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 2000); // fov, aspect ratio, near, far
  camera.position.set(400, 400, 400);
  // camera.lookAt(mesh.position);
  camera.lookAt(0, 0, 0);

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setPixelRatio(window.devicePixelRatio); // 设置像素比 告诉threejs使用设备像素比
  renderer.setClearColor(0x444444, 1);
  renderer.setSize(width, height);
  // renderer.render(scene, camera);

  // 创建stats对象
  const stats = new Stats();
  document.body.appendChild(stats.domElement);
  // 周期性执行
  const render = () => {
    stats.update();

    renderer.render(scene, camera); // 渲染场景, 更新相机
    requestAnimationFrame(render);
  };

  // 创建一个相机控件对象
  const controls = new OrbitControls(camera, canvas);
  controls.addEventListener("change", function () {
    // console.log("change", camera.position);
    // renderer.render(scene, camera);
  });

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
../geometry/CustomModel../geometry/CustomPointsModel
