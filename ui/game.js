var css = require('dom-css')
var hexaworld = require('hexaworld/play.js')
var animate = require('animateplus')

module.exports = function(container, level) {
  var wrapper = document.createElement('div')
  css(wrapper, {height: '100%', width: '100%', position: 'absolute'})
  container.appendChild(wrapper)

  var game = document.createElement('div')
  game.id = 'game-container'
  css(game, {height: '100%'})
  wrapper.appendChild(game)
  var play = hexaworld('game-container', level)

  css(wrapper, {opacity: 0, pointerEvents: 'none'})

  return {
    events: play.events,

    reload: function (updated) {
      play.reload(updated)
    },

    hide: function() {
      css(wrapper, {opacity: 0, pointerEvents: 'none'})
      play.pause()
    },

    show: function() {
      css(wrapper, {opacity: 1, pointerEvents: 'all'})
    }
  }
}