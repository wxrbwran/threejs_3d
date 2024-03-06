<template>
  <canvas :id="id"></canvas>
</template>
<script lang="ts" setup>
import * as THREE from "three";

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
  const geometry1 = new THREE.BoxGeometry(25, 90, 25);
  const geometry2 = new THREE.BoxGeometry(25, 30, 25);

  const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.85,
  });
  const group1 = new THREE.Group();
  const group2 = new THREE.Group();
  const number = 5;
  for (let i = 0; i < number; i++) {
    const mesh = new THREE.Mesh(geometry1, material);
    mesh.position.set(i * 30, 0, 0);
    mesh.name = `${i + 1}号楼`;
    group1.add(mesh);
  }
  group1.name = "高层";

  for (let i = 0; i < number; i++) {
    const mesh = new THREE.Mesh(geometry2, material);
    mesh.position.set(i * 30, -30, 80);
    mesh.name = `${i + 6}号楼`;
    group2.add(mesh);
  }
  group2.name = "洋房";

  const group = new THREE.Group();
  group.name = "小区";

  group.add(group1, group2);

  scene.add(group);

  group.traverse((obj) => {
    console.log("name:", obj.name);
  });

  const axesHelper = new THREE.AxesHelper(200);
  scene.add(axesHelper);

  const camera = new THREE.PerspectiveCamera(20, width / height, 1, 2000); // fov, aspect ratio, near, far
  camera.position.set(400, 400, 400);
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

    // mesh.rotateY(0.01); // 旋转物体
    renderer.render(scene, camera); // 渲染场景, 更新相机
    requestAnimationFrame(render);
  };

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
