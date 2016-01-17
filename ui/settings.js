var css = require('dom-css')
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
  var width = container.clientWidth
  var height = container.clientHeight
  var ismobile = width < height
  var menuwidth = document.getElementById('menu').clientWidth

  var colors = {
    text1: 'rgb(150,150,150)',
    text2: 'rgb(220,220,220)',
    backStroke: 'rgb(120,120,120)',
    buttonStroke: 'none',
    buttonFill: 'rgb(10,10,10)',
    buttonFillSelect: 'rgb(120,120,120)'
  }

  var wrapper = document.createElement('div')
  wrapper.id = 'settings'
  css(wrapper, {
    width: '85%', 
    height: ismobile ? '80%' : '90%',
    top: ismobile ? '10%' : '5%',
    bottom: '5%', 
    left: 0, right: 0, 
    margin: '0 auto',
    position: 'absolute',
    pointerEvents: 'none'
  })
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
  css(svg, {
    position: 'absolute',
    display: 'block',
    pointerEvents: 'none',
    position: 'fixed',
    bottom: ismobile ? height * 0.05 : -height * 0.035,
    pointerEvents: 'none',
    right: ismobile ? -height * 0.15 : width * 0.5 - menuwidth * 0.5 * 0.8
  })
  wrapper.appendChild(svg)

  var hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  hex.setAttribute('points', points.join(' '))
  css(hex, {fill: 'none', stroke: colors.backStroke, strokeWidth: 5})
  svg.appendChild(hex)

  var settings = document.createElement('div')
  settings.innerHTML = 'SETTINGS'
  css(settings, {
    position: 'absolute',
    left: ismobile ? size * 0 : size * 0.15,
    fontSize: ismobile ? size * 0.15 : size * 0.06,
    fontColor: colors.text1
  })
  if (!ismobile) css(settings, {top: size * 0.06})
  if (ismobile) css(settings, {bottom: size * 0.2})
  wrapper.appendChild(settings)

  var options = document.createElement('div')
  css(options, {
    position: 'absolute', 
    top: ismobile ? size * 0.1 : size * 0.16,
    left: ismobile ? size * 0 : size * 0.15
  })
  wrapper.appendChild(options)

  function createOption(key) {
    var item = document.createElement('div')
    css(item, {marginBottom: ismobile ? size * 0.05 : size * 0.02})
    options.appendChild(item)

    var iconsize = ismobile ? size * 0.09 : size * 0.035

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', iconsize * 4.2)
    svg.setAttribute('height', iconsize * 2.2)
    css(svg, {
      position: 'absolute',
      display: 'inline',
      position: 'relative',
      left: 0,
      verticalAlign: 'middle',
      webkitTapHighlightColor: 'rgba(0,0,0,0)'
    })
    item.appendChild(svg)

    var button = {stroke: colors.buttonStroke, strokeWidth: 3, cursor: 'pointer'}

    var hex1 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    hex1.setAttribute('points', hexagon(iconsize).join(' '))
    css(hex1, {fill: key.value ? colors.buttonFill : colors.buttonFillSelect})
    css(hex1, button)
    svg.appendChild(hex1)   

    var hex2 = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    hex2.setAttribute('points', hexagon(iconsize, [iconsize * 2.2, 0]).join(' '))
    css(hex2, {fill: key.value ? colors.buttonFillSelect : colors.buttonFill})
    css(hex2, button)
    svg.appendChild(hex2)
    
    var name = document.createElement('span')
    name.innerHTML = key.name
    css(name, {
      fontSize: ismobile ? Math.sqrt(size * 1.6) : Math.sqrt(size * 1),
      marginLeft: ismobile ? size * 0.05 : size * 0.02,
      verticalAlign: 'middle',
      fontColor: colors.text1
    })
    item.appendChild(name)

    var br = document.createElement('br')
    item.appendChild(br)

    hex1.onclick = function () {
      css(hex1, {fill: colors.buttonFillSelect})
      css(hex2, {fill: colors.buttonFill})
      events.emit('click', {name: key.name, value: false})
    }

    hex2.onclick = function () {
      css(hex1, {fill: colors.buttonFill})
      css(hex2, {fill: colors.buttonFillSelect})
      events.emit('click', {name: key.name, value: true})
    }
  }

  state.forEach(function (key) {
    createOption(key)
  })

  css(wrapper, {opacity: 0, pointerEvents: 'none'})

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