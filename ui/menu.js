var _ = require('lodash')
var animate = require('animateplus')
var EventEmitter = require('events').EventEmitter

var ismobile = (window.outerWidth < 480) ? true : false

module.exports = function(container) {
  var width = container.clientWidth
  var height = container.clientHeight

  if (height * 0.7 > width) {
    height = width * (1 / 0.7)
  }

  var wrapper = document.createElement('div')
  wrapper.id = 'menu'
  wrapper.style.width = height * 0.6
  wrapper.style.height = '97%'
  wrapper.style.top = '3%'
  wrapper.style.left = '0%'
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
  hex.style.strokeWidth = 4
  hex.style.strokeLinejoin = 'round'
  hex.style.transformOrigin = 'center'
  svg.appendChild(hex)

  var levels = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  levels.setAttribute("fill", 'rgb(200,200,200)')
  levels.setAttribute("font-size", size / 7.5)
  levels.setAttribute("text-anchor", 'middle')
  levels.setAttribute('transform', 'translate(' + pointsflat[5][0] + ',' + pointsflat[5][1] + ')rotate(30)')
  levels.setAttribute("class", "tappable")
  levels.style.position = 'absolute'
  levels.style.cursor = 'pointer'
  levels.style.webkitTapHighlightColor = 'rgba(0,0,0,0)'
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
  settings.style.webkitTapHighlightColor = 'rgba(0,0,0,0)'
  settings.innerHTML = 'SETTINGS'
  svg.appendChild(settings)

  var about = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  about.setAttribute("fill", 'rgb(200,200,200)')
  about.setAttribute("font-size", size / 7.5)
  about.setAttribute("text-anchor", 'middle')
  about.setAttribute('transform', 'translate(' + pointsflat[3][0] + ',' + pointsflat[3][1] + ')rotate(-90)')
  about.innerHTML = 'ABOUT'
  about.style.cursor = 'pointer'
  about.style.webkitTapHighlightColor = 'rgba(0,0,0,0)'
  svg.appendChild(about)

  levels.onclick = function(event) {
    levels.setAttribute("fill", "rgb(255,255,255)")
    events.emit('click', 'levels')
  }

  settings.onclick = function(event) {
    settings.setAttribute("fill", "rgb(255,255,255)")
    events.emit('click', 'settings')
  }

  about.onclick = function(event) {
    about.setAttribute("fill", "rgb(255,255,255)")
    events.emit('click', 'about')
  }

  wrapper.style.opacity = 0

  return {
    hide: function() {
      animate({
        el: wrapper,
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad'
      })
    },

    show: function() {
      about.setAttribute("fill", "rgb(200,200,200)")
      levels.setAttribute("fill", "rgb(200,200,200)")
      settings.setAttribute("fill", "rgb(200,200,200)")
      animate({
        el: wrapper,
        opacity: [0, 1],
        duration: 200,
        easing: 'easeInQuad'
      })
    },

    events: events
  }

}