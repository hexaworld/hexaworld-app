var _ = require('lodash')

var set = require('./set.js')

module.exports = function (container) {

  var container = document.getElementById('container')

  var menu = require('./ui/desktop/menu.js')(container)
  var side = require('./ui/desktop/side.js')(container)
  var game = require('./ui/desktop/game.js')(container)
  var about = require('./ui/desktop/about.js')(container)
  var settings = require('./ui/desktop/settings.js')(container)
  var levels = require('./ui/desktop/levels.js')(container, set)

  menu.show()
  game.init(set[0])

  side.events.on('click', function() {
    side.hide()
    game.hide()
    about.hide()
    settings.hide()
    levels.hide()
    menu.show()
  })

  menu.events.on('click', function (selection) {
    console.log(selection)
    if (selection === 'about') about.show()
    if (selection === 'settings') settings.show()
    if (selection === 'levels') levels.show()
    menu.hide()
    game.hide()
    side.show()
  })

  levels.events.on('click', function (selection) {
    setTimeout(function () {
      levels.hide()
      game.reload(set[selection])
      game.show()
    }, 100)
  })

}