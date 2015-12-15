var _ = require('lodash')

module.exports = function() {
  var container = document.getElementById('menu-container')

  var settings = document.createElement('div')
  settings.innerHTML = 'settings'
  container.appendChild(settings)

  return {
    hide: function() {
      settings.style.display = 'none'
    },

    show: function() {
      settings.style.display = 'block'
    }
  }

}