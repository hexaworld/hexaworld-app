var _ = require('lodash')

module.exports = function (container, set) {

  var container = document.getElementById('container')

  var menu = require('./ui/desktop/menu.js')(container)
  var side = require('./ui/desktop/side.js')(container)
  var about = require('./ui/desktop/about.js')(container)
  var settings = require('./ui/desktop/settings.js')(container)
  var levels = require('./ui/desktop/levels.js')(container, set)
  var game = require('./ui/desktop/game.js')(container, set[0])

  menu.show()

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