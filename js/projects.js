//project intro
// gsap.registerPlugin(GSDevTools) ;


const processIntro = document.querySelector('.process-intro')

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

    processIntroTl.to("body#project-page", {backgroundColor: "#222"})
    .to("h3", {color: "#e1e1e1"}, 0);

    const processTl = gsap.timeline({
        defautls: {
            ease: "none"
        },
        scrollTrigger:{
            trigger: ".process-container",
            start: "top top",
            end: `${window.innerHeight * 2} top`,
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
    .to(".process-text:not(:last-child)",
        {y: () => -window.innerHeight,
            duration: 1,
            stagger: 2
        }, 2
    );
    
    ScrollTrigger.sort();


    console.log(window.innerHeight)
    // GSDevTools.create({ animation: processTl });
})


