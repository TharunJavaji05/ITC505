const size = 5;
const board = [];
const boardElement = document.getElementById("gameBoard");

function createBoard() {
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.classList.add("light");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", () => toggle(i, j, true));
      boardElement.appendChild(cell);
      board[i][j] = cell;
    }
  }
}

function toggle(i, j, checkWinAfter = false) {
  const positions = [
    [i, j],
    [i - 1, j],
    [i + 1, j],
    [i, j - 1],
    [i, j + 1],
  ];
  positions.forEach(([x, y]) => {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      board[x][y].classList.toggle("is-off");
    }
  });
  if (checkWinAfter) checkWin();
}

function scrambleBoard() {
  for (let k = 0; k < 20; k++) {
    const i = Math.floor(Math.random() * size);
    const j = Math.floor(Math.random() * size);
    toggle(i, j, false);
  }
}

function checkWin() {
  const allOff = board.flat().every(cell => cell.classList.contains("is-off"));
  if (allOff) {
    setTimeout(() => alert("You win!"), 100);
  }
}

createBoard();
scrambleBoard();
