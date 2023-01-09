import Experience from "./Experience.js";
import * as THREE from 'three'
export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.createOrthographicCamera();
        this.createPerspectiveCamera();
    }
    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.perspectiveCamera.position.x = 29;
        this.perspectiveCamera.position.z = 14;
        this.perspectiveCamera.position.y = 12;
        this.perspectiveCamera.rotateY(50)

        this.scene.add(this.perspectiveCamera);
    }

    createOrthographicCamera() {
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -10,
            50
        );
        if(this.sizes.width < this.sizes.height){
            this.orthographicCamera = new THREE.OrthographicCamera(
                (-this.sizes.aspect * this.sizes.frustrum),
                (this.sizes.aspect * this.sizes.frustrum),
                this.sizes.frustrum ,
                -this.sizes.frustrum,
                -10,
                50
            );
        }

        // 6.5
        this.orthographicCamera.position.y = 4;
        this.orthographicCamera.position.z = 10;
        this.orthographicCamera.rotation.x = -Math.PI / 10;

        this.scene.add(this.orthographicCamera);
    }

    resize() {
        //update perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();
        //update ortoG Camera on Resize
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        if(this.sizes.width < this.sizes.height){
            this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum);
            this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum);
            this.orthographicCamera.top = this.sizes.frustrum;
            this.orthographicCamera.bottom = -this.sizes.frustrum;
        }
        this.orthographicCamera.updateProjectionMatrix()
    }

    update() {
        
    }
}