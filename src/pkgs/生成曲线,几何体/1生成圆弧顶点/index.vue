<template>
  <canvas id="canvas"></canvas>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue'
import * as Three from 'three'
import ThreeBase from '@/utils/threeBase'
import { Vector3 } from 'three';
  
const draw = () => {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
  const threeInstance = new ThreeBase(canvas);
  const geometry = new Three.BufferGeometry();
  const R = 100; // 半径
  const N = 50; // 分割份数
  const sp = 2 * Math.PI / N; // 弧度
  // 设置圆心坐标
  const cx = 200;
  const cy = 200;

  // 方法1
  // const vertices: number[] = [];
  // for (let i = 0; i <= N; i++) {
  //   const x = cx + R * Math.cos(i * sp);
  //   const y = cy + R * Math.sin(i * sp);
  //   const z = 0;
  //   vertices.push(x, y, z);
  // }
  // const attrib = new Three.BufferAttribute(new Float32Array(vertices), 3);
  // geometry.setAttribute('position', attrib);

  // 方法2 使用setFromPoints
  const points: Vector3[] = [];
  for (let i = 0; i <= N; i++) {
    const x = cx + R * Math.cos(i * sp);
    const y = cy + R * Math.sin(i * sp);
    const z = 0;
    points.push(new Three.Vector3(x, y, z));
  }
  geometry.setFromPoints(points);

  const material = new Three.LineBasicMaterial({ color: 0xff0000 });
  const line = new Three.Line(geometry, material);
  threeInstance.scene.add(line);
  threeInstance.render();
}

  onMounted(() => { 
    draw();
  });
  
  </script>
  <style scoped>
  #canvas {
    width: 800px;
    height: 600px;
  }
  </style>