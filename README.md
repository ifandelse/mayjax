## mayjax

Originally named "TrafficCop", this library allows you to prevent simultaneous duplicate HTTP `GET` requests. The first request is allowed through, and while it's executing, any subsequents `GET`s with the exact same `settings` will be queued to have their callbacks invoked when the original call returns.

This library exports a factory that expects an instance of jQuery. The factory returns jQuery, with a `mayjax` method added to it:

```javascript
var $ = require( "mayjax" )( require( "jquery" ) );

$.mayjax( {
	url: "/two/overlapping/request/1",
	method: "GET"
} );
$.mayjax( {
	url: "/two/overlapping/request/1",
	method: "GET"
} );
$.mayjax( {
	url: "/two/overlapping/request/1",
	method: "GET"
} );
```

## Building, Tests, etc.
To build: `npm run build`. This will create a UMD-wrapped module (via webpack) in the `lib` directory.

To run tests: `npm test`

To do other things: `npm run` to see the list.
