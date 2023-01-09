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
    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(20,50)
        this.material = new THREE.MeshStandardMaterial({
            color: "#cfc19f"
        })
        this.floor = new THREE.Mesh(this.geometry, this.material);
        this.floor.name = "floor"
        this.floor.rotation.x = - Math.PI / 2;
        this.floor.position.y = -0.4
        this.floor.receiveShadow = true;
        this.scene.add(this.floor);
    }

   
    resize() {

    }
    update() {
    }
}