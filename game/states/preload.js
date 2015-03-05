
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}
//preloads all the assets for the game
Preload.prototype = {
  preload: function() {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.width/2, this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);

    //images for the game
    this.load.image('background', 'assets/citybackground.png');
    this.load.image('title', 'assets/title.png');
    this.load.image('startButton', 'assets/start-button.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('beer', 'assets/beer.png');
    this.load.image('keg', 'assets/keg.png');
    this.load.image('whiskey', 'assets/WHISKEY_BOTTLE.svg');
    this.load.image('heart', 'assets/heart.png');
    this.load.image('pause-btn', 'assets/pause-btn.png');
    this.load.image('pausePanel', 'assets/pausePanel.png');
    this.load.image('play-btn', 'assets/play-btn.png');

    //spritesheets for the game
    this.load.spritesheet('dude', 'assets/dude.png', 45, 62);
    this.load.spritesheet('bunny', 'assets/baddie.png', 32, 32);

    //sounds for the game
    this.load.audio('dudeJump', 'assets/audio/jump_07.wav');
    this.load.audio('explode', 'assets/audio/explosion.wav');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    //if all assets have been preloaded and ready, run the menu state(title page)
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
