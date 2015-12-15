var hexaworld = require('hexaworld/play.js')
var animate = require('animateplus')

module.exports = function() {
  var wrapper = document.createElement('div')
  wrapper.style.width = '100%'
  wrapper.style.height = '100%'
  wrapper.style.position = 'absolute'
  wrapper.style.pointerEvents = 'none'
  container.appendChild(wrapper)

  var game = document.createElement('div')
  game.id = 'game-container'
  game.style.width = '35%'
  game.style.height = '100%'
  game.style.margin = '0 auto'
  wrapper.appendChild(game)

  var play

  return {
    init: function (level) {
      play = hexaworld('game-container', level)
      wrapper.style.display = 'none'
    },

    reload: function (level) {
      console.log('reloading')
      play.reload(level)
    },

    hide: function() {
      play.pause()
      animate({
        el: wrapper,
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad',
        complete: function() {
          wrapper.style.display = 'none'
        }
      })
    },

    show: function() {
      play.resume()
      animate({
        el: wrapper,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeInQuad'
      })
      wrapper.style.display = 'block'
    }
  }
}