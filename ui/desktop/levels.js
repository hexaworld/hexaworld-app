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
  var wrapper = document.createElement('div')
  wrapper.style.width = '85%'
  wrapper.style.height = '100%'
  wrapper.style.left = 0
  wrapper.style.right = 0
  wrapper.style.margin = '0 auto'
  wrapper.style.position = 'relative'
  container.appendChild(wrapper)

  var size = wrapper.clientWidth
  wrapper.style.display = 'none'

  var selected = 0
  var events = new EventEmitter()

  var name = document.createElement('div')
  name.className = 'h1'
  name.style.position = 'absolute'
  name.style.top = size * 0.06
  name.style.left = size * 0.1
  name.style.fontSize = size * 0.055
  name.style.textTransform = 'uppercase'
  name.innerHTML = 'LEVELNAME'
  wrapper.appendChild(name)

  var moves = document.createElement('div')
  moves.className = 'h2'
  moves.style.position = 'absolute'
  moves.style.top = size * 0.18
  moves.style.left = size * 0.1
  moves.style.fontSize = size * 0.03
  moves.innerHTML = 'moves '
  moves.style.color = 'rgb(150,150,150)'
  wrapper.appendChild(moves)

  var movesval = document.createElement('span')
  movesval.className = 'h2-value'
  movesval.innerHTML = '6'
  movesval.style.color = 'rgb(220,220,220)'
  moves.appendChild(movesval)

  var lives = document.createElement('div')
  lives.className = 'h2'
  lives.style.position = 'absolute'
  lives.style.top = size * 0.23
  lives.style.left = size * 0.1
  lives.style.fontSize = size * 0.03
  lives.style.color = 'rgb(150,150,150)'
  lives.innerHTML = 'lives '
  wrapper.appendChild(lives)

  var livesval = document.createElement('span')
  livesval.className = 'h2-value'
  livesval.innerHTML = '3'
  livesval.style.color = 'rgb(220,220,220)'
  lives.appendChild(livesval)

  var score = document.createElement('div')
  score.className = 'h2'
  score.style.position = 'absolute'
  score.style.top = size * 0.28
  score.style.left = size * 0.1
  score.style.fontSize = size * 0.03
  score.style.color = 'rgb(150,150,150)'
  score.innerHTML = 'best score '
  wrapper.appendChild(score)

  var scoreval = document.createElement('span')
  scoreval.className = 'h2-value'
  scoreval.innerHTML = '10000'
  scoreval.style.color = 'rgb(220,220,220)'
  score.appendChild(scoreval)

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', size * 0.1)
  svg.setAttribute('height', size * 0.1)
  svg.style.position = 'relative'
  svg.style.display = 'block'
  svg.style.top = size * 0.4
  svg.style.left = size * 0.1
  wrapper.appendChild(svg)

  var play = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  play.setAttribute("points", hexsvg(0.05 * size))
  play.setAttribute("fill", 'rgb(55,55,55)')
  play.style.stroke = 'rgb(240,240,240)'
  play.style.strokeWidth = '4'
  play.style.strokeLinejoin = 'round'
  play.style.transformOrigin = 'center'
  play.style.cursor = 'pointer'
  svg.appendChild(play)

  var playlabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  playlabel.setAttribute("fill", 'rgb(200,200,200)')
  playlabel.setAttribute("font-size", size * 0.025)
  playlabel.setAttribute("text-anchor", 'middle')
  playlabel.setAttribute("dominant-baseline", 'middle')
  playlabel.setAttribute('transform', 'translate(' + 0.05 * size + ',' + 0.05 * size + ')')
  playlabel.style.pointerEvents = 'none'
  playlabel.innerHTML = 'PLAY'
  svg.appendChild(playlabel)

  var levelgroup = document.createElement('div')
  levelgroup.style.left = size * 0.5
  levelgroup.style.top = size * 0.07
  levelgroup.style.width = size * 0.45
  levelgroup.style.position = 'absolute'
  wrapper.appendChild(levelgroup)

  _.range(set.length).forEach(function (i) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('width', size * 0.1)
    svg.setAttribute('height', size * 0.1)
    svg.style.position = 'relative'
    svg.style.display = 'inline'
    svg.style.marginRight = size * 0.025
    svg.style.marginBottom = size * 0.02
    levelgroup.appendChild(svg)

    var hex = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    hex.setAttribute("points", hexsvg(0.05 * size))
    hex.setAttribute('data-id', i)
    hex.setAttribute('class', 'level-hex')
    hex.setAttribute('fill', 'rgb(55,55,55)')
    hex.id = 'level-hex-' + i
    hex.style.stroke = 'rgb(240,240,240)'
    hex.style.strokeWidth = '4'
    hex.style.strokeLinejoin = 'round'
    hex.style.transformOrigin = 'center'
    hex.style.cursor = 'pointer'
    svg.appendChild(hex)

    function update() {
      name.innerHTML = set[selected].config.name
      livesval.innerHTML = set[selected].config.lives
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

  return {
    hide: function() {
      animate({
        el: wrapper,
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad',
        complete: function() {
          wrapper.style.display = 'none'
        }
      })
    },

    show: function() {
      console.log('we got here')
      wrapper.style.display = 'block'
      animate({
        el: wrapper,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeInQuad'
      })
    },

    events: events
  }

}