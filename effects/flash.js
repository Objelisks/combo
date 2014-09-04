define(function(require, exports) {
  var flash = function(sprite, duration) {
    sprite.tint = 0xff0000;
    var timer = sprite.game.time.create(true);
    timer.add(duration, function() {
      sprite.tint = 0xffffff;
    });
    timer.start();
  }

  return flash;
});