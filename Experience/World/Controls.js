import Experience from "../Experience.js";
import * as THREE from 'three';
import GSAP from 'gsap';
import { ScrollTrigger } from "gsap/all";
export default class Controls {
    static instance;
    constructor(canvas) {
        this.scrollTop;
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.sizes = this.experience.sizes;
        this.animatedTag = document.querySelector(".animated");
        GSAP.registerPlugin(ScrollTrigger);
        this.getHTMLElements()
        setTimeout(()=>{
            window.addEventListener("scroll",(e)=>{this.onScroll(e)})
        }, 1000)
            
        
      
        this.setPath();
    }
    setPath(){
       this.timeline = new GSAP.timeline();
       this.timeline.to(this.room.position,{
                x: ()=>{
                    return this.sizes.width * 0.0009
                },
                scrollTrigger: {
                    trigger: '.first-move',
                    markers: true,
                    start: "20px 100%",
                    end: "bottom bottom",
                    scrub: 1.5,
                    invalidateOnRefresh: true
                }
            }
        )
    }


    
    onScroll(e){
        this.scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
        this.animatedTag.style = "opacity:0"
        if(this.firstExperience.getBoundingClientRect().top < this.experience.sizes.height){
            
        }
    }
    getHTMLElements(){
        this.firstExperience = document.querySelector(".first-experience")
        this.secondExperience = document.querySelector(".second-experience")
        this.conjuction = document.querySelector(".conjunction");
        this.nttWrapper = document.querySelector(".ntt-wrapper");
        this.line =  document.querySelector(".line");
        this.line.style.height = this.nttWrapper.offsetWidth + "px";
    }
    resize(){

    }

    update(){
                               
    }
}