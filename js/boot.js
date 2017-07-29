const bootState = {
  create: function () {
    game.scale.PageAlignHorizonally = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start('load');
  }
};
