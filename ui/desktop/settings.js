var _ = require('lodash')
var animate = require('animateplus')

module.exports = function(container) {
  var wrapper = document.createElement('div')
  wrapper.style.width = '85%'
  wrapper.style.height = '80%'
  wrapper.style.top = '10%'
  wrapper.style.bottom = '10%'
  wrapper.style.left = 0
  wrapper.style.right = 0
  wrapper.style.margin = '0 auto'
  wrapper.style.position = 'absolute'
  wrapper.style.pointerEvents = 'none'
  container.appendChild(wrapper)

  var size = wrapper.clientWidth

  var settings = document.createElement('div')
  settings.className = 'h1'
  settings.style.position = 'absolute'
  settings.style.top = size * 0.06
  settings.style.left = size * 0.08
  settings.style.fontSize = size * 0.055
  settings.innerHTML = 'SETTINGS'
  wrapper.appendChild(settings)

  wrapper.style.opacity = 0
  wrapper.style.pointerEvents = 'none'

  return {
    hide: function() {
      if (wrapper.style.opacity == 1) {
        animate({
          el: wrapper,
          opacity: [1, 0],
          duration: 200,
          easing: 'easeInCirc',
          complete: function () {
            wrapper.style.pointerEvents = 'none'
          }
        })
      }
    },

    show: function() {
      animate({
        el: wrapper,
        opacity: [0, 1],
        duration: 200,
        easing: 'easeInCirc',
        complete: function () {
          wrapper.style.pointerEvents = 'all'
        }
      })
    }
  }

}