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
        this.prevScroll;
        this.page = document.getElementsByClassName("page")[0];
        this.lerp = {
            current:0,
            target: 0,
            ease: 0.02
        }
        
        this.smoothScroll();
        GSAP.registerPlugin(ScrollTrigger);
        this.getHTMLElements()
        setTimeout(()=>{
            window.addEventListener("scroll",(e)=>{this.onScroll(e)})
        }, 1000)
        this.circle1 = this.experience.world.floor.circle1;
        this.circle2 = this.experience.world.floor.circle2;
      
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
                    zoom: 3.5
                })
                this.firstMoveTimelinePosition.to(this.camera.orthographicCamera.position,{
                    x: 0.9,
                    y: 1.4,
                    z: 1.6
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
                        markers: false,                       
                        end: "50px -500px",
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
                });

                this.educationTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".education",
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                        markers: false,
                        onComplete: () => ScrollTrigger.refresh()
                    }
                }).to(this.camera.orthographicCamera.position,{
                    x: 1.5,
                    y: 1.5,
                    z: 0.5
                },0).to(this.camera.orthographicCamera,{
                    zoom: 5
                },0)

                this.skillsTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".skills",
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                        markers: false,
                        onComplete: () => ScrollTrigger.refresh()
                    }
                }).to(this.camera.orthographicCamera.position,{
                    x: 1,
                    y: 1,
                    z: 0.5
                },0).to(this.camera.orthographicCamera,{
                    zoom: 4.5
                },0)
                // .to(this.camera.orthographicCamera.rotation,{
                //     x: -Math.PI/4
                // },0)

                this.contactTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".pre-contacts",
                        start: "top bottom",
                        end: "bottom top+500px",
                        scrub: 1,
                        invalidateOnRefresh: true,
                        markers: false,
                        onComplete: () => ScrollTrigger.refresh()
                    }
                }).to(this.camera.orthographicCamera.position,{
                    x: 1.4,
                    y: 0.43,
                    z: 0.5
                },0).to(this.camera.orthographicCamera,{
                    zoom: 7
                },0).to(this.camera.orthographicCamera.rotation,{
                    x: -Math.PI/4
                },0)
            }
        })
    }

    
    smoothScroll(){
        var isMobile = /Mobi/i.test(window.navigator.userAgent)
        if(!isMobile){
            var page = this.page;
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
        if(this.scrollTop > this.prevScroll){
            this.lerp.target += 0.1;
        } else {
            this.lerp.target -= 0.2;
        }
        this.prevScroll = this.scrollTop 

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
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );    
        this.circle1.scale.x= this.circle1.scale.y = this.circle1.scale.z  = this.lerp.current;                       
        this.circle2.scale.x= this.circle2.scale.y = this.circle2.scale.z  = this.lerp.current * 0.5;                       
    }
}