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
            patternClicked = [];
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
        if (playSimonSays) checkSimon();
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
        if (playSimonSays) checkSimon();
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
        if (playSimonSays) checkSimon();
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
        if (playSimonSays) checkSimon();
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

// variables and functions for bettingCalculator
function createBettingCalculator() {
    const betOdd = document.querySelector("#betOdd");
    const impliedOdd = document.querySelector("#impliedOdds");
    const usersEdge = document.querySelector("#usersEdge");
    let bettingOdd, impliedProbability;
    betOdd.addEventListener("keyup", () => {
        bettingOdd = parseInt(betOdd.value);
        // calculate odds
        if (bettingOdd > 0) {
            impliedProbability = (100/(bettingOdd + 100)*100).toFixed(2);
        }
        else if (bettingOdd < 0) {
            bettingOdd = -bettingOdd;
            impliedProbability = (bettingOdd/(bettingOdd + 100)*100).toFixed(2);
        }
        impliedOdd.value = impliedProbability + "%";
        usersEdge.value = `You need your bet to cash more than ${impliedProbability}% to profit`;
        if (betOdd.value == "") {
            impliedOdd.value = "";
            usersEdge.value = "";
        }
    });
}

// variables and function to clear the calculator
function clearCalculator(){
    const clearCalcButton = document.querySelector("#clearCalcButton");
    const calcInputs = document.querySelectorAll(".calcInput");
    clearCalcButton.addEventListener("click", () => {
        for (let input of calcInputs) {
            input.value = "";
        }
    });
}

// function to activate the buttons on the graph 
function activeGraphButtons() {
    const addDatasetLabel = document.querySelector("#addDatasetLabel");
    const parentRow = document.querySelector("#parentRow");               
    addDatasetLabel.addEventListener("click", () =>{
        const datasetLabels = document.querySelectorAll(".datasetLabelClass");
        const datasetLabel = datasetLabels[0].value;
        if (datasetLabel){
            addGraphRow(parentRow, "datasetLabelClass", datasetLabels);
        }
        else {
            alert ("Please add a value");
        }
        activateDeleteLabelButton();
    });
}

// function to delete graph row
function activateDeleteLabelButton () {
    const deleteDataSetLabelButton = document.querySelectorAll(".deleteLabelButton");
    const newGraphRows = document.querySelectorAll(".newGraphRow");
    for (let i = 0;i < deleteDataSetLabelButton.length; i++) {
        deleteDataSetLabelButton[i].addEventListener("click", () => {
            newGraphRows[i].remove();
        });
    }
}

// function to add graph data
function addGraphData() {
    const addGraphDataButton = document.querySelector("#addGraphDataButton"); 
    const xParentRow = document.querySelector("#xParentRow");
    const yParentRow = document.querySelector("#yParentRow");
    addGraphDataButton.addEventListener("click", () => {
        const xDataLabels = document.querySelectorAll(".xDataLabel");
        const yDataset = document.querySelectorAll(".yDataset");
        const xDataLabel = xDataLabels[0].value;
        const yData = yDataset[0].value;
        if (xDataLabel && yData) {
            console.log("add inputs to add data");
            addGraphRow(xParentRow, "xDataLabel", xDataLabels);
            addGraphRow(yParentRow, "yDataset", yDataset);
        }
        else {
            alert("Please add an X and Y value");
        }
    });
}

// function to add rows to form of graph maker
function addGraphRow(parent, rowClass, datavalue) {
    const div = document.createElement("div");
    const input = document.createElement("input");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "-";
    div.className = "formRow newGraphRow";
    input.className = `formInput ${rowClass}`;
    input.value = datavalue[0].value;
    deleteButton.className = "deleteLabelButton"
    div.appendChild(input);
    div.appendChild(deleteButton);
    parent.appendChild(div);
    datavalue[0].value = "";
}

// function to get the graph url and put it in the pic div/container
function getGraph() {
    const getGraphButton = document.querySelector("#getGraphButton");
    const picContainer = document.querySelector("#picContainer");
    getGraphButton.addEventListener("click", async () => {
        // get all the data from the graph from after user clicks on button
        const chartType = document.querySelector("#chartType");
        const datasetLabels = document.querySelectorAll(".datasetLabelClass");
        const dataLabels = document.querySelectorAll(".xDataLabel");
        const datasetData = document.querySelectorAll(".yDataset");
        const browserWidth  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let graphWidth = 480;                                                    // width of image/graph
        let graphHeight = 288;                                                   // height of image/graph
        if ( browserWidth < 690 ) {
            graphWidth = browserWidth * 0.65;                                    // adjust to the width of the browser
            graphHeight = graphWidth * 0.6;                                      // height is 3/5 of the width
        }
        let chartTypeValue = chartType.value;
        // seperate the data labels with "'"
        let datasetDataValue = ``;
        for (let i = 0; i < datasetData.length; i++) {
            datasetDataValue += `'${datasetData[i].value}'`;
            if ( i + 1 < datasetData.length) {
                datasetDataValue += `, `;
            }
        }
        // seperate the data labels with "'" 
        let dataLabelsValue = ``;
        for (let i = 0; i < dataLabels.length; i++) {
            dataLabelsValue += `'${dataLabels[i].value}'`;
            if (i + 1 < dataLabels.length) {
                dataLabelsValue += `, `;
            }
        }
        let graphUrl = `<img src="https://quickchart.io/chart?chart={type: '${chartTypeValue}', data: {labels: [${dataLabelsValue}], datasets: [`;
        for (let i = 0; i < datasetLabels.length; i++) {
            graphUrl += `{label: '${datasetLabels[i].value}',data: [${datasetDataValue}]}`;
            if (i + 1 < datasetLabels.length) {
                graphUrl += `,`;
            }
        }
        graphUrl += `]}}&backgroundColor=whitesmoke&width=${graphWidth}&height=${graphHeight}&devicePixelRatio=1.0&format=png&version=2.9.3" alt=""></img>`;
        console.log(graphUrl);
        //console.log(`https://quickchart.io/chart?chart={type: 'bar', data: {labels: ['Q1', 'Q2', 'Q3', 'Q4'], datasets: [{label: 'Revenue',data: [100, 200, 300, 400]}, {label: 'Tax',data: [10, 20, 30, 40]}]}}&backgroundColor=white&width=500&height=300&devicePixelRatio=1.0&format=png&version=2.9.3`);
        picContainer.innerHTML = graphUrl;
    });
}

function randomNumber(max) {
    return Math.floor(Math.random() * max) + 1  
}

activateProjects();
startSimonSays();
createSimonSays();
createBettingCalculator();
clearCalculator();
activeGraphButtons();
addGraphData();
getGraph();