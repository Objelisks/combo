define(function(require, effects) {
  var colliders = require('collider');
  var preload = require('preload');
  var DamageTypes = require('constants').DamageTypes;

  var bowImage, projectileImage;

  preload.add(function(game) {
    bowImage = game.add.bitmapData(32, 32);
    bowImage.fill(230, 230, 230);
    bowImage.rect(2, 2, 28, 28, 'rgb(120, 194, 196)');

    projectileImage = game.add.bitmapData(32, 32);
    projectileImage.fill(120, 194, 196);
  });

  // Projectile spawned by Bow
  var Arrow = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, projectileImage);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.anchor.setTo(0.5, 0.5);

    this.properties = {
      'hitbox': true
    };
    this.effect = {
      'damage': 1.0,
      'type': DamageTypes.Arrow
    }
  }
  Arrow.prototype = Object.create(Phaser.Sprite.prototype);

  Arrow.onHit = function() {
    this.game.remove(this);
  }

  Arrow.prototype.update = function() {
    this.game.physics.arcade.collide(this, colliders, this.collideCallback, undefined, this);
  }

  Arrow.prototype.collideCallback = function(projectile, other) {
    if(other.properties['solid'] && !other.properties['player']) {
      if(other.properties['health']) {
        other.damage(this.effect.damage);
      }
    }
    this.kill();
  }

  // Bow Item
  var BowItem = function(game, owner) {
    Phaser.Sprite.call(this, game, 0, 0, bowImage);
    this.owner = owner;
    this.fireSpeed = 300;
    this.anchor.setTo(0.5, 0.5);
    this.properties = {
      'hitbox': true
    };
  }
  BowItem.prototype = Object.create(Phaser.Sprite.prototype);

  BowItem.prototype.update = function() {
    var direction = this.owner.body.facing;
    switch(direction) {
      case Phaser.UP:
        this.x = 0;
        this.y = -this.owner.body.height/2;
        break;
      case Phaser.LEFT:
        this.x = -this.owner.body.width/2;
        this.y = 0;
        break;
      case Phaser.RIGHT:
        this.x = this.owner.body.width/2;
        this.y = 0;
        break;
      case Phaser.DOWN:
      default:
        this.x = 0;
        this.y = this.owner.body.height/2;
        break;
    }

  }

  BowItem.prototype.use = function() {
    var newProjectile = new Arrow(this.game, this.world.x, this.world.y);

    var direction = this.owner.body.facing;
    switch(direction) {
      case Phaser.UP:
        newProjectile.body.velocity.y -= this.fireSpeed;
        break;
      case Phaser.LEFT:
        newProjectile.body.velocity.x -= this.fireSpeed;
        break;
      case Phaser.RIGHT:
        newProjectile.body.velocity.x += this.fireSpeed;
        break;
      case Phaser.DOWN:
      default:
        newProjectile.body.velocity.y += this.fireSpeed;
        break;
    }

    this.game.add.existing(newProjectile);
  }

  return BowItem;

});