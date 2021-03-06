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
    if (!checkForWinningBoards()) {
      const userBoardsNum = document.getElementById('userBoardsNum').value;
      if (!userBoardsNum) userBoardsBtn.click();
      while (true) {
        let randomNum = Math.floor(Math.random() * 76) + 1;
        if (!numsMemory.includes(randomNum)) {
          numsMemory.push(randomNum);
          break;
        }
      }
      /* Do while alternativo 
      do {
      const randomNum = Math.floor(Math.random() * 76) + 1;
      } while (numsMemory.includes(randomNum))
      numsMemory.push(randomNum)
      */
      highlightBoardNum();
    } else {
      const notificationDom = document.querySelector('.notification');
      console.log(notificationDom);
      if (!notificationDom) {
        notification('you won!', 'green');
      }
    }

    //check for uniqueness
    /* const sorted = [...numsMemory].sort((a, b) => a - b);
    console.log(sorted); */

    //chiama funzione per evidenziare
    checkForWinningBoards();
    if (checkForWinningBoards()) {
    }
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
        cell.classList.add('user-cell');
        num.classList.add('number', 'user-number');
        userBoard.appendChild(cell);
      }
      userBoard.classList.add('user-board', `board-${i + 1}`);
      userBoardsDOM.appendChild(userBoard);
    }
  };

  //check for win
  const checkForWinningBoards = () => {
    console.log(numsMemory);
    //prendo numeri delluser
    const userBoards = document.querySelectorAll('.user-board');

    for (const board of userBoards) {
      const h3sNums = board.querySelectorAll('.user-number');
      const nums = Array.from(h3sNums).map((h3) => parseInt(h3.innerText));
      console.log(nums);

      const sum = nums.reduce((acc, cv) => {
        if (numsMemory.includes(cv)) return (acc += 1);
        return acc;
      }, 0);
      console.log(sum);
      if (sum >= 5) {
        board.classList.add('winning-board');
        return true;
      }
    }
  };

  //generate notifications
  const notification = (message, color) => {
    const html = `
      <span class='notification notification-${color} hide'>${message}</span>`;
    document.querySelector('h1').insertAdjacentHTML('afterend', html);
    setTimeout(() => {
      console.log(document.querySelector('.notification'));
      document.querySelector('.notification').classList.remove('hide');
    }, 1000);
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
