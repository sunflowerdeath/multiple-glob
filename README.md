# multiple-glob

Match files using [node-glob](https://github.com/isaacs/node-glob) but with array of patterns.

## Install

```
npm install multiple-glob
```

## Usage

```js
var multiglob = require('multiple-glob')

multiglob(['**/*.js', '!node/**', '**/*.css'], function(err, files) {
  console.log('Yay!')
})
```

##API

### multiglob(patterns, options, callback)

Match files with array of patterns and combines results.

Patterns that begin with `!` will exclude files.
Patterns are processed in order, so inclusion and exclusion order is significant.

#### patterns

Type: `array`

List of patterns.

#### options

Type: `object`

Options for glob.

#### callback

Type: `function` 

### multiglob.sync(pattern, options)

Synchronous version.

## License

Public domain, see the `LICENCE.md` file.

