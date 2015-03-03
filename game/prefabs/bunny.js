'use strict';

var Bunny = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bunny', frame);

  // initialize your prefab here
  this.game.physics.arcade.enable(this);
  
};

Bunny.prototype = Object.create(Phaser.Sprite.prototype);
Bunny.prototype.constructor = Bunny;
Bunny.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Bunny;
