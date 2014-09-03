define(function(require, exports) {
  var colliders = require('collider');
  var preload = require('preload');
  var DamageTypes = require('constants').DamageTypes;

  var explosionImage, bombItemImage, bombImage;

  preload.add(function(game) {
    explosionImage = game.add.bitmapData(64, 64);
    explosionImage.fill(255, 153, 56)

    bombImage = game.add.bitmapData(32, 32);
    bombImage.fill(120, 194, 196);

    bombItemImage = game.add.bitmapData(32, 32);
    bombItemImage.fill(230, 230, 230);
    bombItemImage.rect(2, 2, 28, 28, 'rgb(120, 194, 196)');
  });

  var BombExplosion = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, explosionImage);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.setTo(0.5, 0.5);
    this.alreadyHit = {};
    this.body.immovable = true;
    this.properties = {
      'hitbox': true
    };
    this.effect = {
      'damage': 1.0,
      'type': DamageTypes.Explosion
    };

    this.lifespan = 500;
  }
  BombExplosion.prototype = Object.create(Phaser.Sprite.prototype);

  BombExplosion.prototype.update = function() {
    this.game.physics.arcade.overlap(this, colliders, this.collideCallback, undefined, this);
  }

  BombExplosion.prototype.collideCallback = function(projectile, other) {
    if(other.properties['solid'] && !other.properties['player']) {
      if(other.properties['health'] && !this.alreadyHit[other]) {
        other.damage(this.effect.damage);
        this.alreadyHit[other] = true;
      }
    }
  }

  // Projectile spawned by BombItem
  var Bomb = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, bombImage);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.anchor.setTo(0.5, 0.5);
    this.body.drag.setTo(300, 300);

    this.properties = {
      'solid': true
    };

    this.lifespan = 3000;
  }
  Bomb.prototype = Object.create(Phaser.Sprite.prototype);

  Bomb.prototype.update = function() {
    this.game.physics.arcade.collide(this, colliders);
  }

  Bomb.prototype.kill = function() {
    console.log('boom');
    var explosion = new BombExplosion(this.game, this.world.x, this.world.y);
    this.game.add.existing(explosion);
    Phaser.Sprite.prototype.kill.call(this);
  }


  var BombItem = function(game, owner) {
    Phaser.Sprite.call(this, game, 0, 0, bombItemImage);
    this.owner = owner;
  }
  BombItem.prototype = Object.create(Phaser.Sprite.prototype);

  BombItem.prototype.use = function() {
    var bomb = new Bomb(this.game, this.world.x, this.world.y);
    this.game.add.existing(bomb);
  }

  return BombItem;
});