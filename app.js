var _ = require('lodash')
var fastclick = require('fastclick').FastClick

module.exports = function (id, set) {

  var container = document.getElementById(id)
  fastclick.attach(document.body)

  var state = require('./state.js')

  var menu = require('./ui/menu.js')(container)
  var side = require('./ui/side.js')(container)
  var about = require('./ui/about.js')(container)
  var settings = require('./ui/settings.js')(container, state)
  var levels = require('./ui/levels.js')(container, set)
  var game = require('./ui/game.js')(container, set[0])

  menu.show()

  side.events.on('click', function() {
    side.hide()
    game.hide()
    about.hide()
    settings.hide()
    levels.hide()
    menu.show()
  })

  settings.events.on('click', function (item) {
    console.log(item)
  })

  menu.events.on('click', function (selection) {
    if (selection === 'about') about.show()
    if (selection === 'settings') settings.show()
    if (selection === 'levels') levels.show()
    menu.hide()
    game.hide()
    console.log('hiding game')
    side.show()
  })

  levels.events.on('click', function (selection) {
    levels.hide()
    setTimeout(function () {
      game.show()
      game.reload(set[selection])
    }, 150)
  })

  return {
    events: game.events
  }
}
