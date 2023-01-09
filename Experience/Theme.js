import { EventEmitter } from "events";

export default class Theme extends EventEmitter {
    constructor(){
        super();

        this.theme = "light";
        this.tagsToDark = [];
        this.getElements();
        this.toggleButton = document.getElementById("btn-toggle");
        this.toggleButton.addEventListener("click",()=>{
            this.updateNightMode();
        })
    }
    getElements(){
        this.tagsToDark.push(
            document.querySelectorAll("body"),
            document.querySelectorAll("nav-bar"),
            document.querySelectorAll("h1"),
            document.querySelectorAll("section.about"),
            document.querySelectorAll(".side-wrapper"),
            document.querySelectorAll(".right-side-wrapper")
        );
    }

    updateNightMode(){
        if(this.theme == "light"){
            document.getElementById("circle-toggle").classList.add(['night'])
            document.querySelector(".toggle").style = "background-color: #ccaf7c;";
            this.nightModeHTML(this.theme);
            this.theme = "dark";
            this.emit("switch", "dark")
        } else {
            document.getElementById("circle-toggle").classList.remove(['night'])
            document.querySelector(".toggle").style = ""
            this.nightModeHTML(this.theme);
            this.theme = "light";
            this.emit("switch", "light");
        }
    }
    nightModeHTML(theme){
        if(theme == "light"){
            this.tagsToDark.forEach(tags => {
                tags.forEach( element =>{
                    element.classList.add("dark")
                }) 
            });
        } else {
            this.tagsToDark.forEach(tags => {
                tags.forEach( element =>{
                    element.classList.remove("dark")
                }) 
            });
        }
        
    }
}