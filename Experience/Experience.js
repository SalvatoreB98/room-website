import * as THREE from "three";
import Sizes from "./Utils/Sizes.js"
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import Time from "./Utils/Time.js";
import World from './World/World';
import Resources from './Utils/Resource';
import assets from "./Utils/assets.js";
import Lang from './Utils/Lang';
import Animations from './Utils/animations.js'
import Theme from './Theme';
import Preloader from "./Preloader.js";
export default class Experience {
    static instance;
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance
        }

        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer =  new Renderer()
        this.resources = new Resources(assets);
        this.translations = new Lang();
        this.theme = new Theme();
        this.animations = new Animations();
        this.world = new World();
        this.preloader = new Preloader();
        this.time.update();
        
        this.time.on("update", () => {
            this.update();
        })
        
        this.sizes.on("resize", () => {
            this.resize();
        });

    }
    update(){
        this.camera.update();
        this.renderer.update()
        this.world.update();
    }
    resize(){
        this.camera.resize();
        this.renderer.resize()
    }
}