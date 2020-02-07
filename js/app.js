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
let turn = "X";
let win;
let owin = 0;
let xwin = 0;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const warp = document.getElementById("board");
const message = document.getElementById("Turny");
const winrate = document.getElementById("Wincount");
const ot = document.getElementById("O");
const xt = document.getElementById("X");
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;

document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("O").onclick = init;
document.getElementById("X").onclick = init;
///////////////////// FUNCTIONS /////////////////////////////////////
function init(object){
  board = [
    "","","",
    "","","",
    "","",""
  ];
  console.log(object.target)
  if(object.target == ot){
      turn = "O"
  } else{
      turn = "X"
  }

  win = null;
  render();
}
function render(){
  board.forEach(function(mark, index){
    //console.log(mark,index);
    squares[index].textContent = mark;
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
