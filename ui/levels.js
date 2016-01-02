var _ = require('lodash')
var animate = require('animateplus')
var EventEmitter = require('events').EventEmitter

function hexsvg(size) {
  var points = _.range(7).map(function (i) {
    var dx = size * Math.cos(i * 2 * Math.PI / 6 + Math.PI / 6) + size
    var dy = size * Math.sin(i * 2 * Math.PI / 6 + Math.PI / 6) + size
    return [dx, dy]
  })
  return points.join(' ')
}

module.exports = function(container, set) {
  var ismobile = window.innerWidth < window.innerHeight

  var wrapper = document.createElement('div')
  wrapper.style.width = ismobile ? '95%' : '85%'
  wrapper.style.height = '100%'
  wrapper.style.left = 0
  wrapper.style.right = 0
  wrapper.style.margin = '0 auto'
  wrapper.style.position = 'absolute'
  container.appendChild(wrapper)

  var size = wrapper.clientWidth

  var box = {
    left: ismobile ? size * 0.1 : size * 0.5,
    top: ismobile ? size * 0.45 : size * 0.07,
    width: ismobile ? size * 0.8 : size * 0.45,
    height: ismobile ? window.innerHeight * 0.6 : window.innerHeight * 0.8,
    margin: ismobile ? 0.2 : 0.2
  }

  var hexsize = (box.width / (3 * (2 + box.margin)))
  if ((hexsize * 2 + box.margin * hexsize) * 4 > box.height) {
    hexsize = (box.height / (4 * (2 + box.margin)))
    box.width = (3 * (hexsize * 2 + box.margin * hexsize))
    box.left = ismobile ? (wrapper.clientWidth - (box.width)) / 2 : box.left
  }

  var selected = 0
  var events = new EventEmitter()

  var name = document.createElement('div')
  name.style.position = 'absolute'
  name.style.top = ismobile ? size * 0.1 : size * 0.3
  name.style.left = ismobile ? box.left : size * 0.1
  name.style.fontSize = ismobile ? size * 0.1 : size * 0.055
  name.style.textTransform = 'uppercase'
  name.innerHTML = 'LEVELNAME'
  wrapper.appendChild(name)

  var moves = document.createElement('div')
  moves.style.position = 'absolute'
  moves.style.top = ismobile ? size * 0.24 : size * 0.4
  moves.style.left = ismobile ? box.left : size * 0.1
  moves.style.fontSize = ismobile ? size * 0.05 : size * 0.03
  moves.innerHTML = 'moves '
  moves.style.color = 'rgb(150,150,150)'
  wrapper.appendChild(moves)

  var movesval = document.createElement('span')
  movesval.innerHTML = '6'
  movesval.style.color = 'rgb(220,220,220)'
  moves.appendChild(movesval)

  var score = document.createElement('div')
  score.style.position = 'absolute'
  score.style.top = ismobile ? size * 0.31 : size * 0.45
  score.style.left = ismobile ? box.left : size * 0.1
  score.style.fontSize = ismobile ? size * 0.05 : size * 0.03
  score.style.color = 'rgb(150,150,150)'
  score.innerHTML = 'top score '
  wrapper.appendChild(score)

  var scoreval = document.createElement('span')
  scoreval.innerHTML = '10000'
  scoreval.style.color = 'rgb(220,220,220)'
  score.appendChild(scoreval)

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', hexsize * 2)
  svg.setAttribute('height', hexsize * 2)
  svg.style.position = 'absolute'
  svg.style.top = ismobile ? size * 0.1 : size * 0.07
  if (ismobile) {
    svg.style.right = box.left + hexsize * 0.2
  } else {
    svg.style.left = size * 0.1
  }
  
  wrapper.appendChild(svg)

  var play = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  play.setAttribute("points", hexsvg(hexsize))
  play.setAttribute("fill", 'rgb(55,55,55)')
  play.style.stroke = 'rgb(240,240,240)'
  play.style.strokeWidth = '4'
  play.style.strokeLinejoin = 'round'
  play.style.transformOrigin = 'center'
  play.style.cursor = 'pointer'
  play.style.webkitTapHighlightColor = 'rgba(0,0,0,0)'
  svg.appendChild(play)

  var playlabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  playlabel.setAttribute("fill", 'rgb(240,240,240)')
  playlabel.setAttribute("font-size", hexsize * 0.5)
  playlabel.setAttribute("text-anchor", 'middle')
  playlabel.setAttribute("dominant-baseline", 'middle')
  var t = ismobile
    ? 'translate(' + hexsize + ',' + hexsize + ')'
    : 'translate(' + hexsize + ',' + hexsize + ')'
  playlabel.setAttribute('transform', t)
  playlabel.style.pointerEvents = 'none'
  playlabel.innerHTML = 'PLAY'
  svg.appendChild(playlabel)

  var levelgroup = document.createElement('div')
  levelgroup.style.left = box.left
  levelgroup.style.top = box.top
  levelgroup.style.width = box.width
  levelgroup.style.height = box.height
  levelgroup.style.position = 'absolute'
  wrapper.appendChild(levelgroup)

  _.range(set.length).forEach(function (i) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', hexsize * 2)
    svg.setAttribute('height', hexsize * 2)
    svg.style.position = 'relative'
    svg.style.display = 'inline'
    svg.style.marginRight = box.margin * hexsize
    svg.style.marginBottom = box.margin * hexsize
    levelgroup.appendChild(svg)

    var hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    hex.setAttribute("points", hexsvg(hexsize))
    hex.setAttribute('data-id', i)
    hex.setAttribute('class', 'level-hex')
    hex.setAttribute('fill', 'rgb(55,55,55)')
    hex.id = 'level-hex-' + i
    hex.style.stroke = 'rgb(240,240,240)'
    hex.style.strokeWidth = '4'
    hex.style.strokeLinejoin = 'round'
    hex.style.transformOrigin = 'center'
    hex.style.cursor = 'pointer'
    hex.style.webkitTapHighlightColor = 'rgba(0,0,0,0)'
    svg.appendChild(hex)

    function update() {
      name.innerHTML = set[selected].config.name
      movesval.innerHTML = set[selected].config.moves
      scoreval.innerHTML = 0
      var items = document.getElementsByClassName('level-hex')
      _.range(items.length).forEach( function(i) {
        document.getElementById('level-hex-' + i).setAttribute('fill', 'rgb(55,55,55)')
      })
      animate({
        el: document.getElementById('level-hex-' + selected),
        fill: ['rgb(55,55,55)', 'rgb(100,100,100)'],
        duration: 150,
        easing: 'easeInQuad'
      })

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
        fill: ['rgb(100,100,100)', 'rgb(55,55,55)'],
        duration: 300,
        easing: 'easeInQuad'
      })
      events.emit('click', selected)
    }

  })

  wrapper.style.opacity = 0
  wrapper.style.pointerEvents = 'none'

  return {
    hide: function() {
      if (wrapper.style.opacity == 1) {
        animate({
          el: wrapper,
          opacity: [1, 0],
          duration: 300,
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