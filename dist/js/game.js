(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'beer-run');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":10,"./states/gameover":11,"./states/menu":12,"./states/play":13,"./states/preload":14}],2:[function(require,module,exports){
'use strict';

var Beer = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'beer', frame);

  this.game.physics.arcade.enable(this);

  this.enableBody = true;
  this.body.velocity.x = 0;
  this.outOfBoundsKill = true;
  this.checkWorldBounds = true;
};

Beer.prototype = Object.create(Phaser.Sprite.prototype);
Beer.prototype.constructor = Beer;

Beer.prototype.update = function() {
};

module.exports = Beer;

},{}],3:[function(require,module,exports){
'use strict';

var Bunny = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bunny', frame);

  // enable physics for the bunny objects
  this.game.physics.arcade.enable(this);

  //bunny properties
  this.body.gravity.y = 620;
  this.body.velocity.x = -50;
  this.body.collideWorldBounds = false;
  this.outOfBoundsKill = true;

  //bunny animation frames
  this.animations.add('left', [0, 1], 10, true );
  this.animations.add('boom', [2, 3, 4, 5, 6, 7, 8, 9], 10, false);
  this.animations.play('left');
};

Bunny.prototype = Object.create(Phaser.Sprite.prototype);
Bunny.prototype.constructor = Bunny;
Bunny.prototype.update = function() {
  

};

module.exports = Bunny;

},{}],4:[function(require,module,exports){
'use strict';

var Cop = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'cop', frame);

  this.game.physics.arcade.enable(this);

  this.body.gravity.y = 620;
  this.body.velocity.x = -65;
  this.body.collideWorldBounds = false;
  this.outOfBoundsKill = true;

  this.animations.add('copleft', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
  this.animations.play('copleft');
  
};

Cop.prototype = Object.create(Phaser.Sprite.prototype);
Cop.prototype.constructor = Cop;

Cop.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Cop;

},{}],5:[function(require,module,exports){
'use strict';

var Dude = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'dude', frame);

  //enable physics for the dude object
  this.game.physics.arcade.enable(this);

  //dude properties
  this.body.gravity.y = 720;
  this.body.velocity.x = 400;
  this.body.collideWorldBounds = false;
  this.outOfBoundsKill = true;

  //dude animation frames
  this.animations.add('jump', [1], 10, true );
  this.animations.add('run', [0, 1, 2, 3], 8, true);
  this.animations.add('dead', [4, 5, 6], 10, false);

  this.lives = 3;

};

Dude.prototype = Object.create(Phaser.Sprite.prototype);
Dude.prototype.constructor = Dude;
Dude.prototype.update = function() {
};
//lets the dude jump
Dude.prototype.jump = function(){
  this.body.velocity.y = -550;
}

module.exports = Dude;


},{}],6:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'ground', frame);

  //enable physics for the ground object
  this.game.physics.arcade.enable(this);

  //ground properties
  this.body.velocity.x = -400;
  this.body.immovable = true;
  this.checkWorldBounds = true;
  this.outOfBoundsDestroy = true;
  this.body.allowGravity = false;
  
};
Ground.prototype = Object.create(Phaser.Sprite.prototype);
Ground.prototype.constructor = Ground;
Ground.prototype.update = function() {};
//reset function for ground obj
Ground.prototype.reset = function(x, y) {

  this.game.physics.arcade.enable(this);

  this.x = x;
  this.y = y;
  this.body.velocity.x = -400;
  this.body.immovable = true;
  this.body.checkWorldBounds = true;
  this.body.outOfBoundsKill = true;
  this.body.allowGravity = false;
};

module.exports = Ground;

},{}],7:[function(require,module,exports){
'use strict';

var Keg = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'keg', frame);

  this.game.physics.arcade.enable(this);

  this.enableBody = true;
  this.body.velocity.x = 0;
  this.outOfBoundsKill = true;
  this.checkWorldBounds = true;
};

Keg.prototype = Object.create(Phaser.Sprite.prototype);
Keg.prototype.constructor = Keg;

Keg.prototype.update = function() {
};

module.exports = Keg;

},{}],8:[function(require,module,exports){
'use strict';

var PausePanel = function(game, parent) {
  Phaser.Group.call(this, game, parent);

  // Add panel
  this.panel = this.game.add.sprite(0, 0, 'pausePanel');
  this.panel.width = 500;
  this.panel.height = 280;
  this.add(this.panel);

  //creates the unpause/resume button
  this.playBtn = this.game.add.button(170, 140, 'play-btn', this.unpause, this, 3, 2, 3, 2);
  this.playBtn.anchor.setTo(0, 0);
  this.add(this.playBtn);

  this.y = 110;
  this.x = 370;
  this.alpha = 0;  
};

PausePanel.prototype = Object.create(Phaser.Group.prototype);
PausePanel.prototype.constructor = PausePanel;
PausePanel.prototype.update = function() {
};
//show the pause panel when paused
PausePanel.prototype.show = function(){
  this.game.add.tween(this).to({alpha:0.6, y:150}, 800, Phaser.Easing.Exponential.In, true, 0);
};
//hides the pause panel when unpaused
PausePanel.prototype.unpause = function(){
  this.game.add.tween(this).to({alpha:0, y:150}, 800, Phaser.Easing.Exponential.Out, true, 0);
  this.game.state.getCurrentState().unpauseGame();
};

module.exports = PausePanel;
  
},{}],9:[function(require,module,exports){
'use strict';

var Whiskey = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'whiskey', frame);

  this.game.physics.arcade.enable(this);

  this.enableBody = true;
  this.body.velocity.x = 0;
  this.outOfBoundsKill = true;
  this.checkWorldBounds = true;
  
};

Whiskey.prototype = Object.create(Phaser.Sprite.prototype);
Whiskey.prototype.constructor = Whiskey;

Whiskey.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Whiskey;

},{}],10:[function(require,module,exports){

'use strict';

function Boot() {
}
//if the assets are still loading run this
Boot.prototype = {
  preload: function() {
    //loads an loading gif 
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],11:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],12:[function(require,module,exports){

'use strict';
function Menu() {}
//creates the starting/title page of the game
Menu.prototype = {
  preload: function() {

  },
  create: function() {
    //adds the background image
    this.background = this.game.add.tileSprite(0, -35, 653, 352, 'background');
    this.background.scale.setTo(2, 2);

    //adds a ground image
    this.ground = this.game.add.tileSprite(0, 530, this.game.world.width, this.game.world.height, 'ground');

    //shows the "Beer Run" and sets its size
    this.title = this.game.add.sprite(this.game.width/2, 250,'title');
    this.title.scale.setTo(1.2, 1.2);
    this.title.anchor.setTo(0.5, 1);

    //makes the "Beer Run" go up and down in a loop
    this.game.add.tween(this.title).to({y:200}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    //creates the start button and once click runs the play state
    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
    this.startButton.scale.setTo(2, 2);
    this.startButton.anchor.setTo(0.5,0.5);
  },
  //callback function, when activated starts the play state
  startClick: function() {  
    this.game.state.start('play');
  },
  update: function() {
  }
};

module.exports = Menu;

},{}],13:[function(require,module,exports){
'use strict';

var Dude = require('../prefabs/dude');
var Cop = require('../prefabs/cop');
var Bunny = require('../prefabs/bunny');
var Ground = require('../prefabs/ground');
var Beer = require('../prefabs/beer');
var Keg = require('../prefabs/keg');
var Whiskey = require('../prefabs/whiskey');
var PausePanel = require('../prefabs/pausePanel');
var paused = false;
var deadchecker = true;

function Play() {}
Play.prototype = {
  create: function() {
    //enable physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 750;

    //background
    this.background = this.game.add.tileSprite(0, -35, 653, 352, 'background');
    this.background.autoScroll(-100, 0);
    this.background.scale.setTo(2, 2);

    //ground 
    this.groundGroup = this.game.add.group();

    //creates the first ledge when the player lands
    this.initial_ground = new Ground(this.game, 0, this.game.world.height - 64, 300, 150);
    this.initial_ground.scale.setTo(4.5, 3);
    this.game.add.existing(this.initial_ground);

    //player 
    this.player = new Dude(this.game, 500, 0)
    this.game.add.existing(this.player);

    //cops
    this.cops = this.game.add.group();

    //bunnies
    this.bunnies = this.game.add.group();

    //beer 
    this.beers = this.game.add.group();

    //keg
    this.kegs = this.game.add.group();

    //whiskey
    this.whiskeys = this.game.add.group();


    //game controls
    this.jumpKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // this.pauseKey = this.game.input.keyboard.addKey(32);


    // makes spacebar not scroll down 
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

    //pause button
    this.btnPause = this.game.add.button(1150, 40, 'pause-btn', this.pauseGame, this);
    this.btnPause.anchor.setTo(0.5,0.5);
    this.btnPause.alpha = 1;

    //pause panel
    this.pausePanel = new PausePanel(this.game);
    this.game.add.existing(this.pausePanel);

    this.initGame();
  },
  update: function() {
    //callls the checkcollisions function 
    this.checkCollisions(); 

    //if game is not paused enable player animation and update movement
    if(!paused){
      //player speed
      this.player.body.velocity.x = 400;
      if (this.jumpKey.isDown && this.player.body.touching.down && this.player.alive)
      {
        this.game.sound.play('dudeJump', 1, 0, false, false);
        this.player.jump();
      }
      else if(!this.player.body.touching.down){
        this.player.animations.play('jump');
        this.player.body.velocity.x = 0; 
      }
      else if(deadchecker == false){
        this.player.body.velocity.x = 150;
      }
      else{
        this.player.animations.play('run');
      };
    };
  },
  returnFalse: function() {
    return deadchecker;
  },
  //collision between elements
  checkCollisions: function(){

    //lets player run on the first ground
    this.game.physics.arcade.collide(this.player, this.initial_ground);
    this.game.physics.arcade.collide(this.beers, this.initial_ground);
    this.game.physics.arcade.collide(this.kegs, this.initial_ground);
    this.game.physics.arcade.collide(this.whiskeys, this.initial_ground);

    //lets player run on the random generated ground
    this.game.physics.arcade.collide(this.player, this.groundGroup);
    this.game.physics.arcade.collide(this.beers, this.groundGroup);
    this.game.physics.arcade.collide(this.kegs, this.groundGroup);
    this.game.physics.arcade.collide(this.whiskeys, this.groundGroup);

    //lets bunnies and cops run on ground and collide with player
    this.game.physics.arcade.collide(this.bunnies, this.groundGroup);
    this.game.physics.arcade.collide(this.bunnies, this.initial_ground);
    this.game.physics.arcade.collide(this.cops, this.groundGroup);
    this.game.physics.arcade.collide(this.cops, this.initial_ground);

    //player dies when bunnies touch him
    this.game.physics.arcade.overlap(this.player, this.bunnies, this.killDude, this.returnFalse, this); 
    // this.game.physics.arcade.collide(this.bunnies, this.player, this.killDude, null, this);

    //player dies when cops harrass him
    this.game.physics.arcade.overlap(this.player, this.cops, this.killCop, this.returnFalse, this);

    //lets player collect beers, kegs
    this.game.physics.arcade.overlap(this.player, this.beers, this.collectBeer, null, this);
    this.game.physics.arcade.overlap(this.player, this.kegs, this.collectKeg, null, this);
    this.game.physics.arcade.overlap(this.player, this.whiskeys, this.collectWhiskey, null, this);

  },
  //generates grounds with random y-value(height)
  generateGrounds: function() {  
    // console.log(this.game.world.height - 64);
    var randomY = this.game.rnd.integerInRange(440, 520);
    var randGround = this.groundGroup.getFirstExists(false);
      if(!randGround) {
        randGround = new Ground(this.game, 1200, randomY, 300, 150);
        randGround.scale.setTo(1.5, 10);
        this.groundGroup.add(randGround);
      }
      randGround.reset(1200, randomY);
  },

  //generate cops
  generateCops: function() {
    var cop = new Cop(this.game, 1199, 300)
    this.cops.add(cop);
  },

  //generate bunnies
  generateBunnies: function() {
    var bunny = new Bunny(this.game, 1199, 300)
    this.bunnies.add(bunny);
  },

  //generate beers 
  generateBeers: function(){
    // console.log('beer');
    var beer = new Beer(this.game, 1199, 300)
    this.beers.add(beer);
  },

  //generates kegs
  generateKegs: function(){
    // console.log('keg');
    var keg = new Keg(this.game, 1199, 300)
    this.kegs.add(keg);
  },

  generateWhiskeys: function(){
    // console.log('whiskey');
    var whiskey = new Whiskey(this.game, 1199, 300)
    this.whiskeys.add(whiskey);
  },

  collectBeer: function(player, beer) {
    // Removes the beer from the screen
    beer.kill();
    //  Add and update the score
    // score += 1;
    // scoreText.text = 'Score: ' + score;
  },

  collectKeg: function(player, keg) {
    // Removes the beer from the screen
    keg.kill();
    //  Add and update the score
    // score += 5;
    // scoreText.text = 'Score: ' + score;
  },

  collectWhiskey: function(player, whiskey) {
    // Removes the whiskey from the screen
    whiskey.kill();
    // add and update the score
    // score += 50;
    // scoreText.text = 'Score: ' + score;
  },

  killDude: function(player, bunnies){
    if(player.body.touching.right) {
        deadchecker = false;
        // this.player.alive = false;
        var deadDude = player.animations.play('dead', 3, false, true);
        deadDude.play();
        deadDude.killOnComplete = true;
        this.changeDeadChecker(this.player, 'dead');

      }
      else {
        bunnies.animations.play('boom', 3, false, true);
        // araboom.play();
        // araboom.killOnComplete = true;
        this.game.sound.play('explode', 1, 0, false, false);
        this.changeDeadChecker(this.player, 'alive');
    //   // // bunnies.kill();
    }
  },

  killCop: function(player, cops) {
    if(player.body.touching.right) {
      deadchecker = false;
      var deadDude = player.animations.play('dead', 3, false,true);
      deadDude.play();
      deadDude.killOnComplete = true;
      this.changeDeadChecker(this.player, 'dead');
    }
    // else {
    //   // var copkilla = cops.animations.play('deadpig');
    //   // copkilla.play();
    //   // copkilla.killOnComplete = true;
    //   this.changeDeadChecker(this.player, 'alive');
    //   cops.kill();
    // }
  },

  changeDeadChecker: function(player,deadOrAlive) {
    setTimeout(changeDead, 500);

    function changeDead() {
      deadchecker = true;
      if(deadOrAlive == "dead"){
        player.kill();
      }
    }
  },

  //when the game initializes start timers for the generators and play game
  initGame: function(){
    //creates grounds at intervals
    this.groundGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateGrounds, this);
    this.groundGenerator.timer.start();

    //creates beer at intervals
    this.beerGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 0.6, this.generateBeers, this);
    this.beerGenerator.timer.start();

    //creates kegs at intervals
    this.kegGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2.6, this.generateKegs, this);
    this.kegGenerator.timer.start();

    //creates whiskey
    this.whiskeyGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.6, this.generateWhiskeys, this);
    this.whiskeyGenerator.timer.start();

    //creates cops
    this.copGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 3.6, this.generateCops, this);
    this.copGenerator.timer.start();

    //creates bunnies at intervals
    this.bunnyGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2.6, this.generateBunnies, this);
    this.bunnyGenerator.timer.start();

    //runs the game
    this.playGame();
  },
  playGame: function(){
    if(paused){
      paused = false;
      //enables to pause the game when out of focus
      this.game.stage.disableVisibilityChange = false;

      // Show pause button
      this.game.add.tween(this.btnPause).to({alpha:1}, 1000, Phaser.Easing.Exponential.In, true);
    };
  },
  //manually made pause function
  //stops all movement to mimic a paused state and show a pop up paused panel
  pauseGame: function(){
    //if game is not paused and pauseGame is called run the function
    if(!paused){
      paused = true;
      //disables to pause the game when out of focus
      //this function starts the game if paused so we need to disable it
      this.game.stage.disableVisibilityChange = true;

      //stop animations, auto scrolls, and physics
      this.background.autoScroll(0, 0);
      this.initial_ground.body.velocity.x = 0;
      this.groundGroup.forEach(function(randGround){
        randGround.body.velocity.x = 0;
      }, this);
      this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
      this.player.animations.currentAnim.paused = true;
      this.player.body.allowGravity = false;

      this.cops.forEach(function(cop){
        cop.body.velocity.x = 0;
        cop.animations.currentAnim.paused = true;
      }, this);

      this.bunnies.forEach(function(bunny){
        bunny.body.velocity.x = 0;
        bunny.animations.currentAnim.paused = true;
      }, this);


      //pause generators
      this.groundGenerator.timer.pause();
      this.beerGenerator.timer.pause();
      this.kegGenerator.timer.pause();
      this.whiskeyGenerator.timer.pause();
      this.copGenerator.timer.pause();
      this.bunnyGenerator.timer.pause();

      //hide pause button
      this.game.add.tween(this.btnPause).to({alpha:0}, 1000, Phaser.Easing.Exponential.Out, true);
      this.btnPause.alpha = 0;

      //only show the paused panel if the game is not over
      if(!this.gameover){
        // Show pause panel
        this.pausePanel.show();
      };//else do nothing
    };//else do nothing
  },
  //manually made unpause function
  //resumes the game state
  unpauseGame: function(){
    //if game is paused and the unpauseGame is called run the fucntion
    if(paused){
      paused = false;
      //disables to pause the game when out of focus
      this.game.stage.disableVisibilityChange = false;

      //start animations
      this.background.autoScroll(-100, 0);
      this.initial_ground.body.velocity.x = -400;
      this.groundGroup.forEach(function(randGround){
        randGround.body.velocity.x = -400;
      }, this);
      this.player.body.velocity.x = -400;
      this.player.animations.currentAnim.resume = true;
      this.player.body.allowGravity = true;

      this.cops.forEach(function(cop){
        cop.body.velocity.x = -65;
        cop.animations.currentAnim.paused = false;
        cop.body.allowGravity = true;
      }, this);

      this.bunnies.forEach(function(bunny){
        bunny.body.velocity.x = -50;
        bunny.animations.currentAnim.paused = false;
        bunny.body.allowGravity = true;
      }, this);
      

      //resume generators
      this.groundGenerator.timer.resume();
      this.beerGenerator.timer.resume();
      this.kegGenerator.timer.resume();
      this.whiskeyGenerator.timer.resume();
      this.copGenerator.timer.resume();
      this.bunnyGenerator.timer.resume();

      //show pause button
      this.game.add.tween(this.btnPause).to({alpha:1}, 1000, Phaser.Easing.Exponential.In, true);
    };//else do nothing
  },
  gameOver: function(){
    console.log('game over!');
    // Gamover
    this.gameover = true;
    // Pause game
    this.pauseGame();
    // Show gameover panel
    this.gameoverPanel.show(this.score);
  }
};

module.exports = Play;


},{"../prefabs/beer":2,"../prefabs/bunny":3,"../prefabs/cop":4,"../prefabs/dude":5,"../prefabs/ground":6,"../prefabs/keg":7,"../prefabs/pausePanel":8,"../prefabs/whiskey":9}],14:[function(require,module,exports){

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
    this.load.image('whiskey', 'assets/whiskey.png');
    this.load.image('heart', 'assets/heart.png');
    this.load.image('pause-btn', 'assets/pause-btn.png');
    this.load.image('pausePanel', 'assets/pausePanel.png');
    this.load.image('play-btn', 'assets/play-btn.png');

    //spritesheets for the game
    this.load.spritesheet('dude', 'assets/dude.png', 45, 62);
    this.load.spritesheet('bunny', 'assets/baddie.png', 32, 32);
    this.load.spritesheet('cop', 'assets/cop.png', 28, 65);

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

},{}]},{},[1])