window.addEventListener('DOMContentLoaded', () => {
  console.log('dom loaded');

  //memoria
  const numsMemory = [];

  //referenze dom
  const board = document.getElementById('board');
  const fireBtn = document.getElementById('fireBtn');

  //functions
  const spitRandomNum = (e) => {
    while (true) {
      let randomNum = Math.floor(Math.random() * 76) + 1;
      if (!numsMemory.includes(randomNum)) {
        numsMemory.push(randomNum);
        break;
      }
    }

    //check for uniqueness
    const sorted = [...numsMemory].sort((a, b) => a - b);
    console.log(sorted);
  };

  //listeners
  fireBtn.addEventListener('click', spitRandomNum);

  //genero le celle
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
