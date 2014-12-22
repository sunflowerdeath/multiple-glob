#Description

Match files using [node-glob](https://github.com/isaacs/node-glob) but with array of patterns.

#Install

```
npm install multiple-glob
```

#Usage

```
var multiGlob = require('multiple-glob')

multiGlob(['**/*.js', '!node/**', '**/*.css'], function(err, files) {
	console.log('Yay!')
})
```

#API

##multiGlob(patterns, options, callback)

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

##multiGlob.sync(pattern, options)

Synchronous version.

#License

Public domain, see the `LICENCE.md` file.

