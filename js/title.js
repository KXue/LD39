const titleState = {
	create: function (){
		const nameLabel = game.add.text(game.camera.width * 0.5, game.camera.height * 0.5, "Click anywhere to start", {
			font: '14px Space Mono', fill: '#ffffff'
		});
    nameLabel.anchor.setTo(0.5);
    game.input.onDown.add(()=>{
      game.state.start('main');
    });
	},
};
