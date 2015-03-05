'use strict';

var Cop = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'cop', frame);

  this.game.physics.arcade.enable(this);

  this.body.gravity.y = 620;
  this.body.velocity.x = -60;
  this.body.collideWorldBounds = false;
  this.outOfBoundsKill = true;

  this.animations.add('copleft', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
  this.animations.play('copleft');
  
};

Cop.prototype = Object.create(Phaser.Sprite.prototype);
Cop.prototype.constructor = Cop;

Cop.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Cop;
