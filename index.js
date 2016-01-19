var _ = require('lodash')
var levels = require('hexaworld-levels')
var set = _.values(levels)
require('./app.js')('container', set)