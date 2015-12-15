var _ = require('lodash')

module.exports = function() {
  var container = document.getElementById('about-container')
  container.style.display = 'none'

  var about = document.createElement('div')
  about.innerHTML = 'about'
  container.appendChild(about)

  return {
    hide: function() {
      container.style.display = 'none'
    },

    show: function() {
      container.style.display = 'block'
    }
  }

}