import Experience from "../Experience.js";
import * as THREE from 'three';
import GSAP from "gsap";
import { Clock } from "three";
import moment from 'moment'
import Controls from './Controls';
import { RectAreaLight } from "three";
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { on } from "events";
export default class Room {
    static instance;
    constructor(canvas) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};
        this.controls = this.experience.controls;
        this.lerp = {
            current:0,
            target: 0,
            ease: 0.02
        }
        this.clock = new THREE.Clock();
        this.mixerS = new THREE.AnimationMixer( this.room.scene );
        this.mixerM = new THREE.AnimationMixer( this.room.scene );
        this.mixerH = new THREE.AnimationMixer( this.room.scene );
        this.clips = this.room.animations;

        if(this.clips.length>0){
            this.action1 = this.mixerS.clipAction( this.clips[2] );
            this.action2 = this.mixerM.clipAction( this.clips[1] );
            this.action3 = this.mixerH.clipAction( this.clips[0] );
            this.action1.play();
            this.action2.play();
            this.action3.play();
        }
        this.myTime();
        this.setModel();
        this.getModels();
        this.onMouseMove();
    }
    getModels(){
        this.actualRoom.children.forEach(obj => {
            if(obj.name == "light"){
               this.ligtGlb = obj;
            }
        })
        this.scene.children.forEach(obj => {
            if(obj.name == "floor"){
                this.floor = obj;
                
            }
        });
    }
    setModel(){

        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((child2)=>{
                    child2.castShadow = true;
                    child2.receiveShadow = true;
                    if(child2.material && child2.material.name == "book"){
                        child2.material = new THREE.MeshStandardMaterial({
                            color: this.getRandomColor()
                        })
                    }
                    if(child2.name.toLowerCase().startsWith("hand_second")){
                        child2.animations = this.action2;
                    }
                })
            }

            if(child.name.toLowerCase() == "hand_second"){
                child.animations = this.action2;

            }

            if(child.name.startsWith("Screen")){
                child.material = new THREE.MeshPhysicalMaterial({
                    color: 'black',
                    roughness: 0.1
                })
                if(child.name == "Screen"){
                    child.material = new THREE.MeshBasicMaterial({
                        map:this.resources.items.screen
                    })
                }
            }
            if(child.material && child.material.name == "book"){
                child.material = new THREE.MeshPhysicalMaterial({
                    color: this.getRandomColor(),
                    sheenRoughness: 1,
                    metalness: 100
                })
            }

            this.roomChildren[child.name]= child;
        });

        const intensity = 0;
        const rectLight = new THREE.PointLight(
            0xeeffff,
            0,
            2,
            1
        );

        rectLight.name = "light"
        rectLight.position.set(1, 1.4, -0.5);
        rectLight.rotation.x = -Math.PI;
        rectLight.rotation.z = Math.PI;
        rectLight.rotation.y = Math.PI/ 4;
        this.actualRoom.add(rectLight);
        

        const rectLightHelper = new RectAreaLightHelper(rectLight);
        this.actualRoom.add(rectLightHelper);

        this.scene.add(this.actualRoom);
        
        // this.actualRoom.scale.set(0,0,0)
    }
    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
            
            this.rotation = (e.clientX - window.innerWidth / 2) * 2 / window.innerWidth * 2;
            this.lerp.target = this.rotation*0.1;
        })
    }
    getRandomColor() {
        const colors = [
            '#8a391d',
            "#b06b55",
            "#fdd892",
            "#506bb3",
            "#30333c",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }   
    switchTheme(theme){
        if(theme == "dark"){
            setTimeout(()=>{
                GSAP.to(this.ligtGlb, {intensity: 0.5})
            },500)
            
            GSAP.to(this.floor.material.color, {
                r:0.05,
                g:0.05,
                b:0.05
            })

            this.experience.world.floor.circle1.material.color = {
                r:0.09,
                g:0.09,
                b:0.09
            }
            this.experience.world.floor.circle2.material.color = {
                r:0.07,
                g:0.07,
                b:0.07
            }
           
        } else {
            GSAP.to(this.ligtGlb, {intensity: 0.5})
            GSAP.to(this.floor.material.color, {
                r:0.71,
                g:0.64,
                b:0.51
            })

            this.experience.world.floor.circle1.material.color = {
                r: 0.78/1.5,
                g: 0.67/1.5,
                b: 0.47/1.5
            }
            this.experience.world.floor.circle2.material.color = {
                r: 0.78/1.65,
                g: 0.67/1.65,
                b: 0.47/1.65
            }
        }
    }  

    myTime(){
        this.moment = new moment();
        const h = parseInt(this.moment.format('hh'));
        const m = parseInt(this.moment.format('mm'));
        const s = parseInt(this.moment.format('ss'));
        console.log(h,m,s)
        this.mixerM.setTime(m * 2.5 / 60);
        this.mixerH.setTime(h/12 + m / (720 - 150));
        setInterval(()=>{
            this.moment = new moment();
            const h = parseInt(this.moment.format('hh'));
            const m = parseInt(this.moment.format('mm'));
            const s = parseInt(this.moment.format('ss'));
            console.log(h,m,s)
            this.mixerM.setTime(m * 2.5 / 60);
            this.mixerH.setTime(h/12);
        },30*1000)
    }



    resize() {

    }
    update(delta) {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );    
        this.actualRoom.rotation.y = this.lerp.current;
        this.mixerS.update(this.clock.getDelta()/10)
    }
}