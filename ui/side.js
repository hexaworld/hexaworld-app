var _ = require('lodash')
var animate = require('animateplus')
var EventEmitter = require('events').EventEmitter

module.exports = function(container) {
  var size = window.innerHeight * 0.6

  var ismobile = window.innerWidth < window.innerHeight

  var events = new EventEmitter()
  var t

  var offset = ismobile ? 0 : Math.PI / 6
  var points = _.range(7).map(function (i) {
    var dx = (ismobile ? 0.45 : 0.32) * size * Math.cos(i * 2 * Math.PI / 6 + offset) - size / 6
    var dy = 0.32 * size * Math.sin(i * 2 * Math.PI / 6 + offset) + size / 2
    return [dx, dy]
  })

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', size)
  svg.setAttribute('height', size)
  svg.style.position = 'absolute'
  svg.style.display = 'block'
  svg.style.zIndex = 2000
  svg.style.pointerEvents = 'none'
  if (ismobile) {
    svg.style.position = 'fixed'
    svg.style.bottom = 0
    svg.style.left = 0
    svg.style.transform = 'translateX(0px)'
  } else {
    svg.style.position = 'fixed'
    svg.style.top = window.innerHeight * 0.5 - size / 2
    svg.style.left = 0
  }
  
  container.appendChild(svg)

  var hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  hex.setAttribute("points", points.join(' '))
  hex.style.fill = 'rgb(45,45,45)'
  hex.style.stroke = 'rgb(155,155,155)'
  hex.style.strokeWidth = '5'
  hex.style.strokeLinejoin = 'round'
  hex.style.cursor = 'pointer'
  hex.style.webkitTapHighlightColor = 'rgba(0,0,0,0)'
  hex.style.pointerEvents = 'all'
  svg.appendChild(hex)

  var menu = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  menu.setAttribute("fill", 'rgb(200,200,200)')
  menu.setAttribute("font-size", size / 16)
  menu.setAttribute("text-anchor", 'middle')
  menu.setAttribute("dominant-baseline", 'hanging')
  menu.style.opacity = 0
  menu.style.pointerEvents = 'none'
  menu.innerHTML = 'MENU'
  t = ismobile
    ? 'translate(' + size * 0.15 + ',' + size * 0.92 + ')rotate(0)'
    : 'translate(' + size * 0.025 + ',' + size * 0.5 + ')rotate(-90)'
  menu.setAttribute('transform', t)
  svg.appendChild(menu)

  hex.onclick = function() {
    menu.setAttribute("fill", "rgb(255,255,255)")
    events.emit('click', true)
  }

  hex.style.opacity = 0
  menu.style.opacity = 0

  return {
    hide: function() {
      animate({
        el: hex,
        translateX: ismobile ? [size * 0.21, -200] : [0, -100],
        translateY: ismobile ? [size * 0.656, size * 0.656] : [0, 0],
        opacity: [1, 0],
        duration: 200,
        easing: 'easeInCirc'
      })
      animate({
        el: menu,
        opacity: [1, 0],
        duration: 400
      })
    },

    show: function() {
      menu.setAttribute("fill", "rgb(200,200,200)")
      animate({
        el: hex,
        translateX: ismobile ? [-200, size * 0.21] : [-100, 0],
        translateY: ismobile ? [size * 0.656, size * 0.656] : [0, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeInQuad',
        complete: function () {
          animate({
            el: menu,
            opacity: [0, 1],
            duration: 150
          })
        }
      })
      
    },

    events: events
  }

}