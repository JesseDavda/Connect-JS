const GRID_SIZE = 42;
const CONTAINER = document.querySelector(".connect-block");
const PLAYER_INDICATOR = document.querySelector("#player-text");

let PLAYER_TURN = true;
let GAME_BOARD = [];
let NUM_IN_ROW = 0;
let COUNT = 0;
let COLUMN = 0;
let ROW = 0;

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
    const freePosition = getFreeBoxInColumn(column);

    GAME_BOARD[freePosition][column] = PLAYER_TURN ? 1 : 2;

    let targetPiece = document.querySelector(`#box-${(freePosition * 7) + column}`);
    targetPiece.classList.remove('prospective');
    targetPiece.classList.add((PLAYER_TURN) ? 'red' : 'yellow');
    
    const WIN_MODAL = document.querySelector('.win-modal-container');
    const WINNING_TEXT = document.querySelector('.win-modal-text');
    const WINNING_CHIP = document.querySelector('.win-modal-chip');

    let tempPlayerTurn = PLAYER_TURN;

    switchPlayer();
    
    if(checkIfWinner((tempPlayerTurn ? 1 : 2)).won) {
      WINNING_TEXT.innerHTML = (tempPlayerTurn ? "Player 1 (Red) Wins!" : "Player 2 (Yellow) Wins!");
      WINNING_CHIP.classList.add(tempPlayerTurn ? "red" : "yellow");
      WIN_MODAL.classList.add('show-flex');
    }
  });
});

const REFRESH = document.querySelector('.refresh');

REFRESH.addEventListener("click", function() {
  window.location.reload();
});

const WIN_REFRESH = document.querySelector('.win-modal-refresh-button');

WIN_REFRESH.addEventListener("click", function() {
  window.location.reload();
});

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

function checkIfWinner(player) {
  const winObj = {
    won: false,
    player: 0
  }

  //Check horizontally if there is a winner;
  for(let i = 0; i < 6; i++) {
    for(let j = 0; j < 7; j++) {
      if(GAME_BOARD[i][j] === player) {
        count++;
        if(count >= 4) { 
          console.log('There has been a horizontal win for player: ', player);
          winObj.won = true;
          winObj.player = player;
          return winObj;
        }
      } else {
        count = 0;
      }
    }
  }

  //Check vertically if there is a winner 
  for(let i = 0; i < 7; i++) {
    for(let j = 0; j < 6; j++) {
      if(GAME_BOARD[j][i] === player) {
        count++;
        if(count >= 4) {
          console.log('There has been a vertical win for player: ', player);
          winObj.won = true;
          winObj.player = player;
          return winObj;
        }
      } else {
        count = 0;
      }
    }
  }

  var row, col;

  //Check diagonally from top left to bottom right (bottom half of board - the last three rows) for winner
  for(let r = 0; r < 3; r++) {
    for(row = r, col = 0; row < 6 && col < 7; row++, col++) {
      if(GAME_BOARD[row][col] === player) {
        count++;
        if(count >= 4) {
          console.log('There has been a diagonal win for player: ', player);
          winObj.won = true;
          winObj.player = player;
          return winObj;
        }
      } else {
        count = 0;
      }
    }
  }

  // Check diagonally from top left to bottom right (top half of board - the last three rows) for winner
  for(let c = 0; c < 4; c++) {
    for(row = 0, col = c; row < 6 && col < 7; row++, col++) {
      if(GAME_BOARD[row][col] === player) {
        count++;
        if(count >= 4) {
          console.log('There has been a diagnoal win for player: ', player);
          winObj.won = true;
          winObj.player = player;
          return winObj;
        }
      } else {
        count = 0;
      }
    }
  }

  //check top left half for diagonals from bottom left to top right
  for(let r = 5; r >= 3; r--) {
    for(row = r, col = 0; row >= 0 && col <= 6; row--, col++) {
      if(GAME_BOARD[row][col] === player) {
        count++;
        if(count >= 4) {
          console.log('There has been a diagonal win for player: ', player);
          winObj.won = true;
          winObj.player = player;
          return winObj;
        }
      } else {
        count = 0;
      }
    }
  }

  //check diagonally from top right to middle left for winner
  for(let c = 0; c < 4; c++) {
    for(row = 5, col = c; row >= 0 && col <= 6; row--, col++) {
      if(GAME_BOARD[row][col] === player) {
        count++;
        if(count >= 4) {
          console.log('There has been a diagonal win for player: ', player);
          winObj.won = true;
          winObj.player = player;
          return winObj;
        }
      } else {
        count = 0;
      }
    }
  }
}
