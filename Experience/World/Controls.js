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
        this.floor = this.experience.world.floor;
        this.sizes = this.experience.sizes;
        this.animatedTag = document.querySelector(".animated");
        this.smoothScroll();
        GSAP.registerPlugin(ScrollTrigger);
        this.getHTMLElements()
        setTimeout(()=>{
            window.addEventListener("scroll",(e)=>{this.onScroll(e)})
        }, 1000)
        this.circle1 = this.experience.world.floor.circle1;
        this.circle2 = this.experience.world.floor.circle2;
        this.circle3 = this.experience.world.floor.circle3;
        
      
        this.setScrolltrigger();
    }
    setScrolltrigger(){
       ScrollTrigger.matchMedia({            /**DESKTOP */
            "(min-width: 969px)" : ()=>{
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top center",
                        end: "bottom center",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        markers: false,
                        onComplete: () => ScrollTrigger.refresh()
                    }
                });
                this.firstMoveTimelinePosition = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top center",
                        end: "bottom center",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        onComplete: () => ScrollTrigger.refresh()
                    }
                });
                this.firstMoveTimeline.to(this.camera.orthographicCamera,{
                    zoom: 2.7
                })
                this.firstMoveTimelinePosition.to(this.camera.orthographicCamera.position,{
                    x: 0.7,
                    y: 1.4,
                    z: 1.5
                })

            },
            /**mobile */
            "(max-width: 969px)" : () => {
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                        markers: false,                    }
                });
                this.firstMoveTimelinePosition = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move-mobile",
                        start: "top top",
                        markers: false,                        end: "50px -500px",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                });
                this.firstMoveTimeline.to(this.camera.orthographicCamera,{
                    zoom: 7
                })
                this.firstMoveTimelinePosition.to(this.camera.orthographicCamera.position,{
                    x: 1.5,
                    y: 1.4,
                    z: 1.5
                })
            },
            all:()=>{
                this.circleTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".intro-move",
                        start: "top top",
                        end: "bottom bottom+500px",
                        scrub: 1,
                        invalidateOnRefresh: true,
                        markers: false,
                        onComplete: () => ScrollTrigger.refresh()
                    }
                }).to(this.circle1.scale,{
                    x:1,
                    y:1,
                    z:1
                }).to(this.circle2.scale,{
                    x:0.9,
                    y:0.9,
                    z:0.9
                }).to(this.circle3.scale,{
                    x:0.7,
                    y:0.7,
                    z:0.7
                })
            }
        })
    }


    smoothScroll(){
        var isMobile = /Mobi/i.test(window.navigator.userAgent)
        if(!isMobile){
            var page = document.getElementsByClassName("page")[0];
            var height = page.getBoundingClientRect().height - 1;
            var speed = 0.04;
            var offset = 10;

            
            function smoothScroll() {
                offset += (window.pageYOffset - offset) * speed;
                var scroll = "translateY(-" + offset + "px) translateZ(0)";
                page.style.transform = scroll;
                var callScroll = requestAnimationFrame(smoothScroll);
                var starts = document.querySelectorAll(".gsap-marker-start");
                var ends = document.querySelectorAll(".gsap-marker-end");
                ScrollTrigger.refresh();
            }
            smoothScroll(); 
        }
    }

    onScroll(e){
        this.scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
        this.animatedTag.style = "opacity:0"
        setTimeout(()=>{
            this.animatedTag.style.display = "none"
        },500)
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
        this.camera.update();                            
    }
}