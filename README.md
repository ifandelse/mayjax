## Building TrafficCop

TrafficCop uses Anvi.js to build standard JavaScript module and AMD module versions of the library.

To build TrafficCop you need to have NodeJS and NPM installed. Once you have those, install Anvil.js
through npm:

`npm install -g anvil.js`

Then you can run `./build-all` from a Bash shell, or if you're on Windows, you can run `anvil -b build-standard.json`
and `anvil -b build-amd.json` to build the version you need.

The resulting files will be in the `lib/(amd|standard)/` folder, depending on which versions were built.