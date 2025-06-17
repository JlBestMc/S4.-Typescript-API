import gsap from 'gsap';

export const animateText = () => {
    window.onload = function() {
    gsap.to("#text1 .main-text", {
    opacity: 1,  
    duration: 3,  
    delay: 1,
    ease: "power2.out"  
  });
};

     gsap.to("#text1 .main-text", 
    {
    backgroundPosition: "0% 0%", 
    duration: 3, 
    repeat: -1,  
    yoyo: true,
    ease: "power1.inOut"

    });
};
