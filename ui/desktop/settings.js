var _ = require('lodash')

module.exports = function() {
  var container = document.getElementById('settings-container')
  container.style.display = 'none'

  var settings = document.createElement('div')
  settings.innerHTML = 'settings'
  container.appendChild(settings)

  return {
    hide: function() {
      container.style.display = 'none'
    },

    show: function() {
      container.style.display = 'block'
    }
  }

}