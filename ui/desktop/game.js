var hexaworld = require('hexaworld/play.js')

module.exports = function() {
  var play

  return {
    load: function(level) {
        play = hexaworld('game-container', level)
        play.start()
    },

    hide: function() {
      document.getElementById('game-container').style.display = 'none'
    },

    show: function() {
      play.pause()
      document.getElementById('game-container').style.display = 'block'
    }
  }
}