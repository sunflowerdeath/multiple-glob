/*
	1. generate files
		A files
		where B files of specific tech

	2. generate globs
		C globs
		where D not matching globs

	3. compare

		1. sync glob
		2. sync with cache
		3. async/parallel with cache
		4. glob tech files + minimatch

	4. matrix
		(B << A) vs (B ~ A) 
		(A >> C) vs (A ~ C)

	5. realistic numbers
		A 1000
		B 10 / 100

		C 100 / 10
		D 100 / 10
*/

var path = require('path')
var _ = require('underscore')
var fs = require('fs-extra')
var mkdirp = require('mkdirp')
var multiglob = require('..')

var glob = require('glob')
var minimatch = require('minimatch')

var setupMatrix = {
	files: [1000],
	techFiles: [10, 100],
	globs: [
		10,
		//100
	]
}

var setups = [{}]

_.each(setupMatrix, function(values, key) {
	var keySetups = []
	_.each(values, function(value) {
		_.each(setups, function(setup) {
			var clone = _.extend({}, setup)
			clone[key] = value
			keySetups.push(clone)
		})
	})
	setups = keySetups
})

function randLetter() {
	return String.fromCharCode('a'.charCodeAt(0) + Math.round(Math.random() * 25))
}

function profile(fn) {
	var date = new Date()
	fn()
	console.log(new Date() - date)
}

var DIR = path.join(__dirname, 'files')
var TECH_SUFFIX = '.js'
var NOT_TECH_SUFFIX = '.hz'

_.each(setups, function(setup) {
	//generate files
	fs.removeSync(DIR)
	_.each(_.range(setup.files), function(index) {
		var dirname = path.join(DIR, randLetter())
		var filename = index + ''
		filename += (index < setup.techFiles) ? TECH_SUFFIX : NOT_TECH_SUFFIX
		mkdirp.sync(dirname)
		var file = path.join(dirname, filename)
		fs.writeFileSync(file, 'test')
	})

	//generate globs
	var matchGlobs = _.map(_.range(setup.globs), function(i) {
		return path.join('**', i + TECH_SUFFIX)
	})
	var nomatchGlobs = _.map(_.range(setup.globs), function(i) {
		return path.join('**', '_' + i + TECH_SUFFIX)
	})
	var globs = [].concat(matchGlobs, nomatchGlobs)

	//var files
	//profile(function() {
		//files = multiglob.sync(globs, {cwd: DIR})
	//})
	//console.log(files.length)
	
	//var s = new Date()
	//multiglob(globs, {cwd: DIR}, function(err, files) {
		//console.log(new Date() - s)
		//console.log(files.length)
	//})

	var files
	profile(function() {
		var matchDeps = _.map(_.range(setup.globs), function(i) { return i })
		var nomatchDeps = _.map(_.range(setup.globs), function(i) { return '_' + i })
		var deps = [].concat(matchDeps, nomatchDeps)
		var allFiles = glob.sync('*.*', {cwd: DIR, matchBase: true})
		files = _.flatten(_.map(deps, function(elem) {
			return minimatch.match(allFiles, elem + '.*', {matchBase: true})
		}))
	})
	console.log(files.length)
})

console.log(setups)

