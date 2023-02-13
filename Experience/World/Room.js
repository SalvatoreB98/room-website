import Experience from "../Experience.js";
import * as THREE from 'three';
import GSAP from "gsap";
import moment from 'moment'
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export default class Room {
    static instance;
    constructor(canvas) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.renderer = this.experience.renderer;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};
        this.ball;
        this.controls = this.experience.controls;
        this.lerp = {
            current:0,
            target: 0,
            ease: 0.02
        }
        /** Animations*/
        this.clock = new THREE.Clock();
        this.mixerS = new THREE.AnimationMixer( this.room.scene );
        this.mixerM = new THREE.AnimationMixer( this.room.scene );
        this.mixerH = new THREE.AnimationMixer( this.room.scene );
        this.mixerBall = new THREE.AnimationMixer( this.room.scene );
        this.textMesh;
        this.clips = this.room.animations;
        this.raycaster = new THREE.Raycaster();
        this.renderer.domElement.addEventListener('click', this.onClick.bind(this), false);
        this.mouse = new THREE.Vector2();

        if(this.clips.length>0){
            console.log(this.clips)
            this.action1 = this.mixerS.clipAction( this.clips[3] );
            this.action2 = this.mixerM.clipAction( this.clips[2] );
            this.action3 = this.mixerH.clipAction( this.clips[1] );
           
            this.bounce = this.mixerBall.clipAction( this.clips[0] );
            console.log(THREE.LoopOnce)
            this.bounce.setLoop(THREE.LoopOnce);
            this.bounce.clampWhenFinished = true;
            this.bounce.enable = true;

            this.action1.play();
            this.action2.play();
            this.action3.play();
        }


        this.myTime();
        this.setModel();
        this.getModels();
        this.onMouseMove();

        document.body.onkeyup = (e)=>{this.onKeyUp(e)}


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
            if(child.name.startsWith("ball") ){
                
                this.ball = child;

            }
            if(child.name.startsWith("tablet") ){
                this.tablet = child;
                this.inputName = document.getElementById("name")
                this.inputName.addEventListener("input",()=>{ this.updateText() })
                const loader = new FontLoader();
                loader.load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json', ( font ) => {
                    const geometry = new TextGeometry( 'Hello three.js!', {
                        font: font,
                        size: 0.5,
                        height: 0.1,
                    } );
                    const textMaterial = new THREE.MeshPhongMaterial( { color: 'black' } );

                    this.textMesh = new THREE.Mesh( geometry, textMaterial );
                    this.textMesh.position.set( 0, 0, 0 );
                    this.textMesh.scale.set(0.02,0.02,0)
                    this.textMesh.rotation.x = -Math.PI/2
                    this.textMesh.rotation.z = -Math.PI/4 - 0.1
                    this.textMesh.position.x = 1.55
                    this.textMesh.position.y = 0.5
                    this.textMesh.position.z = 0.22
                    this.actualRoom.children.push(this.textMesh)
                } );
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
            var mouse = new THREE.Vector2();
            mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera( mouse, this.camera.orthographicCamera );
            var intersects = raycaster.intersectObject( this.ball );

            if(intersects.length > 0) {
               document.body.style.cursor = 'pointer'
            } else {
                document.body.style.cursor = 'default'
            }
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

    onClick(){
        var mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(mouse, this.camera.orthographicCamera);
        
        var intersects = this.raycaster.intersectObject(this.scene, true);

        if (intersects.length > 0) {
            
            var object = intersects[0].object;
            if(object.name.startsWith('Icosphere')){
                this.bounce.stop();
                this.bounce.play();
                this.ball == object;
            }


        }
    }

    onKeyUp(e) {
        if (e.key == " " ||
            e.code == "Space" ||      
            e.keyCode == 32      
        ) {
            this.bounce.stop();
            this.bounce.play(); 
        }
    }

    updateText() {
        var text = document.getElementById('name').value;
        this.scene.remove(this.textMesh);
        this.createTextGeometry(this.textMesh.geometry.font);
    }
    createTextGeometry(font) {
        console.log(document.getElementById('name').value)
        var text = document.getElementById('name').value;
        var geometry = new TextGeometry(text, {
          font: font,
          size: 0.5,
          height: 0.1,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.05,
          bevelSize: 0.05,
          bevelSegments: 5
        });
        const textMaterial = new THREE.MeshPhongMaterial( { color: 'black' } );

                    this.textMesh = new THREE.Mesh( geometry, textMaterial );
                    this.textMesh.position.set( 0, 0, 0 );
                    this.textMesh.scale.set(0.02,0.02,0)
                    this.textMesh.rotation.x = -Math.PI/2
                    this.textMesh.rotation.z = -Math.PI/4 - 0.1
                    this.textMesh.position.x = 1.55
                    this.textMesh.position.y = 0.5
                    this.textMesh.position.z = 0.22
        this.scene.add(this.textMesh);
      }

    resize() {

    }
    
    update() {

        let delta = this.clock.getDelta(); 

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        ); 
        this.camera.orthographicCamera.rotation.y = this.lerp.current/10;
        this.mixerS.update(delta/5);
        this.mixerBall.update(delta*1.5)
    }

}