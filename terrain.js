define(function(require, exports) {
  var Player = require('player');
  var Enemy = require('enemy');
  var colliders = require('collider');
  var blocks = require('blocks/all');

  var TerrainBuilder = function(game, tilemap) {
    Phaser.Tilemap.call(this, game, tilemap);
    this.addTilesetImage('tileset');
    this.setCollisionBetween(1, 1);
  }
  TerrainBuilder.prototype = Object.create(Phaser.Tilemap.prototype);

  TerrainBuilder.prototype.build = function() {
    var game = this.game;

    var layer = this.createLayer('Tiles');
    layer.resizeWorld();

    this.forEach(function(block) {
      switch(block.index) {
        case 3: // push block
          var newBlock = new blocks.Pushable(game, block.worldX, block.worldY);
          colliders.push(newBlock);
          game.add.existing(newBlock);
          break;
        case 4: // breakable block
          var newBlock = new blocks.Breakable(game, block.worldX, block.worldY);
          colliders.push(newBlock);
          game.add.existing(newBlock);
          break;
        case 5: // button
        console.log('5');
          //game.add.existing(new blocks.Button(game, block.worldX, block.worldY));
          break;
        case 6: // door
        console.log('6');
          //game.add.existing(new blocks.Door(game, block.worldX, block.worldY));
          break;
        case 7: // hole
        console.log('7');
          var newBlock = new blocks.Hole(game, block.worldX, block.worldY);
          game.add.existing(newBlock);
          break;
        default:
          break;
      }
    }, this, 0, 0, this.width, this.height, 'Blocks');

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

  return TerrainBuilder;
});