
gsap.registerPlugin(TextPlugin)
// ┊͙✧˖*°࿐ !!!!   DISABLE SCROLL AND ENABLE AFTER LADING ANIMATION  !!!  ✧˖*°࿐┊͙


// ┊͙✧˖*°࿐ !!!!   LOAD  ANIMATIONS WHILE DOM FROM GSAP   !!!  ✧˖*°࿐┊͙
// wait until DOM is ready
let nav = document.querySelector(".nav");
$(document).ready(function () {
    // OPTIONAL - waits til next tick render to run code (prevents running in the middle of render tick)
    window.requestAnimationFrame(function () {
        nav.style.opacity = 1;
    });
});

let dataTitle = document.getElementById("category").innerText;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia("[pointer: coarse]").matches;


// Code that runs on pageload
gsap.to(".load_grid-pixel", {
    opacity: 0,
    duration: 0.001,
    stagger: { amount: 0.5, from: "random" },
    onComplete: () => {
        gsap.set(".load_grid", { display: "none" });
    }
});

// Code that runs on click of a link
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
    .to(".menu-dropdown", { display: "flex", y: "6rem" })
    .from(".menu-link", {
        y: "2rem", opacity: 0, ease: "power4.inOut",
        stagger: { each: 0.01 }
    }, "<")

const gifContainer = document.getElementById("animicon-container")
const gifElement = document.getElementById("menu-icon")
// console.log(gifElement, gifContainer)
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
    // console.log(currentActionType)
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
        // console.log("click 1")
    }
    else if (currentActionType === "click" && isMenuActive) {
        intervalId = setInterval(frameUpdateLogic, FRAME_RATE, 0, 1)
        isClicked.reverse();
        isMenuActive = false
        // console.log("click 2")
    }
}



// PANNING

const homeSection = document.querySelector("section");

let currentX = 0
let currentY = 0
let aimX = 0
let aimY = 0

const move = function (event) {
    // window width/height
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const worldWidth = homeSection.clientWidth
    const worldHeight = homeSection.clientHeight

    // total pan size
    const panX = worldWidth - windowWidth
    const panY = worldHeight - windowHeight

    // percentage x/y
    const px = event.pageX / windowWidth
    const py = event.pageY / windowHeight

    // how much shift from the center
    aimX = panX * px
    aimY = panY * py
}

const tweenDesktop = function () {
    currentX += (aimX - currentX) * 0.1
    currentY += (aimY - currentY) * 0.1

    homeSection.style.left = (-1 * currentX) + "px"
    homeSection.style.top = (-1 * currentY) + "px"
    requestAnimationFrame(tweenDesktop)
}

// M O B I L E  PANNING
let xActual = 0;
let yActual = 0;
let xFinal = 0;
let yFinal = 0;

let lastXTouchPosition = 0
let lastYTouchPosition = 0

const firstCoords = function (event) {
    lastXTouchPosition = event.touches[0].clientX
    lastYTouchPosition = event.touches[0].clientY
}

const showCoordinates = function (event) {
    const xDragDistance = lastXTouchPosition - event.touches[0].clientX
    const yDragDistance = lastYTouchPosition - event.touches[0].clientY
    lastXTouchPosition = event.touches[0].clientX
    lastYTouchPosition = event.touches[0].clientY

    xFinal = xFinal - xDragDistance;
    yFinal = yFinal - yDragDistance;
}

function tween() {
    if (Math.round(xActual) !== Math.round(xFinal) || Math.round(yActual) !== Math.round(yFinal)) {
        let h = xActual - xFinal;
        let r = yActual - yFinal;
        yActual += r * 0.1 * -1
        xActual += h * 0.1 * -1

        homeSection.style.transform = `translate(${xActual}px, ${yActual}px)`;

    }
    requestAnimationFrame(tween);
}

let xTo = gsap.quickTo(".cursor", "x", { duration: 0.6, ease: "power3" });
let yTo = gsap.quickTo(".cursor", "y", { duration: 0.6, ease: "power3" });

if (isTouchDevice) {
    document.addEventListener('touchstart', firstCoords)
    document.addEventListener('touchmove', showCoordinates)
    tween();
    // xTo(e.touches[0].clientX);
    // yTo(e.touches[0].clientY);

} else {
    document.addEventListener("mousemove", move);
    tweenDesktop();
}




// TITLES
const title = document.querySelector("h1");
const links = document.querySelectorAll("section a");
const body = document.querySelector("body");
//["click", "touchend"].forEach( event =>
//	menuIcon.addEventListener(event, () => {
//  	isClicked.play()
//})
//)

links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
        title.innerText = link.getAttribute("data-title");

        body.classList.add("hovered");
        link.classList.add("hovered");
    });

    link.addEventListener("mouseleave", () => {
        console.log(dataTitle)
        title.innerText = dataTitle;
        body.classList.remove("hovered");
        link.classList.remove("hovered");
    });
});

gsap.set(".cursor", { xPercent: 0, yPercent: 20 });



window.addEventListener("mousemove", (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
});

// TEXT ANIMATION TAGS ON HOVER
//SPLIT TEXT
let undertags = document.querySelectorAll("[data-info]");
undertags.forEach((undertag) => {
    let projectText = undertag.getAttribute("data-info");

    undertag.addEventListener("mouseenter", () => {
        gsap.fromTo(
            ".cursor p",
            {
                text: projectText,
            },
            {
                text: "View project",
                delay: 2,
                duration: 1,
                ease: "power4.out",
            }
        );
    });
    undertag.addEventListener("mouseleave", () => {
        gsap.to(".cursor p", {
            text: projectText,
        });
    });
});



// ┊͙✧˖*°࿐ FOOTER SPLIT TEXT  ✧˖*°࿐┊͙
let staggerLink;
function runSplit() {
    staggerLink = new SplitType("[stagger-link-text]", {
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
