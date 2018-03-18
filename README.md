# cmc-bus
*cmc-bus* is a single-page application for requesting and displaying live bus stop departure information for London buses. It is designed specifically for Loughborough University London, and has some hardcoded elements that reflect this.

## Configuration
### *config/config.json* 
```JSON
{
  "countdownApiProxy": "https://locationof.tfl-countdown-web-proxy:9002"
}
```

## Usage
### Build
Other than the previously mentioned dependence on [tfl-countdown-web-proxy](https://github.com/jonlinnell/tfl-countdown-web-proxy) for HTTPS and CORS support, *cmc-bus* does not require any API keys or further modification to function.

First install dependencies:
```shell
yarn
```

Then create an optimised production build
```shell
yarn build
```

... or substitute the equivalent *npm* commands, if *yarn* is not available.
```shell
npm install
npm run build
```

The resulting HTML file, JavaScript bundle, and associated assets are now available in *./dist*

