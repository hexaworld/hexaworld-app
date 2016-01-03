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
  var width = window.innerWidth
  var offset = ismobile ? 0 : Math.PI / 6
  var points = _.range(7).map(function (i) {
    var dx = 0.8 * height * Math.cos(i * 2 * Math.PI / 6 + offset) + height * 0.5
    var dy = 0.8 * height * Math.sin(i * 2 * Math.PI / 6 + offset) + height * 0.4
    return [dx, dy]
  })
  if (ismobile) {
    points = [points[2], points[1], points[0], points[1]]
  } else {
    points = [points[5], points[0], points[1], points[0]]
  }

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', height * 1.2)
  svg.setAttribute('height', height * 1.2)
  svg.style.position = 'absolute'
  svg.style.display = 'block'
  svg.style.pointerEvents = 'none'
  svg.style.position = 'fixed'
  svg.style.bottom = ismobile ? height * 0.2 : -height * 0.035
  var menuwidth = document.getElementById('menu').clientWidth
  svg.style.right = ismobile ? -height * 0.15 : width * 0.5 - menuwidth * 0.5 * 0.8
  svg.style.pointerEvents = 'none'
  wrapper.appendChild(svg)

  var hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  hex.setAttribute('points', points.join(' '))
  hex.style.fill = 'none'
  hex.style.stroke = 'rgb(155,155,155)'
  hex.style.strokeWidth = '5'
  svg.appendChild(hex)

  var settings = document.createElement('div')
  settings.style.position = 'absolute'
  settings.style.top = ismobile ? height * 0.5 : size * 0.06
  settings.style.left = ismobile ? size * 0 : size * 0.15
  settings.style.fontSize = ismobile ? size * 0.15 : size * 0.055
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