var isMobile = /Mobi/i.test(window.navigator.userAgent)
if(!isMobile){
    var page = document.getElementsByClassName("page")[0];
    var height = page.getBoundingClientRect().height - 1;
    var speed = 0.04;
    var offset = 10;

    
    function smoothScroll() {
        offset += (window.pageYOffset - offset) * speed;
    
        var scroll = "translateY(-" + offset + "px) translateZ(0)";
        page.style.transform = scroll;
    
        callScroll = requestAnimationFrame(smoothScroll);
        
    }
    
    smoothScroll(); 

    
}
