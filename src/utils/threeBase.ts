import * as Three from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // 引入相机控件
  
export class ThreeBase {
  public container: HTMLCanvasElement | undefined;
  public scene!: Three.Scene;
  public camera: Three.PerspectiveCamera | undefined;
  public renderer!: Three.WebGLRenderer;

  constructor(container: HTMLCanvasElement) {
    this.container = container;
    this.scene = new Three.Scene();
    this.renderer = new Three.WebGLRenderer({ canvas: this.container, antialias: true });
    this.camera = undefined;
    this.init();
  }
  init() {
     // 初始化threejs 场景 相机 渲染器
    //  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    //  console.log(canvas);
   
     this.camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
     this.camera.position.set(0, 0, 800);
     // camera.lookAt(mesh.position);
     this.camera.lookAt(0, 0, 0);
 
     // 创建一个相机控件对象
     const controls = new OrbitControls(this.camera, this.container);
     // controls.target.set(100, 0, 100);
     controls.target.set(0, 0, 0);
 
     controls.update();
 
     const axesHelper = new Three.AxesHelper(200);
     axesHelper.position.y = -1;
     this.scene.add(axesHelper);
     // 添加环境光
     const ambientLight = new Three.AmbientLight(0xffffff, 1);
     this.scene.add(ambientLight);
 
     this.scene.add(this.camera);
    //  this.scene.add(line);
     this.renderer = new Three.WebGLRenderer({canvas: this.container});
     this.renderer.setSize(window.innerWidth, window.innerHeight);
     // renderer.render(scene, camera);
    //  render();
  }
  render = () => {
    // const self = this;
    // console.log(time);
    // mesh.rotateY(0.01); // 旋转物体
    this.renderer.render(this.scene, this.camera!); // 渲染场景, 更新相机
    requestAnimationFrame(this.render);
  };
}

export default ThreeBase;

