//project intro
// gsap.registerPlugin(GSDevTools) ;


const processIntro = document.querySelector('.process-intro')
let processImg = document.querySelectorAll('.process-img')

gsap.set("body#project-page", { backgroundColor: "#e1e1e1" });

let matchM = gsap.matchMedia();

matchM.add({
isMobile:"(max-width: 991px)",
    isDesktop: "(min-width: 992px)"
  }, (context) => {
    let = { isDesktop, isMobile} = context.conditions;

    gsap.set(processIntro, {height: "90svh"})

  	const processIntroTl = gsap.timeline({
        scrollTrigger:{
            trigger:".process-intro",
            start: isDesktop ? "top center" : "top 25%",
            end: "bottom 50%",
            pin:false,
            scrub:false,
            // markers: true,
            toggleActions: "play reverse restart reverse"
        },
        defaults: {
            duration: 0.3,
            ease:"power2.out"
        } 
    })

    processIntroTl.to("body#project-page", {backgroundColor: "#19A8F8"})
    .to("h3", {color: "#e1e1e1"}, 0);

    const processTl = gsap.timeline({
        defautls: {
            ease: "none"
        },
        scrollTrigger:{
            trigger: ".process-container",
            start: "top top",
            end: `${window.innerHeight * processImg.length} top`,
            scrub: true,
            pin: true,
            markers: true,

        }
    });

    processTl
    .from(
        ".process-img",
        {
            y: () => window.innerHeight,
            duration: 1,
            stagger: 2
        }
    )
    .from(".process-text",{
        y: () => window.innerHeight,
            duration: 1,
            stagger: 2
    }, "<")
   

    processImg.forEach((img, index) => {
        gsap.set(img, {
            rotation:gsap.utils.random(-15, 15)})

        processTl.to(img, {
            rotation: gsap.utils.random(-2.5, 2.5),
        }, "<")
    })

    processTl.to(".process-text:not(:last-child)",
        {y: () => -window.innerHeight,
            duration: 1,
            stagger: 2
        }, 2
    );
    
    ScrollTrigger.sort();

    // GSDevTools.create({ animation: processTl });
})


