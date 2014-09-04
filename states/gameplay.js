define(function(require, exports) {
  var TerrainBuilder = require('terrain');
  var colliders = require('collider');
  var preload = require('preload');

  var GameplayState = {

    preload: function() {
      preload.preload(this.game);
      this.game.load.tilemap('tilemap', './tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.spritesheet('tileset', './tilemaps/tileset.png', 64, 64);

      console.log('done preloading');
    },

    create: function() {
      this.game.world.setBounds(0, 0, 1000, 1000);
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      //colliders = this.game.add.group();
      //collider.setup(this.game);

      var tilemap = new TerrainBuilder(this.game, 'tilemap');
      tilemap.build();
    },

    update: function() {

    }

  };

  return GameplayState;
});