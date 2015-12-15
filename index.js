var _ = require('lodash')

var set = require('./set.js')

var menu = require('./ui/desktop/menu.js')()
var side = require('./ui/desktop/side.js')()
var about = require('./ui/desktop/about.js')()
var game = require('./ui/desktop/game.js')()
var settings = require('./ui/desktop/settings.js')()
var levels = require('./ui/desktop/levels.js')(set)

menu.show()
game.init(set[0])
side.hide()

side.events.on('click', function() {
  side.hide()
  game.hide()
  about.hide()
  settings.hide()
  levels.hide()
  menu.show()
})

menu.events.on('click', function (selection) {
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
  }, 500)
})