const playState = {
  player: null,
  items: null,
  map: null, //mapdata
  mapTiles: null, //group storing map tiles
  stairs: null, //group storing stair sprites
  deck: null, //group storing deck sprites
  hand: null, //group storing hand sprites
  cardTimer: null, //sprite representing the countdown timer
  create: function(){
    this.populateWorld();
    this.populateDeck();
    this.player = game.add.sprite(5 * CONSTANTS.tileSize, 5 * CONSTANTS.tileSize, 'player', 1);
  },
  populateWorld: function(){
    const MAPWIDTH = CONSTANTS.width / CONSTANTS.tileSize;
    const MAPHEIGHT = CONSTANTS.height / CONSTANTS.tileSize;
    this.mapTiles = game.add.group();
    let index = 0;
    for(let i = 0; i < MAPWIDTH; i++){
      for(let j = 0; j < MAPHEIGHT; j++){
        index = game.rnd.integerInRange(0, 14)
        this.mapTiles.create(CONSTANTS.tileSize * i, CONSTANTS.tileSize * j, 'tiles', index);
      }
    }
  },
  //should deck size even be a thing?
  populateDeck: function(){
    this.deck = game.add.group();
    this.deck.fixedToCamera = true;
    for(let i = 0; i < CONSTANTS.initialDeckSize; i++){
      const card = this.deck.create(CONSTANTS.width - CONSTANTS.cardWidth, CONSTANTS.height - CONSTANTS.cardHeight, 'cards', 0);
    }
  }
};

function moveSpriteToGroup(sprite, group){
  sprite.parent.remove(sprite);
  group.add(sprite);
};

function generateRandomMap(width, height){

};

function generateRandomPositions(map, numPositions){

};

function printMap(map){

};

function canMoveTo(map, x, y){

};

function mapToWorld(x, y){

};

function worldToMap(x, y){

};

// function Player(x, y) {
//   var player = game.add.sprite(x, y, 'characters');
//   player.speed = 80
//   player.frame = 0;
//   player.xDest = x;
//   player.yDest = y;
//   player.anchor.setTo(.5, 1);
//   player.animations.add('wait', [8, 9], 4);
//   player.sfx = {}
//   player.sfx.collide = game.add.audio('hit');
//
//   player.setDest = function(x, y) {
//     player.xDest = x;
//     player.yDest = y;
//   };
//
//   player.update = function() {
//     var self = this;
//     move(self);
//     game.camera.x = self.x - 150;
//     game.camera.y = self.y - 100;
//
//   }
//   player.stop = function() {
//     var self = this;
//     self.xDest = self.x;
//     self.yDest = self.y;
//     player.sfx.collide.play();
//
//   }
//   return player;
// };
//
// function Enemy(x, y) {
//   var enemy = game.add.sprite(x, y, 'characters');
//   enemy.state = 'patrol';
//   enemy.xDest = x;
//   enemy.yDest = y;
//   enemy.animations.add('wait', [544, 545], 4);
//   enemy.direction = 1;
//   enemy.frame = 544;
//   enemy.anchor.setTo(.5, 1);
//   enemy.scale.x = -1;
//
//   enemy.goToXY = function(x, y) {
//     enemy.xDest = x;
//     enemy.yDest = y;
//   }
//
//   enemy.update = function() {
//     var self = this;
//     switch (self.state) {
//       case 'patrol':
//         self.speed = 40;
//         self.patrol();
//         break;
//       case 'alarm':
//         self.speed = 0;
//         self.stop();
//         break;
//     }
//     move(self);
//   }
//
//   enemy.stop = function() {
//     var self = this;
//     self.xDest = self.x;
//     self.yDest = self.y;
//   }
//
//   enemy.patrol = function() {
//     var self = this;
//     if (Math.floor(self.x / 10) == Math.floor(self.xDest / 10)) {
//       self.direction = self.direction * -1;
//       self.goToXY(self.x + self.direction * 100);
//     }
//   }
//   return enemy;
// }
//
// // Helper Functions
// function move(self){
//   if (Math.floor(self.x / 10) == Math.floor(self.xDest / 10)) {
//     self.body.velocity.x = 0;
//   } else if (Math.floor(self.x) < Math.floor(self.xDest)) {
//     self.body.velocity.x = self.speed;
//     self.scale.x = -1;
//   } else if (Math.floor(self.x) > Math.floor(self.xDest)) {
//     self.body.velocity.x = -self.speed;
//     self.scale.x = 1;
//   }
//   if (Math.floor(self.y / 10) === Math.floor(self.yDest / 10)) {
//     self.body.velocity.y = 0;
//   } else if (Math.floor(self.y) < Math.floor(self.yDest)) {
//     self.body.velocity.y = self.speed;
//   } else if (Math.floor(self.y) > Math.floor(self.yDest)) {
//     self.body.velocity.y = -self.speed;
//   }
// }
