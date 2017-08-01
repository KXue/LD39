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
    this.map = generateConnectedMap();
    this.mapTiles = createWorld(this.map);
    this.deck = createDeck();
    this.hand = createHandFromDeck(this.deck);
    this.cardTimer = createCardTimer(this);
    let row, col;
    do{
      row = game.rnd.integerInRange(0, this.map.length-1);
      col = game.rnd.integerInRange(0, this.map[0].length-1);
    }while(this.map[row][col] != '.');
    this.player = game.add.sprite(col * CONSTANTS.tileSize, row * CONSTANTS.tileSize, 'player', 1);
    //custom map position used to avoid problems with tweening
    this.player._customMapPosition = new Phaser.Point(col, row);
    game.world.setBounds(0, 0, this.map[0].length * CONSTANTS.tileSize, this.map.length * CONSTANTS.tileSize);
    game.camera.bounds = game.world.bounds;
    game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    this.hand.onChildInputDown.add(onCardClicked, this);
  },

  shutdown: function(){
    this.player = null;
    this.mapTiles = null;
    this.deck = null;
    this.hand = null;
    this.cardTimer = null;
    this.items = null;
    this.map = null;
    this.stairs = null;
  },
};
//IN DEVELOPMENT:
function canMoveTo(map, x, y){
  return map[y][x] == '.';
};

//TODO: need to take mapdata as input.
function createWorld(map){
  const MAPWIDTH = map[0].length;
  const MAPHEIGHT = map.length;
  const mapTiles = game.add.group();
  let index = 0;
  // printMap(map);
  for(let i = 0; i < MAPHEIGHT; i++){
    for(let j = 0; j < MAPWIDTH; j++){
      index = whichTile(map, i, j);
      mapTiles.create(CONSTANTS.tileSize * j , CONSTANTS.tileSize * i, 'tiles', index);
    }
  }
};

function whichTile(map, row, col){
  let retVal = 0
  if(map[row][col] != '.'){
    let tileMask = '';

    for(let dr = -1; dr <= 1; dr++){
      for(let dc = -1; dc <= 1; dc++){
        if(dr + dc + dr * dc != 0){
          let newRow = row + dr;
          let newCol = col + dc;
          if(newRow < 0 || newRow >= map.length || newCol < 0 || newCol >= map[newRow].length || map[newRow][newCol] == '#'){
            tileMask += '1';
          }
          else{
            tileMask += '0';
          }
        }
      }
    }

    if(tileMask in CONSTANTS.tiles.binaryToTile){
      retVal = CONSTANTS.tiles[CONSTANTS.tiles.binaryToTile[tileMask]];
    }
    else{
      retVal = CONSTANTS.tiles['single'];
    }
    // retVal = 10;
  }
  return retVal;
};

function generateRandomPositions(map, numPositions){

};

function onCardClicked(sprite, event){
  const direction = CONSTANTS.cards.directions[sprite._faceValue - 1];
  const newPosition = Phaser.Point.add(this.player._customMapPosition, direction);
  
  if(canMoveTo(this.map, newPosition.x, newPosition.y)){
    movePlayer(this.player, newPosition, CONSTANTS.cardToPlayerFrameIndex[sprite._faceValue - 1]);
  }



  shrinkHand(this.hand, sprite);
  drawCard(this.deck, this.hand);
};

function movePlayer(player, newPosition, direction){
  player._customMapPosition = newPosition;
  player.frame = direction;
  const newWorldPosition = mapToWorld(newPosition.x, newPosition.y);
  const moveTween = game.add.tween(player);
  moveTween.to({x: newWorldPosition.x, y: newWorldPosition.y}, 200, Phaser.Easing.Elastic.Out);
  moveTween.start();
  //TODO: maybe check for game over after player has finished moving?
}
//CONFIRMED WORKING:
function addCardToGroup(group, value, isBack){
  let card = null;

  if(typeof group != "undefined" && typeof value != "undefined" && value >= 1 && value <= 4 ){
    let spriteIndex = value;

    if(isBack){
      spriteIndex = 0;
    }

    card = group.create(0, 0, 'cards', spriteIndex);
    card._faceValue = value;
    card.anchor.setTo(0, 1);
  }
  return card;
};

function attachCardMoveTween(card, property, duration){
  const cardTween = game.add.tween(card);
  cardTween.to(property, duration, Phaser.Easing.Bounce.Out);
  cardTween.start();
  return cardTween;
};

function CountWalls(map, row, col, radius, countCentre){
  let wallCount = 0;
  let offsetRow;
  let offsetCol;
  let spec = CONSTANTS.mapSpecs;

  for(let r = -radius; r <= radius; r++){
    for(let c = -radius; c <= radius; c++){
      offsetRow = row + r;
      offsetCol = col + c;
      if(offsetRow < 0 || offsetRow >= spec.height || offsetCol < 0 || offsetCol >= spec.width || map[offsetRow][offsetCol] == '#'){
        wallCount++;
      }
    }
  }
  if(!countCentre && map[row][col] == '#'){
    wallCount--;
  }
  return wallCount;
};

function createCardTimer(context){
  const cardTimer = game.add.sprite(0, 0, 'cards', CONSTANTS.cards.counter[0]);
  cardTimer.anchor.setTo(0, 1);
  cardTimer.fixedToCamera = true;
  cardTimer.cameraOffset.setTo(0, CONSTANTS.height);

  const timer = game.time.create(false);
  const cardTime = CONSTANTS.cards.counterDuration * 1000 / CONSTANTS.cards.counter.length;
  timer.loop(cardTime, updateTimer, context, cardTimer);
  timer.start();
  return cardTimer;
};

function createDeck(){
  const deck = game.add.group();
  deck.inputEnableChildren = false;
  deck.ignoreChildInput = true;
  deck.fixedToCamera = true;
  deck.cameraOffset = new Phaser.Point(0, CONSTANTS.height);    //deck and hand both only occupy the bottom row of the game

  for(let i = 0; i < CONSTANTS.initialDeckSize + CONSTANTS.initialHandSize; i++){
    const card = addCardToGroup(deck, game.rnd.integerInRange(1, 4), true);
    card.x = CONSTANTS.width - CONSTANTS.cardWidth;
  }

  return deck;
};

function createHandFromDeck(deck){
  const hand = game.add.group();
  hand.inputEnableChildren = true;
  hand.ignoreChildInput = false;

  hand.fixedToCamera = true;
  hand.cameraOffset = new Phaser.Point(0, CONSTANTS.height);

  for(let i = 0; i < CONSTANTS.initialHandSize; i++){
    drawCard(deck, hand);
  }

  return hand;
};

function drawCard(deck, hand){
  const card = deck.getTop();

  if(card){
    card.frame = card._faceValue;
    deck.remove(card);
    hand.add(card);
    let newX = 0;

    if(hand.length != 0){
      newX = CONSTANTS.cardWidth * hand.length;
    }

    attachCardMoveTween(card, {x: newX}, 250)
    .onComplete.add((a, b, h)=>{repositionCards(h);}, this, 0, hand);
  }

};

function FloodArea(map, row, col, traversed, count){
  if(row < 0 || row >= CONSTANTS.mapSpecs.height || col < 0 || col >= CONSTANTS.mapSpecs.width || traversed[row][col] || map[row][col] != '.'){
    return;
  }else{
    traversed[row][col] = true;
    count.count++;
    for(let i = -1; i <= 1; i++){
      for(let j = -1; j <= 1; j++){
        if(i != 0 && j != 0){
          FloodArea(map, row + i, col + j, traversed, count);
        }
      }
    }
  }
};

function generateMap(map){
  let isWall, wallCount, min, max;
  let newMap = map;
  let spec = CONSTANTS.mapSpecs;

  for(let step = 0; step < spec.steps; step++){
    for(let it = 0; it < spec.stepList[step].iterations; it++){
      
      let tempMap = [] 
      
      for(let row = 0; row < spec.height; row++){
        
        let newRow = [];
        
        for(let col = 0; col < spec.width; col++){
          
          isWall = false;
          let newChar = '#';
          
          for(let s = 0; s < spec.stepList[step].specifiers; s++){
            wallCount = CountWalls(newMap, row, col, spec.stepList[step].radii[s], true);
            min = spec.stepList[step].minMax[s][0];
            max = spec.stepList[step].minMax[s][1];
            isWall |= (wallCount >= min && wallCount <= max);

            if(isWall){
              newChar = '#';
              break;
            }
          }

          if(!isWall){
            newChar = '.';
          }

          newRow.push(newChar);
        }
        tempMap.push(newRow);
      }
      newMap = tempMap;
    }
  }

  return newMap;
};

function generateConnectedMap(){
  let charMap = generateRandomMap();
  do{
    charMap = generateMap(charMap);
  }while (isMapConnected(charMap));
  
  padMap(charMap);

  return charMap;
}

function generateRandomMap(){
  let width = CONSTANTS.mapSpecs.width;
  let height = CONSTANTS.mapSpecs.height;
  let charMap = [];
  for(let i = 0; i < height; i++){
    const mapRow = [];
    for(let j = 0; j < width; j++){
      mapRow.push(game.rnd.integerInRange(0, 99) < CONSTANTS.mapSpecs.wallPercent ? '#' : '.')
    }
    charMap.push(mapRow);
  }
  return charMap;
};

function isMapConnected(map){
  let row;
  let col;
  let spec = CONSTANTS.mapSpecs;

  do{
    row = game.rnd.integerInRange(0, spec.height-1);
    col = game.rnd.integerInRange(0, spec.width-1);
  }while(map[row][col] != '.');

  let count = {count: 0};
  let traversed = [];

  for(let row = 0; row < spec.height; row++){
    traversed[row] = []
    for(let col = 0; col < spec.width; col++){
      traversed[row][col] = false;
    }
  }

  FloodArea(map, row, col, traversed, count);
  return count.count == TotalArea(map);
};

function mapToWorld(x, y){
  return new Phaser.Point(x * CONSTANTS.tileSize, y * CONSTANTS.tileSize);
};

function padMap(map){
  let newWidth = map[0].length + 2;
  for(let row = 0; row < map.length; row++){
    map[row].push('#');
    map[row].unshift('#');
  }
  let topBottom = [];
  for(let i = 0; i < newWidth; i++){
    topBottom.push('#');
  }
  map.push(topBottom);
  map.unshift(topBottom);
}

function printMap(map){
  for(let i = 0; i < map.length; i++){
    let retString = i + ": ";
    for(let j = 0; j < map[i].length; j++){
      retString += map[i][j];
    }
    console.log(retString);
  }
};

function repositionCards(hand){
  const counterObject = {count: 1};
  hand.forEach((child)=>{
    attachCardMoveTween(child, {x: counterObject.count * CONSTANTS.cardWidth}, 150);
    counterObject.count++;
  }, this, true);
};

function shrinkHand(hand, card){
  if(card){
    hand.remove(card);
  }
  else if(hand.length != 0){
    hand.removeChildAt(0);
  }
  repositionCards(hand);
};

function TotalArea(map){
  let area = 0;
  for(let row = 0; row < CONSTANTS.mapSpecs.height; row++){
    for(let col = 0; col < CONSTANTS.mapSpecs.width; col++){
      if(map[row][col] == '.'){
        area++;
      }
    }
  }
  return area;
};

function updateTimer(sprite){
  sprite.frame++;

  if(sprite.frame > CONSTANTS.cards.counter[CONSTANTS.cards.counter.length-1]){
    sprite.frame = CONSTANTS.cards.counter[0];
    shrinkHand(this.hand);

    if(this.hand.length == 0){
      game.state.start('title');
    }
  }
};

function worldToMap(x, y){
  return new Phaser.Point(Math.round(x / CONSTANTS.tileSize),
  Math.round(y / CONSTANTS.tileSize));
};

// TODO:
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
