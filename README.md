#Description

Match files using [node-glob](https://github.com/isaacs/node-glob) but with array of patterns.

#Install

```
npm install glob-array
```

#Usage

```
var globArray = require('glob-array')

globArray(['**/*.js', '!node/**', '**/*.css'], function(err, files) {
	console.log('Yay!')
})
```

#API

##globArray(patterns, [options], callback)

Match files with array of patterns and combines results.
Patterns with negation do not add new results, but filters matched results.
Order of patterns is important.

###patterns

Type: `array`

List of patterns.

###options

Type: `object`

Options for glob.

###callback

Type: `function` 

##globArray.sync(pattern, [options])

Synchronous version.

#License

Public domain, see the `LICENCE.md` file.

