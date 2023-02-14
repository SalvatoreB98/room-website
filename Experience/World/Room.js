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
        this.textMesh = [];
        this.clips = this.room.animations;
        this.raycaster = new THREE.Raycaster();
        this.renderer.domElement.addEventListener('click', this.onClick.bind(this), false);
        this.mouse = new THREE.Vector2();

        if(this.clips.length>0){
            this.action1 = this.mixerS.clipAction( this.clips[3] );
            this.action2 = this.mixerM.clipAction( this.clips[2] );
            this.action3 = this.mixerH.clipAction( this.clips[1] );
           
            this.bounce = this.mixerBall.clipAction( this.clips[0] );
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

                // Create the area light using the RectAreaLight or RectAreaLightUniform
                var areaLight = new THREE.RectAreaLight(0xffffff, 5, 0.13, 0.20);
                // Position the area light at the same position as the light source mesh
                areaLight.rotation.x = -Math.PI/2
                areaLight.rotation.z = -Math.PI/4 - 0.1
                areaLight.position.x = 1.52
                areaLight.position.y = 0.6
                areaLight.position.z = 0.31
                // Add the area light to the scene
                var areaLightHelper = new RectAreaLightHelper(areaLight);
                // this.scene.add(areaLightHelper);
                this.scene.add(areaLight);
                this.inputs = [
                    document.getElementById("name"),
                    document.getElementById("email"),
                    document.getElementById("subject"),
                    document.getElementById("message")
                ]
                
                this.fontLoader = new FontLoader();
                this.fontLoader.load( 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json', ( font ) => {
                    this.font = font;
                });
                
                this.inputs.forEach(input =>{
                    input.addEventListener("input",()=>{ this.updateText(input) })
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
            GSAP.to(this.ligtGlb, {intensity: 0})
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

    updateText(input) {
        var text = this.inputs[0].value
        this.scene.remove(this.textMesh[input.id])
        this.createTextGeometry(this.font, input);
    }

    createTextGeometry(font, input) {
        var text = document.getElementById(input.id).value;
        if(input.id != 'message' && text.length > 20){
            text = text.substring(0,20)
            text = text.concat("...")
        } else if(text.length > 30) {
            text = text.substring(0,30)
            text = text.concat("...")
        }
        var geometry = new TextGeometry(text, {
            font: font,
            size: 0.5,
            height: 0.1,
          });
          var textMaterial = new THREE.MeshBasicMaterial( { color: 'black', transparent:true, opacity: 0.5 } );
                  this.textMesh[input.id] = new THREE.Mesh( geometry, textMaterial );
                  this.textMesh[input.id].position.set( 0, 0, 0 );
                  this.textMesh[input.id].scale.set(getScale(), getScale(), 0)
                  this.textMesh[input.id].rotation.x = -Math.PI/2
                  this.textMesh[input.id].rotation.z = -Math.PI/4 - 0.1
                  this.textMesh[input.id].position.y = 0.5
                  switch (input.id){
                      case 'name':
                          this.textMesh[input.id].position.x = 1.55
                          this.textMesh[input.id].position.z = 0.22
                          break;
                      case 'email':
                          this.textMesh[input.id].position.x = 1.54
                          this.textMesh[input.id].position.z = 0.228
                          break;
                      case 'subject':
                          this.textMesh[input.id].position.x = 1.525
                          this.textMesh[input.id].position.z = 0.239
                          break;
                      case 'message':
                          this.textMesh[input.id].position.x = 1.49
                          this.textMesh[input.id].position.z = 0.27
                  }
                  console.log(this.textMesh);
                  this.scene.add(this.textMesh[input.id]);
        function getScale(){
            if(text.length < 10){
                return 0.02
            } else {
                return 1 / text.length / 5
            }
        }
      }

    resize() {

    }
    
    update() {
        let delta = this.clock.getDelta(); 
        this.mixerS.update(delta/5);
        this.mixerBall.update(delta*1.5)
    }

}