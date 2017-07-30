//load.js
const loadState={
	preload: function(){
		const loadingLabel = game.add.text(game.camera.width * 0.5, game.camera.height * 0.5, 'loading...', {font: '24px Courier', fill: CONSTANTS.colors.darkest});
    loadingLabel.anchor.setTo(0.5);
    game.stage.backgroundColor = CONSTANTS.colors.light;

		/**** Load graphics assets ****/

    // card sprites
    game.load.spritesheet('cards', 'assets/images/cards.png', 16, 16);
		game.load.spritesheet('tiles', 'assets/images/ground.png', 16, 16);
		game.load.spritesheet('player', 'assets/images/player.png', 16, 16);
		game.load.spritesheet('pickups', 'assets/images/pickups.png', 16, 16);

		/**** Load audio assets ****/
		game.load.audio('step', 'assets/sounds/step.wav');
    game.load.audio('bad', 'assets/sounds/lost_card.wav');
    game.load.audio('music', 'assets/sounds/tick.wav');

 	},
 	create: function(){
 		game.state.start('title');
 	}
 };
