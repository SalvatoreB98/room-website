import Experience from "../Experience.js";
import * as THREE from 'three';
import GSAP from 'gsap';
import GUI from "lil-gui";
export default class Environment {
    static instance;
    constructor(canvas) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunlight();
        this.setAmbientLight();


        /** GUI */
        // this.gui = new GUI({container: document.querySelector('.hero-section')});
        // this.obj = {
        //     colorObj: { r: 0, g: 0, b: 0 },
        //     intensity: 3,
        // };
        // this.setGUI();

    }
    setAmbientLight(){
        this.ambientLight = new THREE.AmbientLight("#e9c9c6",1)
        this.scene.add(this.ambientLight);
    }
    setSunlight(){
        this.sunlight = new THREE.DirectionalLight('#fdd892', 3);
        this.sunlight.shadow.bias = -0.0004
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far=20;
        this.sunlight.shadow.mapSize.set(2048,2048)
        this.sunlight.rotation.x = 50
        this.sunlight.position.set(0.8, 7, 3)
        this.scene.add(this.sunlight);
    }
    switchTheme(theme){
        if(theme == "dark"){
            GSAP.to(this.sunlight.color,{
                r: 0.188, g: 0.2, b: 0.3
            });
            GSAP.to(this.ambientLight.color,{
                r: 0.188, g: 0.2, b: 0.7
            });
            GSAP.to(this.sunlight,{
                intensity: 1.61
            })
        } else {
            GSAP.to(this.sunlight.color,{
                r: 0.99, g: 0.84, b: 0.57
            });
            GSAP.to(this.ambientLight.color,{
                r: 0.91, g: 0.78, b: 0.77
            })
            GSAP.to(this.sunlight,{
                intensity: 3
            })
            GSAP.to(this.ambientLight,{
                intensity: 1
            })
        }
        
    }

    setGUI() {
        this.gui.addColor(this.obj, "colorObj").onChange(() => {
            this.sunlight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(() => {
            this.sunlight.intensity = this.obj.intensity;
            this.sunlight.ambientLight = this.obj.intensity;
        });
    }

    update() {

    }
}