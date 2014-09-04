define(function(require, exports) {

  var colliders = require('collider');

  var BreakableBlock = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'tileset', 3);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;

    this.properties = {
      'solid': true,
      'breakable': true
    }

    this.health = 1;
  }

  BreakableBlock.prototype = Object.create(Phaser.Sprite.prototype);

  BreakableBlock.prototype.update = function() {
    this.game.physics.arcade.collide(this, colliders);
  }

  return BreakableBlock;
});