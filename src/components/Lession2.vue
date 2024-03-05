<template>
  <canvas id="LESSION2"></canvas>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRaw } from "vue";
import * as THREE from "three"; // three';
import {
  createMaterial,
  makeInstance,
  resizeRendererToDisplaySize,
} from "@/utils/threeUtil";
const data: { cubes: THREE.Mesh[] } = reactive({
  cubes: [],
});

const main = () => {
  const canvas = document.querySelector("#LESSION2")!;
  console.log("canvas", canvas);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true }); // 渲染器 负责将你提供的所有数据渲染绘制到canvas上。
  const fov = 40; // fov, field of view 视野范围
  const aspect = canvas.clientWidth / canvas.clientHeight; // 2; // aspect, width/height, 画布的宽高比
  const near = 0.1; // near, 近平面
  const far = 1000; // far, 远平面
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // 摄像机默认指向Z轴负方向，上方向朝向Y轴正方向。我们将会把立方体放置在坐标原点，所以我们需要往后移一下摄像机才能显示出物体。
  camera.position.z = 120;

  const scene = new THREE.Scene(); // 场景，用来放置所有需要渲染的物体。
  scene.background = new THREE.Color(0xaaaaaa); // 设置背景色

  const objects = [];
  const spread = 15;

  function addObject(x: number, y: number, obj: THREE.Mesh) {
    obj.position.x = x * spread;
    obj.position.y = y * spread;

    scene.add(obj);
    objects.push(obj);
  }

  function addSolidGeometry(x: number, y: number, geometry: THREE.BoxGeometry) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
  }

  const width = 8;
  const height = 8;
  const depth = 8;

  addSolidGeometry(-2, -2, new THREE.BoxGeometry(width, height, depth));

  renderer.render(scene, camera);

  function render(time: number) {
    time *= 0.001; // 将时间单位变为秒

    data.cubes.forEach((cube, ndx) => {
      // const cube = toRaw(c);
      const speed = 1 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  // requestAnimationFrame(render);
};

onMounted(() => {
  main();
});
</script>

<style scoped>
#c {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
