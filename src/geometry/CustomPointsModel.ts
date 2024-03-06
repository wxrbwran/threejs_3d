import * as THREE from "three";

/**
 * 创建一个基于Three.js的3D点阵示例。
 * 该代码不包含参数和返回值，因为它直接操作全局变量和实例化Three.js对象。
 * 主要步骤包括：
 * 1. 初始化一个BufferGeometry对象用于存储几何体信息；
 * 2. 定义顶点数据，并创建一个BufferAttribute来持有这些数据，然后将该属性设置到几何体上；
 * 3. 配置一个PointsMaterial材质用于点的显示，包括大小、大小衰减和颜色；
 * 4. 使用定义的几何体和材质创建一个点集。
 */

// 初始化一个BufferGeometry对象
const geometry = new THREE.BufferGeometry();

// 定义顶点数据，用于创建点的3D位置。数组中每三个数字构成一个点的(x, y, z)坐标。
const vertices = new Float32Array([
  0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10,
]);

// 创建一个BufferAttribute来管理顶点数据，并将其绑定到geometry上作为位置属性。
const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.setAttribute("position", attribute);

// 配置点的材质。包括点的大小、是否随距离衰减以及颜色。
const pointMaterial = new THREE.PointsMaterial({
  size: 10, // 点的大小
  sizeAttenuation: false, // 点的大小是否随距离衰减
  color: 0xffffff00, // 点的颜色
});

// 使用之前定义的geometry和pointMaterial创建一个点集对象。
const pointMesh = new THREE.Points(geometry, pointMaterial);

export default pointMesh;
