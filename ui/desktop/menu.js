var _ = require('lodash')
var animate = require('animateplus')
var EventEmitter = require('events').EventEmitter

module.exports = function(container) {
  var wrapper = document.createElement('div')
  wrapper.style.width = '35%'
  wrapper.style.height = '100%'
  wrapper.style.left = 0
  wrapper.style.right = 0
  wrapper.style.margin = '0 auto'
  wrapper.style.position = 'absolute'
  container.appendChild(wrapper)

  var size = wrapper.clientWidth / 2

  var events = new EventEmitter()

  var points = _.range(7).map(function (i) {
    var dx = 0.9 * size * Math.cos(i * 2 * Math.PI / 6 + Math.PI / 6) + size
    var dy = 0.9 * size * Math.sin(i * 2 * Math.PI / 6 + Math.PI / 6) + size
    return [dx, dy]
  })

  var pointsflat = _.range(7).map(function (i) {
    var dx = 0.9 * size * Math.cos(i * 2 * Math.PI / 6) + size
    var dy = 0.9 * size * Math.sin(i * 2 * Math.PI / 6) + size
    return [dx, dy]
  })

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', size * 2)
  svg.setAttribute('height', size * 2.1)
  svg.style.position = 'relative'
  svg.style.display = 'block'
  svg.style.top = '50%'
  svg.style.transform = 'translateY(-50%)'
  wrapper.appendChild(svg)

  var hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  hex.setAttribute("points", points.join(' '))
  hex.style.fill = 'none'
  hex.style.stroke = 'rgb(150,150,150)'
  hex.style.strokeWidth = '5'
  hex.style.strokeLinejoin = 'round'
  hex.style.transformOrigin = 'center'
  svg.appendChild(hex)

  var levels = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  levels.setAttribute("fill", 'rgb(200,200,200)')
  levels.setAttribute("font-size", size / 7.5)
  levels.setAttribute("text-anchor", 'middle')
  levels.setAttribute('transform', 'translate(' + pointsflat[5][0] + ',' + pointsflat[5][1] + ')rotate(30)')
  levels.style.position = 'absolute'
  levels.style.transformOrigin = 'center'
  levels.style.cursor = 'pointer'
  levels.innerHTML = 'LEVELS'
  svg.appendChild(levels)

  var settings = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  settings.setAttribute("fill", 'rgb(200,200,200)')
  settings.setAttribute("font-size", size / 7.5)
  settings.setAttribute("text-anchor", 'middle')
  settings.setAttribute("dominant-baseline", 'hanging')
  settings.setAttribute('transform', 'translate(' + pointsflat[1][0] + ',' + pointsflat[1][1] + ')rotate(-30)')
  settings.style.position = 'absolute'
  settings.style.cursor = 'pointer'
  settings.innerHTML = 'SETTINGS'
  svg.appendChild(settings)

  var about = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  about.setAttribute("fill", 'rgb(200,200,200)')
  about.setAttribute("font-size", size / 7.5)
  about.setAttribute("text-anchor", 'middle')
  about.setAttribute('transform', 'translate(' + pointsflat[3][0] + ',' + pointsflat[3][1] + ')rotate(-90)')
  about.innerHTML = 'ABOUT'
  about.style.cursor = 'pointer'
  svg.appendChild(about)

  levels.onclick = function(event) {
    events.emit('click', 'levels')
  }

  settings.onclick = function(event) {
    events.emit('click', 'settings')
  }

  about.onclick = function(event) {
    events.emit('click', 'about')
  }

  wrapper.style.display = 'none'

  return {
    hide: function() {
      animate({
        el: hex,
        opacity: [1, 0],
        duration: 200,
        easing: 'easeInQuad'
      })
      animate({
        el: levels,
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad'
      })
      animate({
        el: about,
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad'
      })
      animate({
        el: settings,
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad',
        complete: function() {
          wrapper.style.display = 'none'
        }
      })
    },

    show: function() {
      wrapper.style.display = 'block'
      animate({
        el: hex,
        opacity: [0, 1],
        duration: 200,
        easing: 'easeInQuad'
      })
      animate({
        el: levels,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeInQuad'
      })
      animate({
        el: about,
        opacity: [0, 1],
        duration: 400,
        easing: 'easeInQuad'
      })
      animate({
        el: settings,
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInQuad'
      })
    },

    events: events
  }

}