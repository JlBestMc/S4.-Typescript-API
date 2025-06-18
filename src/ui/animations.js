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
    duration: 2, 
    repeat: -1,  
    yoyo: true,
    ease: "power1.inOut"

    });

    gsap.to("#joke", {
    opacity: 1,
    duration: 2,  
    delay: 2.5,  
    ease: "power2.out"  
  });

  gsap.to("#buttons-score", {
    opacity: 1,
    duration: 2,  
    delay: 3.5,  
    ease: "power2.out"  
  });

  gsap.to("#next-joke", {
    opacity: 1,
    duration: 2,  
    delay: 3.5,  
    ease: "power2.out"  
  });

  gsap.to("#weather-container", {
    opacity: 1,
    duration: 2,  
    delay: 4.5,  
    ease: "power2.out"  
  });

  gsap.to("#weather-canvas", {
    opacity: 1,
    duration: 2,  
    delay: 4.5,  
    ease: "power2.out"  
  });
};
