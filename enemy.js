define(function(require, exports) {

  var colliders = require('collider');
  var preload = require('preload');

  var bitmap;

  preload.add(function(game) {
    bitmap = game.add.bitmapData(48, 48);
    bitmap.fill(181, 202, 160, 1.0);
  });

  var Enemy = function(game, x, y) {
    x = x || 0;
    y = y || 0;
    Phaser.Sprite.call(this, game, x, y, bitmap);
    bitmap.add(this);

    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.moveSpeed = 200;
    this.anchor.setTo(0.5, 0.5);

    this.properties = {
      'solid': true,
      'health': true,
      'actor': true
    }

    this.health = 10.0;
  }
  Enemy.prototype = Object.create(Phaser.Sprite.prototype);

  Enemy.prototype.update = function() {
    var keys = this.game.input.keyboard;
    this.body.velocity.setTo(Math.random()-0.5, Math.random()-0.5);
    this.body.velocity.setMagnitude(this.moveSpeed);

    this.game.physics.arcade.collide(this, colliders);
  }

  Enemy.prototype.damage = function(amount) {
    this.flash();
    Phaser.Sprite.damage.call(this, amount);
  }


  return Enemy;

});