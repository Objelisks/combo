define(function(require, exports) {
  //var Phaser = require('phaser');

  // global init
  var game = new Phaser.Game(640, 480, Phaser.AUTO, '');
  game.state.add('gameplay', require('states/gameplay'));
  game.state.start('gameplay');


  // player

  // terrain
});