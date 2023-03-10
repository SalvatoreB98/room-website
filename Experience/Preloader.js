
import { EventEmitter } from 'events';
import Experience from './Experience';
import GSAP from 'gsap';
export default class Preloader extends EventEmitter{
    constructor(){
        super();
        this.preloader();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        this.world = this.experience.world;
        this.world.on("worldready",()=>{
            this.playIntro();
            this.setAssets();
            this.main.style.display='block'
             this.loaderSection.style.opacity = '0';
            setTimeout(()=>{
                 this.loaderSection.style.display = 'none';
            },1000)
        })
    }
    preloader(){
        this.loaderSection = document.querySelector("loader")
        this.main = document.querySelector("main")
        this.main.style.display='none'
    }
    playIntro(){
        this.timeline = new GSAP.timeline;
        // this.timeline.to(this)
    }
    setAssets(){
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
    }
}