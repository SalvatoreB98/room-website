import * as THREE from "three";
import Sizes from "./Utils/Sizes.js"
import Camera from "./Camera.js";
import Experience from "./Experience.js";

export default class Renderer {
    static instance;
    constructor(canvas) {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.isMobile = /Mobi/i.test(window.navigator.userAgent)

        this.setRenderer()
    }

    setRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
            side: THREE.FrontSide, 
            shadowSide: THREE.FrontSide
        });
        
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        var gpuName = this.getGPU()
        console.log(gpuName)
        if(this.isMobile || gpuName.toLowerCase().includes("intel")){
            this.renderer.setPixelRatio(this.sizes.pixelRatio*0.5); 
        } else {
            this.renderer.setPixelRatio(this.sizes.pixelRatio); 
        }

    }
    
    getUnmaskedInfo(gl) {
        var unMaskedInfo = {
          renderer: '',
          vendor: ''
        };
  
        var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
        if (dbgRenderInfo != null) {
          unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
          unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
        }
  
        return unMaskedInfo;
    }
    getGPU(){
        var canvas = document.createElement('canvas');
        var gl = canvas.getContext("experimental-webgl");
        return this.getUnmaskedInfo(gl).renderer;
    }
    resize() {
        //update perspective Camera on Resize
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }
    update() {
        this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
        this.renderer.render(this.scene, this.camera.orthographicCamera) 
    }
       
}