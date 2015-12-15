var _ = require('lodash')

module.exports = function() {
  var container = document.getElementById('menu-container')

  var levels = document.createElement('div')
  levels.innerHTML = 'levels'
  container.appendChild(levels)

  return {
    hide: function() {
      levels.style.display = 'none'
    },

    show: function() {
      levels.style.display = 'block'
    }
  }

}