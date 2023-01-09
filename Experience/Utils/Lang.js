import { translations } from "./LangConfig";
export default class Lang {
    constructor(){
        document.createElement('translate-text');
        document.createElement('tag-lab');
        this.initialDom = document.cloneNode(true);
        this.userLang = navigator.language || navigator.userLanguage; 
        this.lang = 'en'
        if(this.userLang.startsWith('it')){
            this.lang = 'it'
        }
        this.updateLangText(this.lang);
        this.langButton = document.getElementById("lang-toggle");
        this.icon = document.getElementById("lang-icon");
        this.translate(this.lang, this.initialDom);
        this.langButton.addEventListener("click",()=>{
            this.updateLangText(this.lang)
            if(this.icon.classList.contains('rotation')){
                this.icon.classList.remove('rotation')
            } else {
                this.icon.classList.add(['rotation']);
            }
            switch(this.lang){
                case "it":
                    this.lang = "en";
                    break
                case "en":
                    this.lang = "it";
            }
            this.translate(this.lang, this.initialDom);
            this.updateLangText(this.lang)
        })
    }

    translate(lang, initialDom){
        const tags = initialDom.querySelectorAll('translate-text');
        const domTags = document.querySelectorAll('translate-text');
        tags.forEach((tag,index)=>{
            const key = tag.innerText;
            if(lang == 'it'){
                domTags[index].innerHTML = translations.it[key] ? translations.it[key] : tag.innerText;
            } else if(lang == 'en') {
                domTags[index].innerHTML = translations.en[key] ? translations.en[key] : tag.innerText;
            }
        });
    }
    updateLangText(lang){
        const langText = document.getElementById("lang-text")
        switch(lang){
            case "it":
                langText.innerHTML = "Italiano";
                break
            case "en":
                langText.innerHTML = "English";
        }
    }

    update(){

    }
}

   
  
    
   
