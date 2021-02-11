window.addEventListener('DOMContentLoaded', () => {
  console.log('dom loaded');

  //memoria

  //referenze dom
  const board = document.getElementById('board');
  const fireBtn = document.getElementById('fireBtn');

  //functions
  const spitRandomNum = (e) => {
    console.log('ifire');
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
