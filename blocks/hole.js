define(function(require, exports) {

  var PushableBlock = require('blocks/pushable');
  var colliders = require('collider');

  var HoleBlock = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'tileset', 4);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.body.moves = false;
    this.properties = {
    }
    this.z = 0;
  }

  HoleBlock.prototype = Object.create(Phaser.Sprite.prototype);

  HoleBlock.prototype.update = function() {
    this.game.physics.arcade.overlap(this, colliders, this.collideCallback, this.processCallback, this);
  }

  HoleBlock.prototype.processCallback = function(self, other) {
    if(other.properties['falls']) {
      return true;
    }
    return false;
  }

  HoleBlock.prototype.collideCallback = function(self, other) {
    if(this.game.physics.arcade.distanceBetween(self, other) < 32) {
      if(other instanceof PushableBlock && !other.fallingPhase && !self.fallingPhase) {
        other.fallingPhase = true;
        self.fallingPhase = true;
        var tween = this.game.add.tween(other).to({x: self.world.x, y: self.world.y}, 1000, Phaser.Easing.Exponential.In).start();
        tween.onComplete.add(function() {
          console.log(self.world.y, other.y);
          self.visible = false;
          self.body.enable = false;
          other.visible = false;
          other.body.enable = false;
        });
      } else {

      }
    }
  }

  return HoleBlock;
});