const bootState = {
  create: function () {
    game.scale.PageAlignHorizonally = true;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.renderer.renderSession.roundPixels = true;
    Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.state.start('load');
  }
};
