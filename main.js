import './style.css';
import './tagStyle.css';
import './styleDarkTheme.css';
import Experience from './Experience/Experience.js';
import emailjs from '@emailjs/browser';
const experience = new Experience(document.querySelector(".experience-canvas"));

window.addEventListener("load",()=>{
    emailjs.init("bqrEkrXPg6tVYWgdR")
    var button = document.querySelector("[type=submit]")
    button.addEventListener("click", (e)=>{
        e.preventDefault();
        var params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        }
        emailjs.send(serviceID, templateID, params).then(res=>{
            console.log(res);
            if(res.status == 200){
                console.log("Message sent!");
                var contactForm = document.getElementById("contact-form");
                contactForm.remove();
                var success = document.getElementById("success");
                success.style.display = "flex"
            }
        })
    })
})

const serviceID="service_0whlgnp";
const templateID="template_cbmm5hf";