import Experience from "../Experience";
export default class Animations {
    constructor(){
        this.experience = new Experience();
        this.animatedTag = document.querySelector(".animated")
        this.startChevronAnimation();
    }

    
    startChevronAnimation(){
        setInterval(() => {
            this.animatedTag.classList.add("move");
        }, 500);
        setTimeout(() => {
            setInterval(() => {
                this.animatedTag.classList.remove("move");
            }, 500);
        }, 100);
    }


    update(){

    }
}
