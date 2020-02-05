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
let turn;
let win;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const warp = document.getElementById("board");
const message = document.querySelector("h2");
const start = document.getElementById("start");
///////////////////// EVENT LISTENERS ///////////////////////////////
//window.onload = init; this is orginal
window.onload = starting;
start.onclick = starty
//document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
///////////////////// FUNCTIONS /////////////////////////////////////
function starting(){
  let button = document.createElement("button");
  button.innerHTML = "START";
  let text = document.createElement("h2");
  text.innerHTML = "SCORE";
  start.prepend(text);
  start.append(button);
}
function starty(object){
    thingy = object.target
  console.log(thingy.type)
  if (thingy.type == "submit"){
      draw();
  }
}
function draw(){
    start.remove();
    for(let i = 0; i < 9; i++){
         let text = document.createElement("div");
         text.className = "Squares"

        //s.class = "square";
        warp.prepend(text);
    }

}
function init(){
  board = [
    "","","",
    "","","",
    "","",""
  ];
  turn = "X"
  win = null;
  render();
}
function render(){
  board.forEach(function(mark, index){
    console.log(mark,index);
    squares[index].textContent = mark;
  });
  message.textContent =
  win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
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
