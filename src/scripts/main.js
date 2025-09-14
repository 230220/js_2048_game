'use strict';

import Game from '../modules/Game.class.js';

const game = new Game();

const gameScore = document.querySelector('.game-score');
const gameStatusContainer = document.querySelector('.message-container');
const table = document.querySelector('.game-field');
const rows = table.querySelectorAll('tr');

function updateGameMessage(type) {
  switch (type) {
    case 'start':
      gameStatusContainer.textContent =
        'Press "Start" to begin game. Good luck!';
      gameStatusContainer.classList.remove('hidden');
      break;
    case 'win':
      gameStatusContainer.textContent = 'Winner! Congrats! You did it!';
      gameStatusContainer.classList.remove('hidden');
      break;
    case 'lose':
      gameStatusContainer.textContent = 'You lose! Restart the game?';
      gameStatusContainer.classList.remove('hidden');
      break;
    case 'hide':
    default:
      gameStatusContainer.classList.add('hidden');
      break;
  }
}

function render() {
  const state = game.getState();
  const score = game.getScore();
  const Gamestatus = game.getStatus();

  gameScore.textContent = score;

  for (let i = 0; i < state.length; i++) {
    for (let j = 0; j < state[i].length; j++) {
      const value = state[i][j];
      const cell = rows[i].cells[j];

      cell.textContent = value === 0 ? '' : value;
      cell.className = 'field-cell';

      if (value > 0) {
        cell.classList.add(`field-cell--${value}`);
      }

      if (value >= 2048) {
        cell.classList.add('field-cell--2048');
      }
    }
  }

  if (Gamestatus === 'win') {
    updateGameMessage('win');
  } else if (Gamestatus === 'lose') {
    updateGameMessage('lose');
  } else {
    updateGameMessage('hide');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const buttonStart = document.querySelector('.start');

  buttonStart.addEventListener('click', () => {
    game.start();
    render();

    buttonStart.classList.add('hidden');
  });

  const buttonRestart = document.querySelector('.restart');

  buttonRestart.addEventListener('click', () => {
    game.restart();
    render();
  });
});

document.addEventListener('keydown', (e) => {
  let moved = false;

  if (e.key === 'ArrowLeft') {
    moved = game.moveLeft();
  } else if (e.key === 'ArrowRight') {
    moved = game.moveRight();
  } else if (e.key === 'ArrowUp') {
    moved = game.moveUp();
  } else if (e.key === 'ArrowDown') {
    moved = game.moveDown();
  }

  if (moved) {
    render();
  }
});

updateGameMessage('start');
