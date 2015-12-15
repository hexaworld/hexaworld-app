var hexaworld = require('hexaworld/play.js')
var animate = require('animateplus')

module.exports = function() {
  var play
  container = document.getElementById('game-container')

  return {
    init: function (level) {
      play = hexaworld('game-container', level)
      container.style.display = 'none'
    },

    reload: function (level) {
      console.log('reloading')
      play.reload(level)
    },

    hide: function() {
      play.pause()
      animate({
        el: container,
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad',
        complete: function() {
          container.style.display = 'none'
        }
      })
    },

    show: function() {
      play.resume()
      animate({
        el: container,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeInQuad'
      })
      container.style.display = 'block'
    }
  }
}