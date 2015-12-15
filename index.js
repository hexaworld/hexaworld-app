var _ = require('lodash')

var set = require('./levels.js')

var menu = require('./ui/desktop/menu.js')()
var side = require('./ui/desktop/side.js')()
var about = require('./ui/desktop/about.js')()
var game = require('./ui/desktop/game.js')()
var settings = require('./ui/desktop/settings.js')()
var levels = require('./ui/desktop/levels.js')(set)

menu.show()
game.load(set[0])
game.hide()
side.hide()

side.events.on('click', function() {
  side.hide()
  game.hide()
  about.hide()
  settings.hide()
  levels.hide()
  menu.show()
})

menu.events.on('click', function(selection) {
  if (selection === 'about') about.show()
  if (selection === 'settings') settings.show()
  if (selection === 'levels') levels.show()
  menu.hide()
  side.show()
})