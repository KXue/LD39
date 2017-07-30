const ua = window.navigator.userAgent;
const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
const webkit = !!ua.match(/WebKit/i);
//not sure if iOS Safari supports webGL canvas pixel perfect scaling. going to use this just in case
const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

const isSafari = (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))) || iOSSafari ;

let renderer = Phaser.AUTO;
if(isSafari){
  renderer = Phaser.CANVAS;
}

const config = {
  width: CONSTANTS.width,
  height: CONSTANTS.height,
  renderer: renderer,
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
