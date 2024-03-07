<template>
  <canvas :id="id"></canvas>
</template>
<script lang="ts" setup>
import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // 引入相机控件
// 引入stats性能监视器
import Stats from "three/addons/libs/stats.module.js";
import { onMounted, ref } from "vue";
import snapshot from "@/assets/img/snapshot.png";

const id = ref("LIGHT");
const drawCanvas = () => {
  const width = 800;
  const height = 500;
  const canvas = document.getElementById(id.value) as HTMLCanvasElement;
  const scene = new THREE.Scene();
  const geometry = new THREE.PlaneGeometry(200, 120);
  // 加载一个贴图
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(snapshot);
  texture.offset.x = 0.1;
  // texture.offset.y = 0.5;
  texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;
  // texture.repeat.set(10, 10);
  const material = new THREE.MeshLambertMaterial({
    // color: 0x00ffff,
    map: texture,
    transparent: true,
    opacity: 1,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = 1;
  scene.add(mesh);

  const axesHelper = new THREE.AxesHelper(200);
  axesHelper.position.y = -1;
  scene.add(axesHelper);

  const camera = new THREE.PerspectiveCamera(20, width / height, 1, 2000); // fov, aspect ratio, near, far
  camera.position.set(0, 800, 0);
  // camera.lookAt(mesh.position);
  camera.lookAt(0, 0, 0);
  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(width, height);
  // renderer.render(scene, camera);

  // 创建stats对象
  const stats = new Stats();
  document.body.appendChild(stats.domElement);
  // 周期性执行
  const render = () => {
    stats.update();
    texture.offset.x += 0.01;
    // mesh.rotateY(0.01); // 旋转物体
    renderer.render(scene, camera); // 渲染场景, 更新相机
    requestAnimationFrame(render);
  };
  // 创建一个网格辅助对象
  const gridHelper = new THREE.GridHelper(300, 30, 0x888888, 0x888888);
  scene.add(gridHelper);

  // 创建一个相机控件对象
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(100, 0, 100);
  // controls.target.set(0, 0, 0);

  controls.update();
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
