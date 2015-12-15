var _ = require('lodash')

var config = {
  name: 'welcome',
  lives: 3,
  steps: 6
}

var maps = {
  tiles: [
    {translation: [0, 0], paths: [0, 2, 4], cue: {fill: '#DE863A', scale: 1}},
    {translation: [-1, 0], paths: [0, 4, 5], cue: {fill: '#00C3EE', scale: 1}},
    {translation: [0, 1], paths: [2, 3, 4], target: {fill: 'white'}},
    {translation: [-1, 1], paths: [4, 5], cue: {fill: '#82C94A', scale: 1}},
    {translation: [1, -1], paths: [2, 3]},
    {translation: [1, 0], paths: [1, 3]},
    {translation: [0, -1], paths: [1, 3, 5]},
    {translation: [0, -2], paths: [0, 5]},
    {translation: [1, -2], paths: [0, 2], cue: {fill: '#CF5557', scale: 1}}
  ],
  start: [{translation: [0, 0], rotation: 0}],
  target: [0, 1],
  flash: ['#FF5050', '#FF8900', '#00C3EE', '#64FF00'],
  message: 'welcome to hexaworld! try to find the big white circle'
}

var level = {
  config: config,
  maps: [maps]
}

var menu = require('./ui/desktop/menu.js')()
var game = require('./ui/desktop/game.js')()
var side = require('./ui/desktop/side.js')()
var about = require('./ui/desktop/about.js')()
var settings = require('./ui/desktop/settings.js')()
var levels = require('./ui/desktop/levels.js')()

menu.hide()
about.hide()
settings.hide()
levels.hide()

game.load(level)

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