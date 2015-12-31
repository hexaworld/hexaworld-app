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

  var about = document.createElement('div')
  about.className = 'h1'
  about.style.position = 'absolute'
  about.style.top = size * 0.06
  about.style.left = size * 0.08
  about.style.fontSize = size * 0.055
  about.innerHTML = 'ABOUT'
  wrapper.appendChild(about)

  wrapper.style.opacity = 0

  return {
    hide: function() {
      console.log(wrapper.style.opacity)
      if (wrapper.style.opacity == 1) {
        animate({
          el: wrapper,
          opacity: [1, 0],
          duration: 200,
          easing: 'easeInCirc'
        })
      }
    },

    show: function() {
      animate({
        el: wrapper,
        opacity: [0, 1],
        duration: 200,
        easing: 'easeInCirc'
      })
    }
  }

}