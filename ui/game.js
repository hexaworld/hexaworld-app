var css = require('dom-css')
var hexaworld = require('hexaworld/play.js')
var animate = require('animateplus')

module.exports = function(container, level) {
  var wrapper = document.createElement('div')
  css(wrapper, {width: '100%', height: '100%', position: 'absolute'})
  container.appendChild(wrapper)

  var game = document.createElement('div')
  game.id = 'game-container'
  css(game, {width: '100%', height: '100%', margin: '0px auto', position: 'absolute'})
  wrapper.appendChild(game)

  var play = hexaworld('game-container', level)

  css(wrapper, {opacity: 0, pointerEvents: 'none'})

  return {
    events: play.events,

    reload: function (updated) {
      play.reload(updated)
    },

    hide: function() {
      play.pause()
      if (wrapper.style.opacity == 1) {
        animate({
          el: wrapper,
          opacity: [1, 0],
          duration: 200,
          easing: 'easeInQuad'
        })
      }
    },

    show: function() {
      animate({
        el: wrapper,
        opacity: [0, 1],
        duration: 200,
        easing: 'easeInQuad',
        complete: function () {
          play.resume()
        }
      })
    }
  }
}