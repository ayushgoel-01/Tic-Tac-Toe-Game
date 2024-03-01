let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let cnt = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = ()=>{
    turnO = true;
    cnt = 0;
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
    msgContainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
         cnt++;
         console.log(cnt);
         if(turnO){
            box.innerText = "O";
            turnO = false;
         }
         else{
            box.innerText = "X";
            turnO = true;
         }
         box.disabled = true;       // to disable the button after 1st click

         checkWinner();
    });
});

const showWinner = (winner)=>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");

    for(let box of boxes){
        box.disabled = true;
    }
}

const drawGame = ()=>{
    msg.innerText = "Oops! the game is Draw."
    msgContainer.classList.remove("hide");
}

const checkWinner = ()=>{
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val == pos2val && pos2val == pos3val){
                showWinner(pos1val);
            }
            else if(cnt == 9){
                drawGame();
            }
        } 
    }
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);