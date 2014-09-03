define(function(require, exports) {
  var preloaderCallbacks = [];

  var preload = function(game) {
    preloaderCallbacks.forEach(function(callback) {
      callback(game);
    });
  }

  var add = function(callback) {
    preloaderCallbacks.push(callback);
  }

  return {
    'preload': preload,
    'add': add
  }
});