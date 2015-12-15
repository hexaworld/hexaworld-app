var _ = require('lodash')
var EventEmitter = require('events').EventEmitter

module.exports = function() {
  var container = document.getElementById('side')

  var size = container.clientWidth / 2

  var events = new EventEmitter()

  var points = _.range(7).map(function (i) {
    var dx = 0.32 * size * Math.cos(i * 2 * Math.PI / 6 + Math.PI / 6) - size / 6
    var dy = 0.32 * size * Math.sin(i * 2 * Math.PI / 6 + Math.PI / 6) + size / 2
    return [dx, dy]
  })

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', size)
  svg.setAttribute('height', size)
  svg.style.position = 'absolute'
  svg.style.display = 'block'
  svg.style.top = '50%'
  svg.style.transform = 'translateY(-50%)'
  svg.style.left = 0
  container.appendChild(svg)

  var hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  hex.setAttribute("points", points.join(' '))
  hex.style.fill = 'rgb(55,55,55)'
  hex.style.stroke = 'rgb(155,155,155)'
  hex.style.strokeWidth = '5'
  hex.style.strokeLinejoin = 'round'
  svg.appendChild(hex)

  var menu = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  menu.setAttribute("class", 'menu')
  menu.setAttribute("fill", 'rgb(200,200,200)')
  menu.setAttribute("font-size", size / 16)
  menu.setAttribute("text-anchor", 'middle')
  menu.setAttribute('transform', 'rotate(90)')
  menu.setAttribute("dominant-baseline", 'hanging')
  menu.innerHTML = 'MENU'
  menu.setAttribute('transform', 'translate(' + size/40 + ',' + size/2 + ')rotate(-90)')
  svg.appendChild(menu)

  menu.onclick = function() {
    events.emit('click', true)
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