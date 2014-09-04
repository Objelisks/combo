define(function(require, exports) {

  var colliders = require('collider');
  var preload = require('preload');
  var Bow = require('items/bow');
  var Bomb = require('items/bomb');

  var bitmap;

  preload.add(function(game) {
    bitmap = game.add.bitmapData(48, 48);
    bitmap.fill(238, 169, 169);
  })

  var Player = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, bitmap);
    bitmap.add(this);
    
    this.game.camera.follow(this);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.moveSpeed = 200;
    this.anchor.setTo(0.5, 0.5);
    this.itemGroup = new Phaser.Group(game, this, 'playerItemGroup');
    this.itemGroup.add(new Bomb(game, this));
    this.itemGroup.add(new Bow(game, this));
    this.currentItem = 0;

    var useButton = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
    useButton.onDown.add(function() {
      var item = this.itemGroup.getAt(this.currentItem);
      item.use();
    }, this);

    var switchButton = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
    switchButton.onDown.add(function() {
      this.itemGroup.getAt(this.currentItem).visible = false;
      this.currentItem = (this.currentItem + 1) % this.itemGroup.length;
      this.itemGroup.getAt(this.currentItem).visible = true;
    }, this);

    this.properties = {
      'solid': true,
      'health': true,
      'player': true,
      'actor': true,
      'falls': true
    }
  }
  Player.prototype = Object.create(Phaser.Sprite.prototype);

  Player.prototype.update = function() {
    var keys = this.game.input.keyboard;
    this.body.velocity.setTo(0, 0);

    if(keys.isDown(Phaser.Keyboard.UP)) {
      this.body.velocity.y -= this.moveSpeed;
    }
    if(keys.isDown(Phaser.Keyboard.DOWN)) {
      this.body.velocity.y += this.moveSpeed;
    }
    if(keys.isDown(Phaser.Keyboard.LEFT)) {
      this.body.velocity.x -= this.moveSpeed;
    }
    if(keys.isDown(Phaser.Keyboard.RIGHT)) {
      this.body.velocity.x += this.moveSpeed;
    }

    this.body.velocity.setMagnitude(this.moveSpeed);

    this.game.physics.arcade.collide(this, colliders);

    if(this.itemGroup.length > 0) {
      var item = this.itemGroup.getAt(this.currentItem);
      item.update(); 
    }
  }


  return Player;

});