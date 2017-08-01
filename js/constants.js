const CONSTANTS = {
  width: 160,
  height: 144,
  initialDeckSize: 80,
  initialHandSize: 8,
  maxHandSize: 8,
  tileSize: 16,
  cardWidth: 16,
  cardHeight: 16,
  mapSpecs: {
    "width" : 10,
    "height" : 9,
    "wallPercent" : 42,
    "steps" : 2,
    "stepList" : [
      {
        "iterations" : 4,
        "specifiers" : 2,
        "radii" : [1, 2],
        "minMax" : [[5, 9],[0, 2]]
      },
      {
        "iterations" : 3,
        "specifiers" : 1,
        "radii" : [1],
        "minMax" : [[5, 9]]
      }
    ]
  },
  colors:{
    light: '#e0f8d0',
    dark: '#88c070',
    darker: '#306850',
    darkest: '#081820'
  },
  cards:{
    back: 0,
    left: 1,
    up: 2,
    down: 3,
    right: 4,
    directions: 
      [new Phaser.Point(-1, 0),
      new Phaser.Point(0, -1),
      new Phaser.Point(0, 1),
      new Phaser.Point(1, 0)],
    counter: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    counterDuration: 20, //Time in seconds before shrink hand event
  },
  cardToPlayerFrameIndex: [0, 3, 2, 1],
  tiles:{
    floor: 0,
    single: 3,
    center: 10,

    left: 9,
    leftUp: 5,
    leftDown: 2,

    right: 11,
    rightUp:4,
    rightDown: 1,

    up: 7,
    upRight: 8,
    upLeft: 6,

    down: 13,
    downRight: 14,
    downLeft: 12,
    binaryToTile:{
      '11111111': 'center',
      '01111011': 'center',
      '11011110': 'center',
      '01011111': 'center',
      '11111010': 'center',

      '11011011': 'center',
      '01111110': 'center',

      '11011010': 'center',
      '01111010': 'center',
      '01011110': 'center',
      '01011011': 'center',

      '11111011': 'leftDown',
      '01111111': 'leftUp',
      '11111110': 'rightDown',
      '11011111': 'rightUp',


      '01101011': 'left',
      '11101111': 'left',
      '11101011': 'left',
      '01101111': 'left',

      '11010110': 'right',
      '11110111': 'right',
      '11010111': 'right',
      '11110110': 'right',

      '00011111': 'up',
      '10111111': 'up',
      '10011111': 'up',
      '00111111': 'up',

      '11111000': 'down',
      '11111101': 'down',
      '11111100': 'down',
      '11111001': 'down',


      '00001011': 'upLeft',
      '00101111': 'upLeft',
      '00101011': 'upLeft',
      '00001111': 'upLeft',

      '01101000': 'downLeft',
      '11101001': 'downLeft',
      '11101000': 'downLeft',
      '01101001': 'downLeft',

      '00010110': 'upRight',
      '10010111': 'upRight',
      '10010110': 'upRight',
      '00010111': 'upRight',

      '11010000': 'downRight',
      '11110100': 'downRight',
      '11110000': 'downRight',
      '11010100': 'downRight',
    },
  }
};
