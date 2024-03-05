import * as THREE from "three";

/**
 * 创建并返回一个三维空间中的立方体实例。
 * @param geometry 立方体的几何形状，定义了立方体的结构。
 * @param color 立方体的颜色，以16进制数表示。
 * @param x 立方体在x轴上的位置。
 * @returns 返回一个配置了几何形状、材质和位置的立方体网格对象。
 */
export const makeInstance = (
  geometry: THREE.BufferGeometry,
  color: number,
  x: number
) => {
  const material = new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = x;
  return cube;
};
/**
 * 根据浏览器显示尺寸调整Three.js WebGL渲染器的大小。
 * @param {THREE.WebGLRenderer} renderer - 需要调整大小的WebGL渲染器实例。
 * @returns {boolean} 如果渲染器大小有调整，则返回true；否则返回false。
 */
export const resizeRendererToDisplaySize = (renderer: THREE.WebGLRenderer) => {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio; // 获取设备的像素比
  // const pixelRatio = 3; // 示例代码，硬编码的像素比，通常不推荐这样使用
  // 根据设备像素比计算画布的新尺寸
  const width = Math.floor(canvas.clientWidth * pixelRatio);
  const height = Math.floor(canvas.clientHeight * pixelRatio);

  // 检查画布当前尺寸是否与计算出的新尺寸不同
  const needResize = canvas.width !== width || canvas.height !== height;

  if (needResize) {
    // 如果需要调整大小，则调用renderer的setSize方法
    renderer.setSize(width, height, false);
  }

  return needResize;
};
/**
 * 创建一个具有随机颜色的Three.js材质对象。
 *
 * @returns {THREE.MeshPhongMaterial} 返回配置好的MeshPhongMaterial实例。
 */
export const createMaterial = () => {
  // 创建一个MeshPhong材质对象，并设置渲染双面
  const material = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
  });

  // 随机生成颜色的色调、饱和度和亮度值
  const hue = Math.random();
  const saturation = 1;
  const luminance = 0.5;
  // 使用HSL（色调、饱和度、亮度）设置材质的颜色
  material.color.setHSL(hue, saturation, luminance);

  return material;
};
// function addObject(scene, objects, spread, x, y, obj) {
//   obj.position.x = x * spread;
//   obj.position.y = y * spread;

//   scene.add(obj);
//   objects.push(obj);
// }
// function addSolidGeometry(x, y, geometry) {
//   const mesh = new THREE.Mesh(geometry, createMaterial());
//   addObject(x, y, mesh);
// }
