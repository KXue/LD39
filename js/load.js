//load.js
const loadState={
	preload: function(){
		const loadingLabel = game.add.text(game.camera.width * 0.5, game.camera.height * 0.5, 'loading...', {font: '24px Courier', fill: '#ffffff'});
    loadingLabel.anchor.setTo(0.5);
    game.stage.backgroundColor = '#000000';

		/**** Load graphics assets ****/

    // card sprites
    game.load.spritesheet('card-states', 'assets/images/card_empty_sheet.png', 9, 11);
    game.load.image('card-up', 'assets/images/card_up_filled.png');
    game.load.image('card-down', 'assets/images/card_down_filled.png');
    game.load.image('card-left', 'assets/images/card_left_filled.png');
    game.load.image('card-right', 'assets/images/card_right_filled.png');
    game.load.image('card-back', 'assets/images/card.png');

    // map sprites
    game.load.image('floor', 'assets/images/floor_1.png');
    game.load.image('wall-up', 'assets/images/floor_1.png');
    game.load.image('wall-down', 'assets/images/floor_1.png');
    game.load.image('wall-left', 'assets/images/floor_1.png');
    game.load.image('wall-right', 'assets/images/floor_1.png');

    // player sprite
    game.load.image('player', 'assets/images/ll_right.png');

		/**** Load audio assets ****/
		game.load.audio('step', 'assets/sounds/step.wav');
    game.load.audio('bad', 'assets/sounds/lost_card.wav');
    game.load.audio('music', 'assets/sounds/tick.wav');

 	},
 	create: function(){
 		game.state.start('title');
 	}
 };
