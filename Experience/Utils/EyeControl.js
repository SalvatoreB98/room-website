import Experience from "../Experience";
export default class EyeControl{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.pupils = []
        this.eyes = document.querySelectorAll(".eye")
        window.addEventListener("mousemove",(e)=>{
            this.pupils = document.querySelectorAll(".pupil");
            this.pupils.forEach(pupil=>{
                console.log(e, this.sizes)
                pupil.style.top = e.clientY * 60 / this.sizes.height + "%";
                pupil.style.left = e.clientX * 50 / this.sizes.width + "%";
            })
        })
        window.addEventListener("keydown",(e)=>{
            if(e.code == "Space"){
                this.eyes.forEach(eye=>{
                    console.log("BLINK")
                    eye.style.height = "2px  ";
                    setTimeout(()=>{
                        eye.style.height = "1em";
                    },100)
                })
            }
        })
    }
}