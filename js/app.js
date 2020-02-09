///////////////////// CONSTANTS /////////////////////////////////////
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let startTurn = "X"
let turn = "X";
let win;
let owin = 0;
let xwin = 0;
let condition = "reg";
let ai = false;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const warp = document.getElementById("board");
const message = document.getElementById("Turny");
const winrate = document.getElementById("Wincount");
const ot = document.getElementById("O");
const xt = document.getElementById("X");
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;

document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
ot.onclick = initTurn;
xt.onclick = initTurn;
easy.onclick = aio;
///////////////////// FUNCTIONS /////////////////////////////////////
function init(object){
  board = [
    "","","",
    "","","",
    "","",""
  ];
  turn = startTurn;
  win = null;
  render();
}
function render(){
        board.forEach(function(mark, index){
          //console.log(mark,index);
          squares[index].textContent = mark;
          console.log(mark)
        });
  message.textContent =
  win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
 // console.log(win)
  if(win === "X"){
      xwin++;
  } else if(win === "O"){
      owin++;
  }
  winrate.textContent = " X : " + xwin + " || O : "  + owin;
}
function takeTurn(e){
  if(!win){
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

  if (board[index] === ""){
    board[index] = turn;
    turn = turn === "X" ? "O" : "X";
    win = getWinner();

    render();
  }
}

}
function getWinner(){
    let winner = null;
    winningConditions.forEach(function(condition, index){
      if (
     board[condition[0]] &&
     board[condition[0]] === board[condition[1]] &&
     board[condition[1]] === board[condition[2]]
   ) {
     winner = board[condition[0]];
   }
    })
      return winner ? winner : board.includes("") ? null : "T";
}
function reset(){
    if(condition == "reg"){
        init();
    } else{
        aio();
    }

}
function aio(object){
    ai = true;
    let type = object.target;
    if(type == medium || type == easy || type == hard){
        condition = type;
        alert("Hey, AI will always be O, You will always be X. To turn off vs ai, click Play again");
    } else if(type == "off"){
        condition = "reg";
        alert("AI OFF")
    }
    takeTurn(object);

}
function airender(){
    alert("HI")
    let a;
    if(condition == easy){
        a = easypz();
    } else if(condition == "medium"){
        a = mediumpz();
    } else if(condition == "hard"){
        a = hardpz();
    }
    board.forEach(function(mark, index){
      //console.log(mark,index);
      squares[a].textContent = mark;
      console.log(a)

    });
}
function easypz(){
    let array = [];
    let pos = 0;
    board.forEach(function(mark, index){
        if(squares[index].textContent == ""){
            array[pos] = index;
            pos++;
        }
    })
    let b = pos * Math.random();
    b = Math.floor(b);
    console.log(array[b])
    return array[b];
}
function initTurn(object){
    if(object.target == ot){
        startTurn = "O"
    } else {
        startTurn = "X";
    }
    init();
}
