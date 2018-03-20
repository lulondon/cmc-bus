# cmc-bus
*cmc-bus* is a single-page application for requesting and displaying live bus stop departure information for London buses. It is designed specifically for Loughborough University London, and has some hardcoded elements that reflect this.

## Configuration

All configuration is done with the *config/config.json* configuration file. An example is provided below, as well as in the *config/* directory.

### example *config.json* 
```JSON
{
  "countdownApiProxy": "https://countdown.proxy:9002",
  "defaultStopCode": 91431,
  "defaultStops": [
    { "code": 91431, "label": "HereEast (towards Stratford)" },
    { "code": 91432, "label": "HereEast (towards London)"},
    { "code": 91426, "label": "Abingdon Road (towards Aldwych)"}
  ],
  "refreshInterval": 20000
}
```

##### countdownApiProxy
*cmc-bus* is designed to load data from the TfL Countdown Instant API via an instance of [tfl-countdown-web-proxy](https://github.com/jonlinnell/tfl-countdown-web-proxy). This is required for HTTPS and response sanitising.

##### defaultStopCode
The first stop code to load on a new instance.

##### defaultStops
Available stops in the 'Bus stops nearby' selector.

##### refreshInterval
How long to wait between polling the API for updates. Measured in milliseconds.

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

