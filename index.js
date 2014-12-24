var Q = require('q')
var _ = require('underscore')
var glob = require('glob')

function applyMatches(matches) {
	var result = []
	_.each(matches, function(match) {
		result = match.exclusion ?
			_.difference(result, match.matches) :
			_.union(result, match.matches)
	})
	return result
}

var multiglob = function(patterns, options, callback) {
	if (typeof options === 'function') {
		callback = options
		options = {}
	}

	var promises = _.map(patterns, function(pattern) {
    var exclusion = pattern[0] === '!'
    if (exclusion) pattern = pattern.slice(1)
    return Q.nfcall(glob, pattern, options).then(function(matches) {
			return {exclusion: exclusion, matches: matches}
		})
	})

	Q.all(promises)
		.then(function(matches) { callback(null, applyMatches(matches)) })
		.fail(function(error) { callback(error) })
}

multiglob.sync = function(patterns, options) {
  var matches = _.map(patterns, function(pattern) {
    var exclusion = pattern.indexOf('!') === 0
    if (exclusion) pattern = pattern.slice(1)
    var matches = glob.sync(pattern, options)
		return {exclusion: exclusion, matches: matches}
  })

	return applyMatches(matches)
}

module.exports = multiglob
