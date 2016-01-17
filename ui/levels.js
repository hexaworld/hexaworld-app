var css = require('dom-css')
var _ = require('lodash')
var animate = require('animateplus')
var EventEmitter = require('events').EventEmitter

function hexsvg(size) {
  var points = _.range(7).map(function (i) {
    var dx = size * Math.cos(i * 2 * Math.PI / 6 + Math.PI / 6) + size
    var dy = size * Math.sin(i * 2 * Math.PI / 6 + Math.PI / 6) + size * 1.05
    return [dx, dy]
  })
  return points.join(' ')
}

module.exports = function(container, set) {
  var width = container.clientWidth
  var height = container.clientHeight
  var ismobile = width < height

  var colors = {
    text1: 'rgb(150,150,150)',
    text2: 'rgb(220,220,220)',
    buttonStroke: 'none',
    buttonFill: 'rgb(10,10,10)',
    buttonFillSelect: 'rgb(120,120,120)',
    buttonStroke2: 'none',
    buttonFill2: 'rgb(10,10,10)',
    buttonFillSelect2: 'rgb(120,120,120)'
  }

  var wrapper = document.createElement('div')
  container.appendChild(wrapper)
  wrapper.id = 'levels'
  css(wrapper, {
    width: ismobile ? '96%' : '85%',
    height: ismobile ? '94%' : '100%',
    top: ismobile ? '6%' : '0%',
    left: 0, right: 0,
    margin: '0px auto',
    position: 'absolute'
  })

  var size = wrapper.clientWidth

  var box = {
    left: ismobile ? size * 0.06 : size * 0.5,
    top: ismobile ? height * 0.25 : size * 0.07,
    width: ismobile ? size * 0.85 : size * 0.45,
    height: ismobile ? height * 0.6 : height * 0.8,
    margin: ismobile ? 0.2 : 0.2,
    aspect: 1
  }

  var hexsize = (box.width / (3 * (2 + box.margin)))
  if ((hexsize * 2 + box.margin * hexsize) * 4 > box.height) {
    hexsize = (box.height / (4 * (2 + box.margin))) - 0.001 * height
    box.margin = ismobile ? ((box.width / 3) - (hexsize * 2)) / hexsize : box.margin
    box.width = ismobile ? (3 * (hexsize * 2 + box.margin * hexsize)) : box.width,
    box.aspect = ismobile ? 0.4 * box.width / box.height : 1
  }
  box.left = ismobile ? (wrapper.clientWidth - (box.width)) / 2 + box.margin * hexsize / 2: box.left

  var selected = 0
  var events = new EventEmitter()

  var name = document.createElement('div')
  wrapper.appendChild(name)
  name.innerHTML = 'LEVELNAME'
  css(name, {
    position: 'absolute',
    top: ismobile ? size * 0.04 : size * 0.3,
    left: ismobile ? box.left : size * 0.1,
    fontSize: ismobile ? size * 0.1 : size * 0.055,
    textTransform: 'uppercase'
  })
  
  var moves = document.createElement('div')
  wrapper.appendChild(moves)
  moves.innerHTML = 'moves '
  css(moves, {
    position: 'absolute',
    top: ismobile ? size * 0.19 : size * 0.4,
    left: ismobile ? box.left : size * 0.1,
    fontSize: ismobile ? size * 0.06 : size * 0.03,
    color: colors.text1
  })

  var movesval = document.createElement('span')
  moves.appendChild(movesval)
  movesval.innerHTML = '6'
  css(movesval, {color: colors.text2})

  var score = document.createElement('div')
  wrapper.appendChild(score)
  score.innerHTML = 'top score '
  css(score, {
    position: 'absolute',
    top: ismobile ? size * 0.27 : size * 0.45,
    left: ismobile ? box.left : size * 0.1,
    fontSize: ismobile ? size * 0.06 : size * 0.03,
    color: colors.text1
  })

  var scoreval = document.createElement('span')
  score.appendChild(scoreval)
  scoreval.innerHTML = '10000'
  css(scoreval, {color: colors.text2})

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  wrapper.appendChild(svg)
  svg.setAttribute('width', hexsize * 2)
  svg.setAttribute('height', hexsize * 2.1)
  css(svg, {
    position: 'absolute',
    top: ismobile ? size * 0.13 : size * 0.07
  })
  if (ismobile) css(svg, {left: box.left + 2.02 * (hexsize * 2 + box.margin * hexsize)})
  if (!ismobile) css(svg, {left: size * 0.1})

  var play = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  svg.appendChild(play)
  play.setAttribute('points', hexsvg(hexsize))
  play.setAttribute('fill', colors.buttonFill2)
  css(play, {
    stroke: colors.buttonStroke2,
    strokeWidth: 3,
    strokeLinejoin: 'round',
    transformOrigin: 'center',
    cursor: 'pointer',
    webkitTapHighlightColor: 'rgba(0,0,0,0)'
  })

  var playlabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  svg.appendChild(playlabel)
  playlabel.innerHTML = 'PLAY'
  playlabel.setAttribute("fill", colors.text2)
  playlabel.setAttribute("font-size", ismobile ? hexsize * 0.5 : hexsize * 0.5)
  playlabel.setAttribute("text-anchor", 'middle')
  playlabel.setAttribute("dominant-baseline", 'central')
  var t = ismobile
    ? 'translate(' + hexsize + ',' + hexsize + ')'
    : 'translate(' + hexsize + ',' + hexsize + ')'
  playlabel.setAttribute('transform', t)
  css(playlabel, {pointerEvents: 'none'}) 
  
  var levelgroup = document.createElement('div')
  wrapper.appendChild(levelgroup)
  css(levelgroup, {
    left: box.left,
    top: box.top,
    width: box.width,
    height: box.height,
    position: 'absolute'
  })

  _.range(set.length).forEach(function (i) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    levelgroup.appendChild(svg)
    svg.setAttribute('width', hexsize * 2)
    svg.setAttribute('height', hexsize * 2.1)
    css(svg, {
      position: 'relative',
      display: 'inline',
      marginRight: box.margin * hexsize,
      marginBottom: box.aspect * box.margin * hexsize
    })

    var hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    svg.appendChild(hex)
    hex.id = 'level-hex-' + i
    hex.setAttribute("points", hexsvg(hexsize))
    hex.setAttribute('data-id', i)
    hex.setAttribute('class', 'level-hex')
    css(hex, {
      stroke: colors.buttonStroke,
      strokeWidth: 3,
      strokeLinejoin: 'round',
      transformOrigin: 'center',
      cursor: 'pointer',
      webkitTapHighlightColor: 'rgba(0,0,0,0)'
    })

    function update() {
      name.innerHTML = set[selected].config.name
      movesval.innerHTML = set[selected].config.moves
      scoreval.innerHTML = 0
      var items = document.getElementsByClassName('level-hex')
      _.range(items.length).forEach( function(i) {
        document.getElementById('level-hex-' + i).setAttribute('fill', colors.buttonFill)
      })
      document.getElementById('level-hex-' + selected).setAttribute('fill', colors.buttonFillSelect)
    }

    update()

    hex.onclick = function(item) {
      var id = item.target.getAttribute('data-id')
      selected = id
      update()
    }

    play.onclick = function(item) {
      animate({
        el: play,
        fill: [colors.buttonFillSelect2, colors.buttonFill2],
        duration: 50,
        easing: 'easeInQuad',
        complete: function () {
          events.emit('click', selected)
        }
      })
    }
  })

  css(wrapper, {opacity: 0, pointerEvents: 'none'})

  return {
    hide: function() {
      if (wrapper.style.opacity == 1) {
        animate({
          el: wrapper,
          opacity: [1, 0],
          duration: 100,
          easing: 'easeInQuad',
          complete: function() {
            wrapper.style.pointerEvents = 'none'
          }
        })
      }
    },

    show: function() {
      animate({
        el: wrapper,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeInQuad',
        complete: function () {
          wrapper.style.pointerEvents = 'all'
        }
      })
    },

    events: events
  }

}