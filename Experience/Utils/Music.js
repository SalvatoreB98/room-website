import Experience from "../Experience";
export default class Music{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
    }
}