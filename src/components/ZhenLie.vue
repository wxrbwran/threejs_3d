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
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.5,
  });

  const number = 10;
  for (let i = 0; i < number; i++) {
    for (let j = 0; j < number; j++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(i * 20, 0, j * 20); // 沿着x轴分布
      scene.add(mesh);
    }
  }

  const axesHelper = new THREE.AxesHelper(200);
  scene.add(axesHelper);

  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 2000); // fov, aspect ratio, near, far
  camera.position.set(400, 400, 400);
  // camera.lookAt(mesh.position);
  camera.lookAt(100, 0, 100);
  // 点光源设置
  const pointLight = new THREE.PointLight(0xffffff, 2.0);
  pointLight.intensity = 50000.0; // 光照强度
  pointLight.decay = 0; // 光源衰减速度
  pointLight.position.set(800, 200, 300);
  // scene.add(pointLight);
  // 光源辅助观察
  const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
  scene.add(pointLightHelper);

  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  // 添加平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(50, 100, 60);
  // directionalLight.target = mesh; // 设置平行光的目标点 默认坐标原点
  scene.add(directionalLight);

  // 添加平行光辅助观察
  const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    10
  );
  scene.add(directionalLightHelper);

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setSize(width, height);
  // renderer.render(scene, camera);

  // 创建一个时钟对象
  const clock = new THREE.Clock();
  // 创建stats对象
  const stats = new Stats();
  document.body.appendChild(stats.domElement);
  // 周期性执行
  const render = () => {
    stats.update();
    const spt = clock.getDelta() * 1000; // 毫秒
    console.log("渲染间隔", spt);
    console.log("帧率", 1000 / spt);
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
