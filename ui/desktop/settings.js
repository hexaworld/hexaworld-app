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

  var settings = document.createElement('div')
  settings.className = 'h1'
  settings.style.position = 'absolute'
  settings.style.top = size * 0.06
  settings.style.left = size * 0.08
  settings.style.fontSize = size * 0.055
  settings.innerHTML = 'SETTINGS'
  wrapper.appendChild(settings)

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