const GRID_SIZE = 42;

let PLAYER_TURN = true;

const CONTAINER = document.querySelector(".connect-block");
let GAME_BOARD = [];

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
  box.addEventListener("click", function () {
    const idNum = this.id.substr(4);
    const column = idNum % 7;
    const row = Math.floor(idNum / 7);
    const freePosition = getFreeBoxInColumn(column)
    console.log("freePosition:", freePosition)

    if(PLAYER_TURN) {
      this.classList.add('red');
    } else if(!PLAYER_TURN) {
      this.classList.add('yellow')
    }

    PLAYER_TURN = !PLAYER_TURN
  });
})

function getFreeBoxInColumn(column) {
  const bottomItem = 35 + column;
  console.log('beep boop its running');

  let i = 0;
  while(GAME_BOARD[])
}
