# Open Weather Map Charts

This project uses the [`fetch`](https://github.com/github/fetch) API to fetch weather data from openweathermap.org. In order to use their API you will need to [register as a developer](http://home.openweathermap.org/) and obtain an API key.

Once you have a key then you should add it to a file named `openweathermap.key.js` in the root of your project:

```javascript
// openweathermap.key.js
module.exports = '<YOUR API KEY>';
```

This project assumes you have [NodeJS](https://nodejs.org).

## Getting Started

### Install dependencies

```
npm install
```

First you must clone or download this project to your machine. Next you `cd` to the project directory and run the `npm install` command. This will download the project dependencies from [npmjs.com](http://www.npmjs.com) and install them into the `./node_modules` directory:


### Building the project

```bash
npm run build
```

Running the build command will build the project to the `./build/` directory. Building the project means to bundle...

- dependencies from `./node_modules/`
- and all CSS, images, JavaScripts, and fonts from `./app/`

...into a single compressed JavaScript file named `bundle.js` which is then referenced by the `index.html` file. After the build command has finished, there will be two files in the `./build/` directory:

- `./build/index.html`
- `./build/bundle.js`

You can now open `./build/index.html` in your browser to run the built-application. You can also take the contents of the build directory and copy them to other machines or to a web server on the internet to run them from there.

### Debugging the project

```
npm start
```

This will start a local dev server on your machine at [http://localhost:8080](http://localhost:8080). The dev server builds and serves files from memory, not from the `./build/` directory. The benefit of the dev server is that while it is running, any edits you make to the files inside the `./app/` directory will automatically reload in your browser. Type `Ctrl+C` to stop the build server.

While the development server is running, you can use the Chrome dev tools to debug your application. While the dev tools are open you [can search](https://developer.chrome.com/devtools/docs/authoring-development-workflow#search-navigate-filter) for the names of the files in your `./app/` directory and then [place breakpoints](https://developer.chrome.com/devtools/docs/javascript-debugging) in those files.
