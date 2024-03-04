<template>
  <canvas id="c"></canvas>
</template>

<script setup lang="ts">
  import { onMounted, reactive, toRaw } from 'vue'
    import * as THREE from 'three'; // three';
  const data: { cubes: THREE.Mesh[] } = reactive({
    cubes: []
  })
  const makeInstance = (geometry: THREE.BufferGeometry, color: number, x: number) => { 
    const material = new THREE.MeshPhongMaterial({ color })
    const cube = new THREE.Mesh(geometry, material)
    cube.position.x = x
    return cube
  }

  const main = () => {
    const canvas = document.querySelector('#c')!;
    console.log("canvas", canvas);
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true }); // 渲染器 负责将你提供的所有数据渲染绘制到canvas上。
    const fov = 75; // fov, field of view 视野范围
    const aspect = 2; // aspect, width/height, 画布的宽高比
    const near = 0.1; // near, 近平面
    const far = 5; // far, 远平面
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // 摄像机默认指向Z轴负方向，上方向朝向Y轴正方向。我们将会把立方体放置在坐标原点，所以我们需要往后移一下摄像机才能显示出物体。
    camera.position.z = 3;

    const scene = new THREE.Scene(); // 场景，用来放置所有需要渲染的物体。
    // const boxWidth = 1;
    // const boxHeight = 1;
    // const boxDepth = 1;
    // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth); // 几何体，用来描述一个3D物体的形状。几何体可以是立方体，圆柱体，球体，等等。几何体可以是任何形状，只要能描述成一个3D物体的形状就行。
    // const material = new THREE.MeshPhongMaterial({color: 0x44aa88}); // 材质，用来描述一个3D物体的材质，包括颜色，透明度，反射率，等等。
    //const cube = new THREE.Mesh(geometry, material); // 网格，用来描述一个3D物体的网格模型。网格模型由几何体和材质组成。网格模型可以是任何形状，只要能描述成一个3D物体的形状就行。
    
    data.cubes.forEach(cube => scene.add(toRaw(cube))) // 添加一个网格模型到场景中。

    // 加入灯光
    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4); // 平行光有一个位置和目标点。默认值都为(0, 0, 0)。这里 将灯光的位置设为(-1, 2, 4)，让它位于摄像机前面稍微左上方一点的地方。
    // 目标点还是(0, 0, 0)，让它朝向坐标原点方向。
    scene.add(light);

    renderer.render(scene, camera);

    function render(time: number) {
      time *= 0.001;  // 将时间单位变为秒
      
      data.cubes.forEach((cube, ndx) => {
        // const cube = toRaw(c);
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });
    
      renderer.render(scene, camera);
    
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }
  
  onMounted(() => {
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth); 
    const currentCubes = [
      makeInstance(geometry, 0x44aa88,  0),
      makeInstance(geometry, 0x8844aa, -2),
      makeInstance(geometry, 0xaa8844,  2),
    ];
    data.cubes = currentCubes;
    main();
  });
</script>

<style scoped>
#c{

  width: 800px;
  height: 400px;
}
</style>