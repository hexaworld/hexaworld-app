var _ = require('lodash')

var levels = _.range(12).map(function() {

  var config = {
    name: 'longname',
    lives: parseInt(Math.random() * 3) + 1,
    moves: parseInt(Math.random() * 6) + 1,
    difficulty: 1
  }

  var maps = {
    tiles: [
      {translation: [0, 0], paths: [0, 2, 4], cue: {fill: '#DE863A', scale: 1}},
      {translation: [-1, 0], paths: [0, 4, 5], cue: {fill: '#00C3EE', scale: 1}},
      {translation: [0, 1], paths: [2, 3, 4], target: {fill: '#FFFFFF'}},
      {translation: [-1, 1], paths: [4, 5], cue: {fill: '#82C94A', scale: 1}},
      {translation: [1, -1], paths: [2, 3]},
      {translation: [1, 0], paths: [1, 3]},
      {translation: [0, -1], paths: [1, 3, 5]},
      {translation: [0, -2], paths: [0, 5]},
      {translation: [1, -2], paths: [0, 2], cue: {fill: '#CF5557', scale: 1}}
    ],
    start: [{translation: [0, -2], rotation: 180}],
    target: [0, 1],
    flash: ['#FF5050', '#FF8900', '#00C3EE', '#64FF00'],
    message: 'welcome to hexaworld! try to find the big white circle'
  }

  var level = {
    config: config,
    maps: [maps]
  }

  return level

})

module.exports = levels