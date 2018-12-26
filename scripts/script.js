const GRID_SIZE = 42;

let PLAYER_TURN = true;

const CONTAINER = document.querySelector(".connect-block");
const PLAYER_INDICATOR = document.querySelector("#player-text");
let GAME_BOARD = [];
let NUM_IN_ROW = 0;

let COLUMN = 0, ROW = 0;
// const BOX = document.getElementsByTagName('box');

const populateGrid = () => {
  let boxTemplate = "";
  for(let i = 0; i < GRID_SIZE; i++) {
    boxTemplate += `<box id="box-${i}"></box>`;
  }
  CONTAINER.innerHTML = boxTemplate;
}
populateGrid();

const populateDataStructure = () => {
  for(let x = 0; x < 6; x++) {
    let tempArray = [0, 0, 0, 0, 0, 0, 0];
    GAME_BOARD.push(tempArray);
  }
}
populateDataStructure();

const BOXES = document.querySelectorAll('box');

BOXES.forEach(box => {
  box.addEventListener("mouseenter", function() {
    const idNum = this.id.substr(4);
    const column  = idNum % 7;
    const freePosition = getFreeBoxInColumn(column);

    let prospectivePiece = document.querySelector(`#box-${(freePosition * 7) + column}`);
    prospectivePiece.classList.add('prospective');
  });

  box.addEventListener("mouseleave", function() {
    const idNum = this.id.substr(4);
    const column  = idNum % 7;
    const freePosition = getFreeBoxInColumn(column);

    let prospectivePiece = document.querySelector(`#box-${(freePosition * 7) + column}`);
    prospectivePiece.classList.remove('prospective');
  });

  box.addEventListener("click", function () {
    const idNum = this.id.substr(4);
    const column = idNum % 7;
    const row = Math.floor(idNum / 7);
    const freePosition = getFreeBoxInColumn(column);

    GAME_BOARD[freePosition][column] = PLAYER_TURN ? 1 : 2;

    let targetPiece = document.querySelector(`#box-${(freePosition * 7) + column}`);
    targetPiece.classList.remove('prospective');
    targetPiece.classList.add((PLAYER_TURN) ? 'red' : 'yellow');
    // checkIfWinner(freePosition, row, (PLAYER_TURN ? 1 : 2));

    switchPlayer();
  });
});

const REFRESH = document.querySelector('.refresh');

REFRESH.addEventListener("click", function() {
  window.location.reload();
})

function switchPlayer() {
  PLAYER_TURN = !PLAYER_TURN;
  PLAYER_INDICATOR.innerHTML = PLAYER_TURN ? 'Player 1' : "Player 2";
}

function getFreeBoxInColumn(column) {
  let i = 0;
  while(GAME_BOARD[i][column] === 0 && i < 5) {
    i++;
  }
  return (GAME_BOARD[i][column] === 0) ? i : (i - 1);
}

// function checkIfWinner(column, row, player) {
//   console.log('checking if winner', column, row, player);
//   NUM_IN_ROW = 0;
//
//   if(NUM_IN_ROW < 4 && column !== 5) {
//     if(GAME_BOARD[row][column + 1] === player) {
//       NUM_IN_ROW++;
//       checkIfWinner((column + 1), row, player);
//       NUM_IN_ROW++;
//     } else if(GAME_BOARD[row][column - 1] === player) {
//       NUM_IN_ROW++;
//       checkIfWinner((column - 1), row, player);
//     } else if(GAME_BOARD[row + 1][column] === player) {
//       NUM_IN_ROW++;
//       checkIfWinner(column, (row + 1), player);
//     } else if(GAME_BOARD[row - 1][column] === player) {
//       NUM_IN_ROW++;
//       checkIfWinner(column, (row - 1), player);
//     } else if(GAME_BOARD[row + 1][column + 1] === player) {
//       NUM_IN_ROW++;
//       checkIfWinner((column + 1), (row + 1), player);
//     } else if(GAME_BOARD[row - 1][column - 1] === player) {
//       NUM_IN_ROW++;
//       checkIfWinner((column - 1), (row - 1), player);
//     } else if(GAME_BOARD[row + 1][column - 1] === player) {
//       NUM_IN_ROW++;
//       checkIfWinner((column - 1), (row + 1), player);
//     } else if(GAME_BOARD[row - 1][column + 1] === player) {
//       NUM_IN_ROW++;
//       checkIfWinner((column + 1), (row - 1), player);
//     }
//   } else if(NUM_IN_ROW === 4) {
//     console.log("player ", player, " has won!");
//   }
// }
