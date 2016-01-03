var _ = require('lodash')
var animate = require('animateplus')
var EventEmitter = require('events').EventEmitter

function hexagon(size, offset) {
  offset = offset || [0, 0]
  var points = _.range(7).map(function (i) {
    var dx = size * Math.cos(i * 2 * Math.PI / 6 + Math.PI / 6) + size + offset[0]
    var dy = size * Math.sin(i * 2 * Math.PI / 6 + Math.PI / 6) + size * 1.08 + offset[1]
    return [dx, dy]
  })
  return points
}

module.exports = function(container, state) {
  var ismobile = window.innerWidth < window.innerHeight

  var wrapper = document.createElement('div')
  wrapper.id = 'settings'
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

  var events = new EventEmitter()

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
  settings.style.fontSize = ismobile ? size * 0.15 : size * 0.06
  settings.innerHTML = 'SETTINGS'
  wrapper.appendChild(settings)

  var options = document.createElement('div')
  options.style.position = 'absolute'
  options.style.top = ismobile ? 0 : size * 0.16
  options.style.left = ismobile ? size * 0 : size * 0.15
  wrapper.appendChild(options)

  function createOption(key) {
    var item = document.createElement('div')
    item.style.marginBottom = size * 0.02
    options.appendChild(item)

    var iconsize = size * 0.03

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', iconsize * 4.2)
    svg.setAttribute('height', iconsize * 2.2)
    svg.style.position = 'absolute'
    svg.style.display = 'inline'
    svg.style.position = 'relative'
    svg.style.left = 0
    svg.style.verticalAlign = 'middle'
    svg.style.webkitTapHighlightColor = 'rgba(0,0,0,0)'
    item.appendChild(svg)

    var hex1 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    hex1.setAttribute('points', hexagon(iconsize).join(' '))
    hex1.style.fill = key.value ? 'rgb(45,45,45)' : 'rgb(140,140,140)'
    hex1.style.stroke = 'rgb(240,240,240)'
    hex1.style.strokeWidth = '3'
    hex1.style.cursor = 'pointer'
    svg.appendChild(hex1)   

    var hex2 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    hex2.setAttribute('points', hexagon(iconsize, [iconsize * 2.2, 0]).join(' '))
    hex2.style.fill = key.value ? 'rgb(140,140,140)' : 'rgb(45,45,45)'
    hex2.style.stroke = 'rgb(240,240,240)'
    hex2.style.strokeWidth = '3'
    hex2.style.cursor = 'pointer'
    svg.appendChild(hex2)
    
    var name = document.createElement('span')
    name.style.fontSize = Math.sqrt(size * 1)
    name.style.marginLeft = size * 0.02
    name.style.verticalAlign = 'middle'
    name.innerHTML = key.name
    item.appendChild(name)

    var br = document.createElement('br')
    item.appendChild(br)

    hex1.onclick = function () {
      hex1.style.fill = 'rgb(140,140,140)'
      hex2.style.fill = 'rgb(45,45,45)'
      events.emit('click', {name: key.name, value: false})
    }

    hex2.onclick = function () {
      hex1.style.fill = 'rgb(45,45,45)'
      hex2.style.fill = 'rgb(140,140,140)'
      events.emit('click', {name: key.name, value: true})
    }
  }

  state.forEach(function (key) {
    createOption(key)
  })

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
    },

    events: events
  }

}