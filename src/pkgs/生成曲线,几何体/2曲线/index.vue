<template>
  <canvas id="canvas"></canvas>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue'
import * as Three from 'three'
import ThreeBase from '@/utils/threeBase'
  
const draw = () => {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
  const threeInstance = new ThreeBase(canvas);
  // 椭圆曲线
  const arc = new Three.EllipseCurve(0, 0, 120, 50) // 圆弧 几何中心 x y x半径 y半径
  const points = arc.getPoints(50); // 获取曲线上的点 51个
  // const points = arc.getSpacedPoints(50); // 获取曲线上的点 51个
  console.log("pints", points)
  const geometry = new Three.BufferGeometry();
 
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