var assert = require('assert')
var path = require('path')

var globArray = require('../index.js')

describe('glob-array', function() {
	var DIR = path.join(__dirname, 'files')

	var PATTERNS = [
		'**/*.js',
		'**/*.css'
	]
	var OPTIONS = {
		cwd: DIR
	}
	var EXPECTED_FILES = [
		'node/node.js',
		'scripts/index.js',
		'styles/index.css'
	]

	it('find files using all patterns', function(done) {
		globArray(PATTERNS, OPTIONS, function(err, files) {
			if (err) return done(err)
			assert.deepEqual(files, EXPECTED_FILES)
			done()
		})
	})

	it('finds files with sync version', function() {
		var files = globArray.sync(PATTERNS, OPTIONS)
		assert.deepEqual(files, EXPECTED_FILES)
	})

	var NODE_FILE = 'node/node.js'

	it('uses negation patterns in right order', function() {
		var first = globArray.sync(['!node/**', '**/*.js'], OPTIONS)
		var last = globArray.sync(['**/*.js', '!node/**'], OPTIONS)
		assert(first.indexOf(NODE_FILE) !== -1)
		assert(last.indexOf(NODE_FILE) == -1)
	})
})