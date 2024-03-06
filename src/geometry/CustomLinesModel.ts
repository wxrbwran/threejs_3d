import * as THREE from "three";

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
const pointMaterial = new THREE.LineBasicMaterial({
  color: 0xffff00, // 点的颜色
});

// 使用之前定义的geometry和pointMaterial创建一个点集对象。
const lineMesh = new THREE.Line(geometry, pointMaterial);

export default lineMesh;
