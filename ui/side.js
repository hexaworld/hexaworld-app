var css = require('dom-css')
var _ = require('lodash')
var animate = require('animateplus')
var EventEmitter = require('events').EventEmitter

module.exports = function(container) {
  var width = container.clientWidth
  var height = container.clientHeight
  var size = height * 0.6
  var ismobile = width < height

  var events = new EventEmitter()

  var offset = ismobile ? 0 : Math.PI / 6
  var points = _.range(7).map(function (i) {
    var dx = (ismobile ? 0.45 : 0.32) * size * Math.cos(i * 2 * Math.PI / 6 + offset) - size / 6
    var dy = 0.32 * size * Math.sin(i * 2 * Math.PI / 6 + offset) + size / 2
    return [dx, dy]
  })

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', size)
  svg.setAttribute('height', size)
  css(svg, {
    position: 'fixed',
    display: 'block',
    zIndex: 2000,
    pointerEvents: 'none'
  })
  if (ismobile) {
    css(svg, {right: 0, top: 0, transform: 'translateX(0px)'})
  } else {
    css(svg, {left: 0, top: height * 0.5 - size / 2})
  }
  container.appendChild(svg)

  var hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  hex.setAttribute("points", points.join(' '))
  css(hex, {
    fill: 'rgb(10,10,10)',
    stroke: 'rgb(155,155,155)',
    strokeWidth: 5,
    strokeLinejoin: 'round',
    cursor: 'pointer',
    webkitTapHighlightColor: 'rgba(0,0,0,0)',
    pointerEvents: 'all'
  })
  svg.appendChild(hex)

  var menu = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  menu.innerHTML = 'MENU'
  menu.setAttribute("fill", 'rgb(200,200,200)')
  menu.setAttribute("font-size", ismobile ? size * 0.07 : size * 0.0625)
  menu.setAttribute("text-anchor", 'middle')
  menu.setAttribute("dominant-baseline", 'hanging')
  var t = ismobile
    ? 'translate(' + size * 0.83 + ',' + size * 0.035 + ')rotate(0)'
    : 'translate(' + size * 0.025 + ',' + size * 0.5 + ')rotate(-90)'
  menu.setAttribute('transform', t)
  css(menu, {opacity: 0, pointerEvents: 'menu'})
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
        translateX: ismobile ? [size * 1.09, size * 2] : [0, -100],
        translateY: ismobile ? [size * -0.636, size * -0.636] : [0, 0],
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
        translateX: ismobile ? [size * 2, size * 1.09] : [-100, 0],
        translateY: ismobile ? [size * -0.636, size * -0.636] : [0, 0],
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