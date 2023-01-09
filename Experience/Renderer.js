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
            alpha: true
        });
        
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        if(this.isMobile){
            this.renderer.setPixelRatio(this.sizes.pixelRatio*0.5); 
        } else {
            this.renderer.setPixelRatio(this.sizes.pixelRatio); 
        }

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