var _ = require('lodash')

module.exports = function() {
  var container = document.getElementById('menu-container')

  var about = document.createElement('div')
  about.innerHTML = 'about'
  container.appendChild(about)

  return {
    hide: function() {
      about.style.display = 'none'
    },

    show: function() {
      about.style.display = 'block'
    }
  }

}