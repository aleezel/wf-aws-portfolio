//project intro
const processIntro = document.querySelector('.process-intro')

gsap.set("body#project-page", { backgroundColor: "#e1e1e1" });

let matchM = gsap.matchMedia();

matchM.add({
isMobile:"(max-width: 991px)",
    isDesktop: "(min-width: 992px)"
  }, (context) => {
    let = { isDesktop, isMobile} = context.conditions;

    gsap.set(processIntro, {height: "90svh"})

  	const processTl = gsap.timeline({
        scrollTrigger:{
            trigger:".process-intro",
            start: isDesktop ? "top center" : "top 25%",
            end: "bottom 50%",
            pin:false,
            scrub:false,
            markers: true,
            toggleActions: "play reverse restart reverse"
        },
        defaults: {
            duration: 0.3,
            ease:"power2.out"
        } 
    })

    processTl.to("body#project-page", {backgroundColor: "#222"})
    .to("h3", {color: "#e1e1e1"}, 0);

})


