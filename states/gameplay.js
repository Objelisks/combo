define(function(require, exports) {
  var Terrain = require('terrain');
  var colliders = require('collider');
  var preload = require('preload');

  var GameplayState = {

    preload: function() {
      preload.preload(this.game);
      this.game.load.tilemap('tilemap', './tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('tileset', './tilemaps/tileset.png');

      console.log('done preloading');
    },

    create: function() {
      this.game.world.setBounds(0, 0, 1000, 1000);
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      //colliders = this.game.add.group();
      //collider.setup(this.game);

      var tilemap = new Terrain(this.game, 'tilemap');
    },

    update: function() {

    }

  };

  return GameplayState;
});