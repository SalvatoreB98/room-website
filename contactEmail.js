export default function emailService(emailjs){
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const serviceID="service_0whlgnp";
    const templateID="template_cbmm5hf";
    const formInputs = [
        {id:"name", isValid:false},
        {id:"email", isValid:false},
        {id:"subject", isValid:false},
        {id:"message", isValid:false}
    ]
    let isFormValid = false;
    let isCaptchaValid = false;
    window.addEventListener("load",()=>{

        /**Aggiunge un Event listener su tutti gli input che al keyUp va ad eseguire il validator per il form */
        formInputs.forEach(input=>{
            document.getElementById(input.id).onkeyup = (e) => {inputChange(e)};
        })
        /** Validator per la checkbox del captcha */
        document.getElementById("captcha").addEventListener("change",(e)=>{
            isCaptchaValid = e.target.checked;
            checkFormIsValid();
        })
        /**Validator mobile */
        document.getElementById("contact-form").addEventListener("touchend", (e) => {
            inputChange(e);
         });
        /** MAnda la mail */
        emailjs.init("bqrEkrXPg6tVYWgdR")
        var button = document.querySelector("[type=submit]")
        button.addEventListener("click", (e)=>{
            e.preventDefault();
            document.querySelector("[type=submit").remove();
            document.querySelector(".spinner").style.display = "block";
            var params = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            }
            emailjs.send(serviceID, templateID, params).then(res=>{
                if(res.status == 200){
                    console.log("Message sent!");
                    var contactForm = document.getElementById("contact-form");
                    contactForm.remove();
                    var success = document.getElementById("success");
                    success.style.display = "flex"
                }
            }).catch((err)=>{
                console.warn(err)
                var contactForm = document.getElementById("contact-form");
                contactForm.remove();
                var fail = document.getElementById("fail");
                fail.style.display = "flex"
                console.error("message not sent")
            })
        })
    })
    function inputChange(e) {

        if(e.target.id == "name"){
            if(e.target.value.length >= 3){
                formInputs[0].isValid = true; 
            } else {
                formInputs[0].isValid = false;
            }
        } else if(e.target.id == "email"){
            if(e.target.value.length < 25){
                if(e.target.value.match(mailformat)){
                    formInputs[1].isValid = true; 
                }else {
                    formInputs[1].isValid = false; 
                }
            }

        } else if(e.target.id == "subject"){
            if(e.target.value.length >= 3){
                formInputs[2].isValid = true; 
            } else {
                formInputs[2].isValid = false; 
            }
        } else if(e.target.id == "message"){
            if(e.target.value.length >= 5){
                formInputs[3].isValid = true; 
            } else {
                formInputs[3].isValid = false; 
            }
        }
        let formValidCounter = 0;
        formInputs.forEach(formInput=>{
            if(formInput.isValid){
                formValidCounter++;
            }
        })
        if(formValidCounter == formInputs.length){
            isFormValid = true;
        } else {
            isFormValid = false;
        }
        if(isFormValid && isCaptchaValid){
            document.querySelector("[type=submit").disabled = false;
        } else {
            document.querySelector("[type=submit").disabled = true;
        }
        checkFormIsValid();
    }


    function checkFormIsValid(){
        if(isFormValid && isCaptchaValid){
            document.querySelector("[type=submit").disabled = false;
        } else {
            document.querySelector("[type=submit").disabled = true;
        }
    }
}

