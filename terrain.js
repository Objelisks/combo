define(function(require, exports) {
  var Player = require('player');
  var Enemy = require('enemy');
  var colliders = require('collider');

  var Terrain = function(game, tilemap) {
    Phaser.Tilemap.call(this, game, tilemap);
    this.addTilesetImage('tileset');
    this.setCollisionBetween(1, 1);

    var layer = this.createLayer('Tiles');
    layer.resizeWorld();

    layer.getTiles(0, 0, 200, 200).forEach(function(tile) {
      console.log(tile);
    });

    this.objects.Spawns.forEach(function(obj) {
      console.log('spawning', obj.name, obj.type);
      switch(obj.name) {
        case "Player":
          var player = new Player(game, obj.x, obj.y);
          colliders.push(player);
          game.add.existing(player);
          break;
        case "Enemy":
          var enemy = new Enemy(game, obj.x, obj.y);
          colliders.push(enemy);
          game.add.existing(enemy);
          break;
      }
    });

    colliders.push(layer);
  }
  Terrain.prototype = Object.create(Phaser.Tilemap.prototype);

  return Terrain;
});