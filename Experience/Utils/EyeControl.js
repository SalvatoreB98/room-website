import Experience from "../Experience";
export default class EyeControl{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        window.addEventListener("mousemove",(e)=>{
            var pupils = document.querySelectorAll(".pupil");
            pupils.forEach(pupil=>{
                console.log(e, this.sizes)
                pupil.style.top = e.clientY * 60 / this.sizes.height + "%";
                pupil.style.left = e.clientX * 50 / this.sizes.width + "%";
            })
        })
    }
}