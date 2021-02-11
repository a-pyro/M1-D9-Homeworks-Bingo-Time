window.addEventListener('DOMContentLoaded', () => {
  console.log('dom loaded');

  //memoria
  const numsMemory = [];
  const userBoardsMemory = [];

  //referenze dom
  const board = document.getElementById('board');
  const fireBtn = document.getElementById('fireBtn');
  const userBoardsBtn = document.getElementById('userBoardsBtn');

  //functions
  const spitRandomNum = () => {
    while (true) {
      let randomNum = Math.floor(Math.random() * 76) + 1;
      if (!numsMemory.includes(randomNum)) {
        numsMemory.push(randomNum);
        break;
      }
    }
    //check for uniqueness
    /* const sorted = [...numsMemory].sort((a, b) => a - b);
    console.log(sorted); */

    //chiama funzione per evidenziare
    highlightBoardNum();
  };

  const saveBoardInMemory = () => {
    const board = [];
    while (board.length < 24) {
      let randomNum = Math.floor(Math.random() * 24) + 1;
      if (!board.includes(randomNum)) {
        board.push(randomNum);
      }
    }
    userBoardsMemory.push(board);
    console.log(userBoardsMemory);
  };

  //mi serve una funzione che guarda all'ultimo elemento nell'array e mi attacca la classe al corrispettivo numero nella board
  function highlightBoardNum() {
    const lastNumberOut = numsMemory[numsMemory.length - 1];
    const numbers = document.querySelectorAll('.number');
    numbers.forEach((number) => {
      const value = parseInt(number.innerText);
      if (lastNumberOut === value) number.classList.add('num-out');
    });
  }
  const generateUserBoards = () => {
    const userBoardsDOM = document.getElementById('userBoardsDOM');
    console.log('ifire');
    //vogliamo generare user boards, solo se non ci sono già user boards
    if (userBoardsMemory.length > 0) return; //already playing

    //se non sceglie niente il default è 1
    const userBoardsNum =
      parseInt(document.getElementById('userBoardsNum').value) || 1;

    for (let i = 0; i < userBoardsNum; i++) {
      const userBoard = document.createElement('div');

      saveBoardInMemory(); //genero board con 24 numeri random

      //dentro la board, genero 24 numeri => celle
      for (let j = 0; j < 24; j++) {
        const cell = document.createElement('div');
        const num = document.createElement('h3');
        num.innerText = userBoardsMemory[i][j]; //prendo il primo num della board in memoria e lo assegno alla board sulla UI
        cell.appendChild(num);
        cell.classList.add('cell');
        num.classList.add('number', 'user-number');
        userBoard.appendChild(cell);
      }
      userBoard.classList.add('user-board');
      userBoardsDOM.appendChild(userBoard);
    }
  };

  //listeners
  fireBtn.addEventListener('click', spitRandomNum);
  userBoardsBtn.addEventListener('click', generateUserBoards);

  //genero le celle della motherBoard
  for (let i = 0; i < 76; i++) {
    const cell = document.createElement('div');
    const num = document.createElement('h3');
    num.innerText = i + 1;
    cell.appendChild(num);
    cell.classList.add('cell');
    num.classList.add('number');
    board.insertBefore(cell, fireBtn);
  }
});
