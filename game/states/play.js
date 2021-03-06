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

