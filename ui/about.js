var css = require('dom-css')
var _ = require('lodash')
var animate = require('animateplus')

module.exports = function(container) {
  var height = window.innerHeight
  var width = window.innerWidth
  var menuwidth = document.getElementById('menu').clientWidth
  var ismobile = window.innerWidth < window.innerHeight

  var colors = {
    text1: 'rgb(150,150,150)',
    text2: 'rgb(220,220,220)',
    stroke: 'rgb(45,45,45)',
    fill: 'rgb(45,45,45)'
  }

  var wrapper = document.createElement('div')
  container.appendChild(wrapper)
  css(wrapper,{
    width: '85%',
    height: ismobile ? '80%' : '90%',
    top: ismobile ? '10%' : '5%',
    left: 0, right: 0,
    margin: '0px auto',
    position: 'absolute',
    pointerEvents: 'none'
  })
 
  var size = wrapper.clientWidth

  var offset = ismobile ? 0 : Math.PI / 6
  var points = _.range(7).map(function (i) {
    var dx = 0.8 * height * Math.cos(i * 2 * Math.PI / 6 + offset) + height * 0.7
    var dy = 0.8 * height * Math.sin(i * 2 * Math.PI / 6 + offset) + (ismobile ? height * 0.375 : height * 0.4)
    return [dx, dy]
  })
  points = [points[3], points[2], points[1], points[2]]

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  wrapper.appendChild(svg)
  svg.setAttribute('width', height * 1.2)
  svg.setAttribute('height', height * 1.2)
  css(svg, {
    position: 'absolute',
    display: 'block',
    pointerEvents: 'none',
    position: 'fixed',
    bottom: ismobile ? height * 0 : -height * 0.035,
    left: ismobile ? -height * 0.15 : width * 0.5 - menuwidth * 0.5 * 0.8,
    pointerEvents: 'none'
  })
  

  var hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  svg.appendChild(hex)
  if (ismobile) points = points.concat([points[2], [width + 500, height + 1000], [0, height + 1000]])
  if (!ismobile) points = [points[2], [width + 100, height + 100], [width, 0]].concat(points)
  hex.setAttribute('points', points.join(' '))
  css(hex, {
    fill: colors.fill,
    stroke: colors.stroke,
    strokeWidth: 5
  })
  
  var about = document.createElement('div')
  about.innerHTML = 'ABOUT'
  css(about, {
    position: 'absolute',
    left: ismobile ? size * 0.3 : width * 0.52 - menuwidth * 0.5 * 0.8,
    fontSize: ismobile ? size * 0.15 : size * 0.06,
    fontColor: colors.text1
  })
  if (!ismobile) css(about, {top: size * 0.06})
  if (ismobile) css(about, {bottom: size * 0.2})
  wrapper.appendChild(about)

  var text = document.createElement('p')
  wrapper.appendChild(text)
  text.innerHTML = "<span style='color: " + colors.text2 + "'>hexaworld</span> is a game about learning to explore <br><br>\n designed by neuroscientists to study how humans and mice think <br><br>\n source code on <a style='color: " + colors.text1 + "' href='https://github.com/hexaworld'>github</a><br>\n contact us <a style='color: " + colors.text1 + "' href='https://twitter.com/hexaworldgame'>@hexaworldgame</a>"
  css(text, {
    position: 'absolute',
    top: ismobile ? size * 0.06 : size * 0.14,
    left: ismobile ? size * 0.04 : width * 0.52 - menuwidth * 0.5 * 0.8,
    width: ismobile ? size * 0.96 : size * 0.5,
    color: colors.text1,
    fontSize: ismobile ? size * 0.06 : Math.sqrt(size * 0.6)
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
    }
  }

}