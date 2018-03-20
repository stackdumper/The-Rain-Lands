import { observable } from 'mobx';

module.exports = window.constants = observable({
  GAME_ROOT: document.querySelector('#root'),
  USER_SPEED: 0.15,
  CHUNK_SIZE: 16,
  RENDER_DISTANCE: 2,
  UNRENDER_OFFSET: 3,
  RENDER_TIMEOUT: 100,
  UNRENDER_TIMEOUT: 14,
})
