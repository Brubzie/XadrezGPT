const board = document.getElementById("board");
let selectedCell = null;
let isWhiteTurn = true; // Variável para controlar de quem é a vez

function createChessboard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add((row + col) % 2 === 0 ? "white" : "black");
      cell.dataset.row = row;
      cell.dataset.col = col;

      cell.addEventListener("click", () => handlePieceClick(row, col));

      board.appendChild(cell);
    }
  }

  for (let col = 0; col < 8; col++) {
    document.querySelector(`[data-row="1"][data-col="${col}"]`).addEventListener("click", () => handlePieceClick(1, col));
  }

  createInitialPieces();
}

function handlePieceClick(row, col) {
  const clickedCell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

  if (!isWhiteTurn) {
    return; // Não permitir que as peças pretas se movam no início
  }

  if (selectedCell) {
    if (selectedCell === clickedCell) {
      selectedCell.classList.remove("selected");
      selectedCell = null;
    } else {
      movePiece(selectedCell, clickedCell);
      selectedCell.classList.remove("selected");
      selectedCell = null;
      isWhiteTurn = !isWhiteTurn; // Alternar a vez para as peças pretas
      updatePieceClickEvents(); // Atualizar eventos de click das peças
    }
  } else {
    selectedCell = clickedCell;
    selectedCell.classList.add("selected");
  }
}

function updatePieceClickEvents() {
  const whitePieces = document.querySelectorAll(".piece");
  for (const piece of whitePieces) {
    piece.parentElement.removeEventListener("click", handlePieceClick);
  }

  const row = isWhiteTurn ? 1 : 6;
  for (let col = 0; col < 8; col++) {
    document.querySelector(`[data-row="${row}"][data-col="${col}"]`).addEventListener("click", () => handlePieceClick(row, col));
  }
}

function createPiece(piece, row, col) {
  const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  const pieceElement = document.createElement("div");
  pieceElement.classList.add("piece");
  pieceElement.textContent = piece;
  cell.appendChild(pieceElement);
}

function createInitialPieces() {
  for (let col = 0; col < 8; col++) {
    createPiece("♙", 1, col); // Peões brancos
    createPiece("♟", 6, col); // Peões pretos
  }

  createPiece("♖", 0, 0); // Torres brancas
  createPiece("♖", 0, 7);
  createPiece("♜", 7, 0); // Torres pretas
  createPiece("♜", 7, 7);

  createPiece("♘", 0, 1); // Cavalos brancos
  createPiece("♘", 0, 6);
  createPiece("♞", 7, 1); // Cavalos pretos
  createPiece("♞", 7, 6);

  createPiece("♗", 0, 2); // Bispos brancos
  createPiece("♗", 0, 5);
  createPiece("♝", 7, 2); // Bispos pretos
  createPiece("♝", 7, 5);

  createPiece("♕", 0, 3); // Rainha branca
  createPiece("♛", 7, 3); // Rainha preta

  createPiece("♔", 0, 4); // Rei branco
  createPiece("♚", 7, 4); // Rei preto
}

createChessboard();
