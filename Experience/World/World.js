import Experience from "../Experience.js";
import Room from "./Room.js";
import Environment from "./Environment.js";
import Controls from './Controls';
import Floor from "./Floor.js";
import { EventEmitter } from 'events';
import Theme from '../Theme';
export default class World extends EventEmitter {
    static instance;
    constructor(canvas) {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources =  this.experience.resources;
        this.theme = this.experience.theme;
        
        this.resources.on("loaded",()=>{
            this.environment = new Environment();
            this.room = new Room();
            this.floor = new Floor();
            this.controls = new Controls();
        })
        this.theme.on("switch",(theme)=>{
            this.switchTheme(theme);
        })
    }
    switchTheme(theme){
        if(this.environment){
            this.environment.switchTheme(theme);
        }
        if(this.room){
            this.room.switchTheme(theme);
        }
    }
    resize() {

    }
    update() {
        if(this.room){
            this.room.update();
        }
        if(this.controls){
            this.controls.update();
        }
    }   
}