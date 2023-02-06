import Experience from "../Experience.js";
import * as THREE from 'three';
import GSAP from "gsap";
export default class Floor {
    static instance;
    constructor(canvas) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.setFloor();
        this.setCircles();

    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(20,50)
        this.material = new THREE.MeshStandardMaterial({
            color: "#c4a473"
        })
        this.floor = new THREE.Mesh(this.geometry, this.material);
        this.floor.name = "floor"
        this.floor.rotation.x = - Math.PI / 2;
        this.floor.position.y = -0.4
        this.floor.receiveShadow = true;
        this.scene.add(this.floor);
    }

    setCircles(){
        const geometry = new THREE.CircleGeometry( 5, 64 );
        const material = new THREE.MeshStandardMaterial({color: new THREE.Color(  0.78/1.5, 0.67/1.5, 0.47/1.5)})
        const material2 = new THREE.MeshStandardMaterial({color: new THREE.Color( 0.78/1.65, 0.67/1.65, 0.47/1.65)})
        this.circle1 = new THREE.Mesh( geometry, material );
        this.circle2 = new THREE.Mesh( geometry, material2 );
        this.circle1.position.y = -0.39
        this.circle2.position.y = -0.37
        this.circle1.scale.set(0,0,0);
        this.circle2.scale.set(0,0,0);
        this.circle1.rotation.x = this.circle2.rotation.x = -Math.PI/2
        this.circle1.receiveShadow = this.circle2.receiveShadow = true;

        this.scene.add(this.circle1);
        this.scene.add(this.circle2);
    }
   
    resize() {

    }
    update() {
    }
}