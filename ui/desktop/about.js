var _ = require('lodash')

module.exports = function(container) {
  var wrapper = document.createElement('div')
  wrapper.style.width = '90%'
  wrapper.style.height = '100%'
  wrapper.style.left = 0
  wrapper.style.right = 0
  wrapper.style.margin = '0 auto'
  wrapper.style.position = 'absolute'
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

  wrapper.style.display = 'none'

  return {
    hide: function() {
      wrapper.style.display = 'none'
    },

    show: function() {
      wrapper.style.display = 'block'
    }
  }

}