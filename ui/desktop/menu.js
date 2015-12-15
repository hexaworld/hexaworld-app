var _ = require('lodash')
var EventEmitter = require('events').EventEmitter

module.exports = function() {
  var container = document.getElementById('menu-container')

  var size = container.clientWidth / 2

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
  container.appendChild(svg)

  var hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  hex.setAttribute("points", points.join(' '))
  hex.style.fill = 'rgb(55,55,55)'
  hex.style.stroke = 'rgb(150,150,150)'
  hex.style.strokeWidth = '5'
  hex.style.strokeLinejoin = 'round'
  svg.appendChild(hex)

  var levels = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  levels.setAttribute("class", 'menu')
  levels.setAttribute("fill", 'rgb(200,200,200)')
  levels.setAttribute("font-size", size / 7.5)
  levels.setAttribute("text-anchor", 'middle')
  levels.setAttribute('transform', 'translate(' + pointsflat[5][0] + ',' + pointsflat[5][1] + ')rotate(30)')
  levels.innerHTML = 'LEVELS'
  svg.appendChild(levels)

  var settings = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  settings.setAttribute("class", 'menu')
  settings.setAttribute("fill", 'rgb(200,200,200)')
  settings.setAttribute("font-size", size / 7.5)
  settings.setAttribute("text-anchor", 'middle')
  settings.setAttribute("dominant-baseline", 'hanging')
  settings.setAttribute('transform', 'translate(' + pointsflat[1][0] + ',' + pointsflat[1][1] + ')rotate(-30)')
  settings.style.position = 'absolute'
  settings.innerHTML = 'SETTINGS'
  svg.appendChild(settings)

  var about = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  about.setAttribute("class", 'menu')
  about.setAttribute("fill", 'rgb(200,200,200)')
  about.setAttribute("font-size", size / 7.5)
  about.setAttribute("text-anchor", 'middle')
  about.setAttribute('transform', 'translate(' + pointsflat[3][0] + ',' + pointsflat[3][1] + ')rotate(-90)')
  about.innerHTML = 'ABOUT'
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

  return {
    hide: function() {
      svg.style.display = 'none'
    },

    show: function() {
      svg.style.display = 'block'
    },

    events: events
  }

}