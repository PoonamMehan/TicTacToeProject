let heading = document.querySelector("h1");
let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let drawMsgContainer = document.querySelector(".draw-msg-container");
let drawNewBtn = document.querySelector(".draw-new-btn");
let mainContainer = document.querySelector(".container");
let choosingContainer = document.querySelector(".container1");


let opt1 = document.querySelector("#symb1");
let opt2 = document.querySelector("#symb2");


let turnO = true;
let clicks = 0;

let symbs = document.querySelectorAll(".symbols");


//event listener to choose the symbol 
symbs.forEach((symbol) => {
    symbol.addEventListener("click", () => {
       
        if(symbol.innerText === "O"){
            turnO = true;
        }else{
            turnO = false;
        }
            choosingContainer.style.display = "none";
            mainContainer.style.display = "flex";
        
            resetButton.style.display = "inline-block";
            heading.style.display = "inline";
        })
})

//Winning patterns
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

//Add event listener on each box to take in the user input of symbol O or X
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("Box was clicked.");
        clicks = clicks+1;

        if(turnO){
            box.innerText = "O";
            turnO=false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        
        box.disabled=true;

        checkWinner();
    })
});

//function to check if the there is any winner after taking in input everytime
const checkWinner = () => {
    let isWin = false;
    for(let pattern of winPatterns){
        // console.log("Pattern checked!");
        let valPos1 = boxes[pattern[0]].innerText;
        let valPos2 = boxes[pattern[1]].innerText;
        let valPos3 = boxes[pattern[2]].innerText;
        if(valPos1 !="" && valPos2!="" && valPos3!=""){
            if(valPos1==valPos2 && valPos2==valPos3){
                msg.innerText = `${valPos1} is the winner!`;
                disableBoxes();
                msgContainer.classList.remove("hide");
                isWin = true;
                mainContainer.style.display = "none";
                resetButton.style.display = "none";
                heading.style.display = "none";
            }
        }
    }
    if(isWin == false && clicks==9){
        drawMsgContainer.classList.remove("hide");
        mainContainer.style.display = "none";
        resetButton.style.display = "none";
        heading.style.display = "none";
    }
}

//function to disable all the boxes once the winner is declared
const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    })
}

//code to implement draw button
drawNewBtn.addEventListener("click", ()=>{
    drawMsgContainer.classList.add("hide");
    turnO = true;
    for(let box of boxes){
        box.innerText="";
        box.disabled = false;
    }
    clicks=0;
    mainContainer.style.display = "none";
        resetButton.style.display = "none";
        heading.style.display = "inline";
    choosingContainer.style.display = "flex";
})

//code to implement new game button
newGameBtn.addEventListener("click", ()=>{
    msgContainer.classList.add("hide");
    
    turnO = true;
    for(let box of boxes){
        box.innerText="";
        box.disabled = false;
    }
    clicks=0;
    choosingContainer.style.display = "flex";
    mainContainer.style.display = "none";
    resetButton.style.display = "none";
    heading.style.display = "inline";
})

//code to implement reset button
resetButton.addEventListener("click", ()=>{
    for(let box of boxes){
        box.innerText="";
        box.disabled = false;
        clicks=0;
    }
    turnO = "true";
    choosingContainer.style.display = "flex";
    mainContainer.style.display = "none";
    resetButton.style.display = "none";
    heading.style.display = "inline";
})