const config = {
  width: 160,
  height: 144,
  renderer: Phaser.AUTO,
  antialias: false,
  multiTexture: true,
  parent: ".game-div"
};

const game = new Phaser.Game(config);

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('title', titleState);
game.state.add('main', playState);

game.state.start('boot');
