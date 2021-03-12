// check if mobile
let mobile = false;
if( /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    mobile = true;
}

// global delay function
const BRIGHT_DELAY = ms => new Promise(res => setTimeout(res, ms));

// global variables for simon says
let playSimonSays = false;
let patternRequested = [];
let patternClicked = [];
let simonSaysCount = 0;
let simonClickCount = 0;

// make project active on navbar
function activateProjects() {
    const homeNavLi = document.getElementById("homeNavLi");
    const projectNavLi = document.getElementById("projectsNavLi"); 
    homeNavLi.classList.toggle("activeLi");
    projectNavLi.classList.toggle("activeLi");
}

function startSimonSays() {
    const startButton = document.querySelector("#startSimonsays"); 
    const simonSaysLabel = document.querySelector("#simonSaysLabel");
    startButton.addEventListener("click", () => {
        if (!playSimonSays) {
            playSimonSays = true;
            console.log("start simon says");
            startButton.innerHTML = "STOP";
            simonSaysLabel.innerHTML = "PLAYING SIMON SAYS"
            startSimonLoop();
        }
        else {
            playSimonSays = false;
            patternClicked = [];
            patternRequested = [];
            simonClickCount = 0;
            simonSaysCount = 0;
            console.log("stop simon says");
            startButton.innerHTML = "START";
            simonSaysLabel.innerHTML = "STOPPED SIMON SAYS";
        }
    });
}

function createSimonSays() {
    const BRIGHT_DELAY_AMOUNT = 500;                               // delay for how long to leave light bright
    const chant = new Audio("/js/sounds/chant.wav");
    const clap = new Audio("/js/sounds/clap.wav");
    const kick = new Audio("/js/sounds/kick.wav");
    const snare = new Audio("/js/sounds/snare.wav");
    const circleQ1 = document.querySelector("#circleQ1");   // circleQ1 , yellow circle quadrant 1
    circleQ1.addEventListener("click", () => {
        // yellowClicked = true;
        let playChant = chant.cloneNode();
        if (!mobile) playChant.play();
        patternClicked.push(1);
        circleQ1.classList.toggle("active");
        // console.log("yellow clicked, value 1 pushed");
        console.log("checking with Simon", patternClicked);
        setTimeout( () => {
            circleQ1.classList.toggle("active");
        }, BRIGHT_DELAY_AMOUNT);
        checkSimon();
    });
    const circleQ2 = document.querySelector("#circleQ2");   // circleQ2 , blue circle quadrant 2
    circleQ2.addEventListener("click", () => {
        // blueClicked = true;
        let playClap = clap.cloneNode();
        if (!mobile) playClap.play();
        patternClicked.push(2);
        circleQ2.classList.toggle("active");
        // console.log("blue clicked, value 2 pushed");
        console.log("checking with Simon", patternClicked);
        setTimeout( () => {
            circleQ2.classList.toggle("active");
        }, BRIGHT_DELAY_AMOUNT);
        checkSimon();
    });
    const circleQ3 = document.querySelector("#circleQ3");   // circleQ3 , red circle quadrant 3
    circleQ3.addEventListener("click", () => {
        // redClicked = true;
        let playKick = kick.cloneNode();
        if (!mobile) playKick.play();
        patternClicked.push(3);
        circleQ3.classList.toggle("active");
        // console.log("red clicked, value 3 pushed");
        console.log("checking with Simon", patternClicked);
        setTimeout( () => {
            circleQ3.classList.toggle("active");
        }, BRIGHT_DELAY_AMOUNT);
        checkSimon();
    });
    const circleQ4 = document.querySelector("#circleQ4");   // circleQ4 , green circle quadrant 4
    circleQ4.addEventListener("click", () => {
        // greenClicked = true;
        let playSnare = snare.cloneNode();
        if (!mobile) playSnare.play();
        patternClicked.push(4);
        circleQ4.classList.toggle("active");
        // console.log("green clicked, value 4 pushed");
        console.log("checking with Simon", patternClicked);
        setTimeout( () => {
            circleQ4.classList.toggle("active");
        }, BRIGHT_DELAY_AMOUNT);
        checkSimon();
    });
}

function startSimonLoop() {
    // get a random number 1 - 4 and push to array then make color light up
    const CIRCLE_COUNT = 4;
    let num = randomNumber(CIRCLE_COUNT);
    patternRequested.push(num);
    console.log(num);
    showSimonArray();
}

async function showSimonArray() {
    simonClickCount = 0;
    const BRIGHT_DELAY_AMOUNT = 500;                          // delay to leave light bright
    const chant = new Audio("/js/sounds/chant.wav");
    const clap = new Audio("/js/sounds/clap.wav");
    const kick = new Audio("/js/sounds/kick.wav");
    const snare = new Audio("/js/sounds/snare.wav");
    const circleQ1 = document.querySelector("#circleQ1");
    const circleQ2 = document.querySelector("#circleQ2");
    const circleQ3 = document.querySelector("#circleQ3");
    const circleQ4 = document.querySelector("#circleQ4");
    for (let num of patternRequested) {
        console.log("Showing Simon value: " + num);
        if (playSimonSays) {
            switch (num) {
                case 1:
                    let playChant = chant.cloneNode();
                    circleQ1.classList.toggle("active");
                    if (!mobile) playChant.play();
                    await BRIGHT_DELAY(BRIGHT_DELAY_AMOUNT);
                    circleQ1.classList.toggle("active");
                    chant.pause();
                    break;
                case 2:
                    let playClap = clap.cloneNode();
                    circleQ2.classList.toggle("active");
                    if (!mobile) playClap.play();
                    await BRIGHT_DELAY(BRIGHT_DELAY_AMOUNT);
                    circleQ2.classList.toggle("active");
                    clap.pause();
                    break;
                case 3: 
                    let playKick = kick.cloneNode();
                    circleQ3.classList.toggle("active");
                    if (!mobile) playKick.play();
                    await BRIGHT_DELAY(BRIGHT_DELAY_AMOUNT);
                    circleQ3.classList.toggle("active");
                    kick.pause();
                    break;
                case 4: 
                    let playSnare = snare.cloneNode();
                    circleQ4.classList.toggle("active");
                    if (!mobile) playSnare.play();  
                    await BRIGHT_DELAY(BRIGHT_DELAY_AMOUNT);
                    circleQ4.classList.toggle("active");
                    snare.pause();
                    break;
            }
        }
        await BRIGHT_DELAY(BRIGHT_DELAY_AMOUNT);
    }
}

async function checkSimon() {
    const BRIGHT_DELAY_AMOUNT = 1000;                          // delay to leave light bright
    const startButton = document.querySelector("#startSimonsays");
    const simonSaysLabel = document.querySelector("#simonSaysLabel");
    let wrong = false;
    if (patternRequested[simonClickCount] == patternClicked[simonClickCount]) {
        // console.log("Pattern clicked: " + patternClicked[simonClickCount]);
        // console.log("Pattern requested: " + patternRequested[simonClickCount]);
        console.log("right");
    }
    else {
        console.log("Pattern clicked: " + patternClicked[simonClickCount]);
        console.log("Pattern requested: " + patternRequested[simonClickCount]);
        console.log("wrong");
        wrong = true;
    }
    simonClickCount++;
    if (wrong) {
        // get another number
        // end the game
        playSimonSays = false;
        patternClicked = [];
        patternRequested = [];
        simonClickCount = 0;
        simonSaysCount = 0;
        startButton.innerHTML = "START";
        simonSaysLabel.innerHTML = "YOU LOST, CLICK START TO PLAY AGAIN"
    }
    else if (patternRequested.length == patternClicked.length) {
        simonSaysCount++;
        console.log("PATTERN CORRECT! INCREASING THE LOOP COUNT", simonSaysCount);
        patternClicked = [];
        await BRIGHT_DELAY(BRIGHT_DELAY_AMOUNT);
        startSimonLoop();
    }
}

function randomNumber(max) {
    return Math.floor(Math.random() * max) + 1  
}

activateProjects();
startSimonSays();
createSimonSays();