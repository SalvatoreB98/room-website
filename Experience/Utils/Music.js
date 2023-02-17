import Experience from "../Experience";
import music1 from "../../src/sounds/music1.wav"
import music2 from "../../src/sounds/music2.wav"
import music3 from "../../src/sounds/music3.wav"
import music4 from "../../src/sounds/music4.wav"
import music5 from "../../src/sounds/music5.wav"
import music6 from "../../src/sounds/music6.wav"
import Controls from "../World/Controls";
export default class Music{
    constructor(){
        this.isAudioEnabled = false;
        this.audioToggle = document.querySelector(".audio-toggle");
        this.volumeIcon = document.getElementById("volume-icon")
        this.audioToggle.addEventListener("click",(e)=>{this.onVolumeClick()})
        this.scrollTop;
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.world = this.experience.world;
        this.page = document.querySelector(".page");
        this.instruments = {
            kick: new Audio(music1),
            kasio: new Audio(music2),
            perc: new Audio(music3),
            bass: new Audio(music4),
            bass2: new Audio(music5),
            chord: new Audio(music6),
        }
        window.addEventListener("scroll",()=>{
            this.changepx = this.page.clientHeight / 12;
            this.scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
            var scrolled = this.scrollTop / this.changepx;
            if(scrolled > 0 && scrolled < 1){
                // PRIMO STEP AUDIO
                this.instrumentsToPlay(["kasio","bass"])
            } else if(scrolled > 1  && scrolled < 2){
                // SECONDO STEP AUDIO
                this.pitchDown(0.5);
                this.instrumentsToPlay(["kasio",,"bass","perc"])
                
            } else if(scrolled > 2  && scrolled < 3){
                // TERZO STEP AUDIO
                this.pitchDown(0.7);
                this.instrumentsToPlay(["kasio","perc", "kick", "bass"])
            } else if(scrolled > 3  && scrolled < 4){
                // QUARTO STEP AUDIO
                this.pitchDown(0.8);
                this.instrumentsToPlay(["kasio","perc", "kick", "bass"])
            } else if(scrolled > 4  && scrolled < 5){
                //QUINTO STEP AUDIO
                this.pitchDown(0.9);
                this.instrumentsToPlay(["kasio","perc", "kick", "bass", "chord"])
            } else if(scrolled > 5){
                // SESTO STEP AUDIO
                this.pitchDown(1);
                this.instrumentsToPlay(["kasio","perc", "kick", "bass", "chord"])
            }
        })
    }
    playMusic(){
        for (const [key, audio] of Object.entries(this.instruments)) {
            audio.play();
            audio.loop = true;
            audio.volume = 0;
            if(key == "kasio"){
                audio.volume = 1
            }
        }
    }
    instrumentsToPlay(intrumentKeys){
        for (const [key, audio] of Object.entries(this.instruments)) {
            if(intrumentKeys.includes(key)){
                audio.volume = 1
            } else{
                audio.volume = 0
            }
        }
    }
    onVolumeClick(){
        if(!this.isAudioEnabled){
            this.playMusic();
            console.log("PLAY")
            this.isAudioEnabled = true;
            this.volumeIcon.classList = ["fa fa-volume-up"]
        } else {
            this.stopMusic();
            console.log("STOP!")
            this.isAudioEnabled = false;
            this.volumeIcon.classList = ["fa fa-volume-off"]
        }
    }
    stopMusic(){
        for (const [key, audio] of Object.entries(this.instruments)) {
            audio.pause();
        }
    }
    pitchDown(pitch){
        for (const [key, audio] of Object.entries(this.instruments)) {
            audio.mozPreservesPitch = true;
            audio.playbackRate = pitch;
        }
    }
}