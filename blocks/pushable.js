define(function(require, exports) {

  var colliders = require('collider');

  var PushableBlock = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'tileset', 2);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.drag.setTo(1000, 1000);
    this.body.mass = 2;
    this.body.maxVelocity.setTo(1, 1);

    this.properties = {
      'solid': true,
      'falls': true
    }
    this.z = 1;
  }

  PushableBlock.prototype = Object.create(Phaser.Sprite.prototype);

  PushableBlock.prototype.update = function() {
    this.game.physics.arcade.collide(this, colliders);
  }

  return PushableBlock;
});