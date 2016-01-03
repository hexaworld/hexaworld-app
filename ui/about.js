var _ = require('lodash')
var animate = require('animateplus')

module.exports = function(container) {
  var ismobile = window.innerWidth < window.innerHeight

  var wrapper = document.createElement('div')
  wrapper.style.width = '85%'
  wrapper.style.height = '90%'
  wrapper.style.top = '5%'
  wrapper.style.bottom = '5%'
  wrapper.style.left = 0
  wrapper.style.right = 0
  wrapper.style.margin = '0 auto'
  wrapper.style.position = 'absolute'
  wrapper.style.pointerEvents = 'none'
  container.appendChild(wrapper)

  var size = wrapper.clientWidth

  var height = window.innerHeight
  var offset = ismobile ? 0 : Math.PI / 6
  var points = _.range(7).map(function (i) {
    var dx = 0.8 * height * Math.cos(i * 2 * Math.PI / 6 + offset) + height * 0.7
    var dy = 0.8 * height * Math.sin(i * 2 * Math.PI / 6 + offset) + height * 0.4
    return [dx, dy]
  })

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', height * 1.2)
  svg.setAttribute('height', height * 1.2)
  svg.style.position = 'absolute'
  svg.style.display = 'block'
  svg.style.pointerEvents = 'none'
  svg.style.position = 'fixed'
  svg.style.bottom = -height * 0.035
  svg.style.left = window.innerWidth * 0.5 - document.getElementById('menu').clientWidth * 0.5 * 0.8
  svg.style.pointerEvents = 'none'
  wrapper.appendChild(svg)

  var hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  hex.setAttribute('points', [points[3], points[2], points[1], points[2]].join(' '))
  hex.style.fill = 'none'
  hex.style.stroke = 'rgb(155,155,155)'
  hex.style.strokeWidth = '5'
  svg.appendChild(hex)

  var about = document.createElement('div')
  about.style.position = 'absolute'
  about.style.top = size * 0.06
  about.style.left = size * 0.44
  about.style.fontSize = size * 0.055
  about.innerHTML = 'ABOUT'
  wrapper.appendChild(about)

  var text = document.createElement('p')
  text.style.position = 'absolute'
  text.style.top = size * 0.14
  text.style.left = size * 0.44
  text.style.width = size * 0.4
  text.style.color = 'rgb(155,155,155)'
  text.style.fontSize = size * 0.02
  text.innerHTML = "hexaworld is a game about learning and exploration <br><br>\n designed by neuroscientists and available as <a style='color: rgb(155,155,155)' href='https://github.com/hexaworld'>open source</a>"
  wrapper.appendChild(text)

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