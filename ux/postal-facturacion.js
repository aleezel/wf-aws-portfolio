// ┊͙✧˖*°࿐ !!!!   DISABLE SCROLL AND ENABLE AFTER LADING ANIMATION  !!!  ✧˖*°࿐┊͙


// ┊͙✧˖*°࿐ !!!!   LOAD  ANIMATIONS WHILE DOM FROM GSAP   !!!  ✧˖*°࿐┊͙
// wait until DOM is ready
gsap.registerPlugin(SplitText);

let heroSection = document.querySelector(".hero-section");
let nav = document.querySelector("nav");
$(document).ready(function () {
  // OPTIONAL - waits til next tick render to run code (prevents running in the middle of render tick)
  window.requestAnimationFrame(function () {
    heroSection.style.opacity = 1;
    nav.style.opacity = 1;
  });
});

// ┊͙✧˖*°࿐  SMOOTH SCROLL  ✧˖*°࿐┊͙
const lenis = new Lenis();
let scrollTime = 0;

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);
// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * scrollTime); // Convert time from seconds to milliseconds
});
// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);


// ┊͙✧˖*°࿐ PIXEL TRANSITION AT START  ✧˖*°࿐┊͙
gsap.to(".load_grid-pixel", {
  opacity: 0,
  duration: 0.001,
  stagger: { amount: 0.5, from: "random" },
  onComplete: () => {
    gsap.set(".load_grid", { display: "none" });
  }
});

// ✧TRANSITION AFTER CLICKING✧
$(document).ready(function () {
  $("a").on("click", function (e) {
    if (
      $(this).prop("hostname") === window.location.host &&
      $(this).attr("href").indexOf("#") === -1 &&
      $(this).attr("target") !== "_blank") {
      e.preventDefault();
      let destination = $(this).attr("href");
      gsap.set(".load_grid", { display: "grid" });
      gsap.fromTo(
        ".load_grid-pixel",
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.001,
          stagger: { amount: 0.5, from: "random" }, //you can also try a from: "start" or "end" -- get creative!
          onComplete: () => {
            window.location = destination;
          }
        }
      );
    }
  });

  // On click of the back button
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  }
});

// ┊͙✧˖*°࿐  MENU ANIMATION  ✧˖*°࿐┊͙
const staggerLinks = document.querySelectorAll("[stagger-link]")
gsap.set(".menu-dropdown", { display: "none", y: "8rem" })

//	let menuHover = gsap.to(".menu-icon", 1, {x: -384, ease:"steps(-6)", paused: true});
//	let menuIcon = document.querySelector(".animicon-container");

let isClicked = gsap.timeline({ paused: true })
isClicked.from(".menu-dropdown", { display: "none", y: "8rem", duration: 0 })
  .to(".menu-dropdown", {
    display: "flex", y: "6rem",
    onComplete: () => {
      console.log("careless whispers")
    }
  })
  .from(".menu-link", {
    y: "2rem", opacity: 0, ease: "power4.inOut",
    stagger: { each: 0.01 }
  }, "<")


//isClicked.to("menu-text [stagger-link]", )


//["mouseenter", "touchmove"].forEach( event =>
//	menuIcon.addEventListener(event, () => {
//  	menuHover.play()
//    console.log("hola");
//  })
//)

//["mouseout", "touchend"].forEach( event =>
//	menuIcon.addEventListener(event, () => {
//  	menuHover.reverse()
//  })
//)

//["click", "touchend"].forEach( event =>
//	menuIcon.addEventListener(event, () => {
//  	isClicked.play()
//})
//)

const gifContainer = document.getElementById("animicon-container")
const gifElement = document.getElementById("menu-icon")
console.log(gifElement, gifContainer)
const gif = new SuperGif({ gif: gifElement })
const FRAME_RATE = 180

gif.load(function () {
  gif.pause()
  frameController("mouseout")
});

const faceButtonEventHandler = event => {
  frameController(event.type)
}

const frameUpdateLogic = (startFrame, endFrame) => {
  // debo saber en que frame estoy
  // en base al tipo debo calcular cuál sigue
  // debo actalizar el frame
  const currentFrame = gif.get_current_frame()
  if (currentFrame > endFrame) {
    gif.move_to(currentFrame - 1)
  } else if (currentFrame < endFrame) {
    let nextFrame = currentFrame + 1
    gif.move_to(nextFrame)
  } else {
    gif.move_to(startFrame)
  }
}

gifContainer.addEventListener("mouseover", faceButtonEventHandler)
gifContainer.addEventListener("mouseout", faceButtonEventHandler)
gifContainer.addEventListener("click", faceButtonEventHandler)


// Tres tipos de reproducción,
// mouseout: Sin tocar nada, solo se reproducen los primeros 3 frames
// mouseover: Poner el mouse sobre el gif, se reproducen del 4 al 7
// click: Das click y se reproducen 8 al 10
let intervalId = null;
let isMenuActive = false;
const frameController = (currentActionType) => {
  clearInterval(intervalId)
  console.log(currentActionType)
  if (currentActionType === "mouseover") {
    intervalId = setInterval(frameUpdateLogic, FRAME_RATE, 6, 7)
  }
  if (currentActionType === "mouseout") {
    intervalId = setInterval(frameUpdateLogic, FRAME_RATE, 0, 1)
  }
  if (currentActionType === "click" && !isMenuActive) {
    intervalId = setInterval(frameUpdateLogic, FRAME_RATE, 6, 8)
    isClicked.play();
    isMenuActive = true
    console.log("click 1")
  }
  else if (currentActionType === "click" && isMenuActive) {
    intervalId = setInterval(frameUpdateLogic, FRAME_RATE, 0, 1)
    isClicked.reverse();
    isMenuActive = false
    console.log("click 2")
  }
}


// ┊͙✧˖*°࿐ HEAD TEXT REVEAL  ✧˖*°࿐┊͙ 
const revealText = new SplitType("p", {
  types: "lines, words"
});

// ┊͙✧˖ PROJECT TIMELINE AFTER LOAD࿐┊͙
let mm = gsap.matchMedia();

mm.add({
  isMobile: "(max-width: 991px)",
  isDesktop: "(min-width: 992px)"
}, (context) => {
  let = { isDesktop, isMobile } = context.conditions;

  // ┊͙✧˖*°࿐ STARRING PROJECT SHOW OFF TRANSITION  ✧˖*°࿐┊͙
  gsap.set(".mainimagelol", { y: "130%", left: isDesktop ? "100%" : "50%" })
  //gsap.set([".mainimage", ".project-title"], {x: "100%"})
  gsap.set(".project-title", { opacity: 0, left: isMobile ? "50%" : "100%" })
  gsap.set(".project-description_text .word, .project-tags .word", { opacity: 0, y: 30 })


  let leanOutLoopTL = gsap.timeline({ defaults: { duration: 1, ease: "elastic.out(0.5,0.4)" } });
  leanOutLoopTL.to(".project-title", { opacity: 1, duration: 0.5, ease: "power2.in" })
    .to(".mainimagelol", { y: "100%", ease: "elastic.out(1,0.4)" })
    .to(".mainimagelol", { y: "0%", rotation: 7 })
    .to(".mainimagelol", { left: "50%", rotationY: 360, rotation: 0 })
    .to(".project-title", { left: "50%", y: "-150%" }, ">-1")
    .to(".project-title", { left: "50%", y: "-150%" }, ">-1")
    .to(".project-description_text .word, .project-tags .word",
      {
        opacity: 1, y: 0, duration: 1, stagger: { amount: 0.2 },
        onComplete: () => {
          scrollTime = 1000;
        }
      }, ">-1");
})



// ┊͙✧˖*°࿐ TEXT ANIMATIONS  ✧˖*°࿐┊͙ 

gsap.set(".split-mask", { opacity: 1 });



function splitMaskAnimation(element) {
  SplitText.create(element, {
    type: "words,lines",
    linesClass: "line",
    mask: "lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        duration: 1.5,
        yPercent: 150,
        stagger: 0.2,
        ease: "expo.out"
      })
    }
  });

}


// ┊͙✧˖*°࿐ TEXT REVEAL  ✧˖*°࿐┊͙ 

// Function to animate text
function animateText(element) {
  const lines = element.querySelectorAll('.word');
  gsap.fromTo(
    lines,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => element.style.opacity = '1' // Ensure text remains visible after animation
    }
  );
}

// INTERSECTION OBSERVER MAP
const actions = {
  'split-mask': (element) => {
    splitMaskAnimation(element);
    // const tl = splitMaskAnimations.get(text);
    // if (tl) tl.play();
  },

  'text-reveal': (element) => {
    animateText(element);
  }
}


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;

      Object.keys(actions).forEach(className => {
        if (element.classList.contains(className)) {
          actions[className](element);
        }
      });

    });
  },
  { threshold: 0.3 } // Trigger when 10% of the element is visible
);

// Observe each element
document.querySelectorAll('p:not(.project-description_text):not(.project-tags):not(.split-mask)').forEach(text => {
  text.classList.add('text-reveal');
  observer.observe(text);
});

document.querySelectorAll('.split-mask').forEach(text => {
  observer.observe(text);
});




// // ┊͙✧˖*°࿐ GALLERY DUMP ON SCROLL  ✧˖*°࿐┊͙
// gsap.set(".gallery_image", { opacity: 0 });

// let scrollGallery = gsap.timeline({
//   delay: 3,
//   scrollTrigger: {
//     trigger: ".gallery",
//     start: "top bottom",
//     end: "50vh 50vh",
//     scrub: true,
//     ease: "elastic.out(1,0.4)",
//     defaults: { ease: "power1" }
//   }
// });

// scrollGallery.to(".gallery_image", { opacity: 1, duration: 0.5, stagger: { amount: 0.3, from: "random" } })
//   .to(".img_1", { y: "-25%", rotation: -6, x: "-55%" }, "0.4")
//   .to(".img_2", { y: "-120%", rotation: 3, x: "5%" }, "1.2")
//   .to(".img_3", { y: "-210%", rotation: -8, x: "-150%" }, "1.6")
//   .to(".img_4", { y: "-310%", rotation: 3, x: "100%" }, "2")
//   .to(".img_5", { y: "-480%", rotation: 5, x: "60%" }, "2.3")


// ┊͙✧˖*°࿐ FOOTER SPLIT TEXT  ✧˖*°࿐┊͙
let staggerLink;
function runSplit() {
  staggerLink = new SplitType("[stagger-link]", {
    types: "words, chars"
  });
}
runSplit();

// Update on windows resize, checks if the browser changes resolution to run again the function
let windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    staggerLink.revert();
    runSplit();
  }
});

// ✧SETTING AND TIMELINE ANIMATION✧

staggerLinks.forEach((link) => {
  const letters = link.querySelectorAll("[stagger-link-text] .char");
  link.addEventListener("mouseenter", function () {
    gsap.to(letters, {
      yPercent: -130,
      duration: 0.5,
      ease: "power4.inOut",
      stagger: { each: 0.01 },
      overwrite: true
    });

  });
  link.addEventListener("mouseleave", function () {
    gsap.to(letters, {
      yPercent: 0,
      duration: 0.5,
      ease: "power4.inOut",
      stagger: { each: 0.01 }
    });
  });
});