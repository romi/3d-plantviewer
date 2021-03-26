# Plant 3D Explorer

![badge](https://github.com/romi/plant-3d-explorer/workflows/Tests/badge.svg)

Welcome to the Plant 3D Explorer repository.
It is the home of our webapp dedicated to the exploration of single plant acquisitions and reconstruction.

<img src="doc/images/screenshot_2.png" alt="Browsing screenshot" width="400"> <img src="doc/images/screenshot_1.png" alt="Exploring screenshot" width="400">

For a general documentation on the whole ROMI project, head over [here](https://docs.romi-project.eu).


## Requirements
You will need `npm` to use this package.

To install it, on UNIX systems with `apt`, do: 
```bash
sudo apt install npm
```
Then update the node.js package manager with:
```bash
npm install npm -g
```
You may find that the npm packaged for your distro is too old... then head over to your browser, choose a search engine, type `npm`, and good luck!


## Available Scripts
In the project directory, you can run:

### ```npm install```

This is needed to install the dependencies of the project.

To make sure everything works fine, your version of nodejs must be >= 10, and your version of npm must be >= 6.

### ```npm test```
This will run the tests for the project. It will permanently run and run again on files when they are changed. Multiple commands are available, see [this](https://create-react-app.dev/docs/running-tests/) for more info.

Each test file is located with the component it is testing. So the tests for the file `src/ScanList/index.js` are located in `src/Scanlist/index.test.js`.

### ```npm start```
Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You need to add a file `.env.local` at project's root to set the `API URL`:
```
REACT_APP_API_URL='{`API URL}'
```
Without this, the app will use `http://localhost:5000`.

To use a local database, you must run the data storage server [from this repository](https://github.com/romi/plantdb).

### `npm run build`
Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Docker container

### Build docker image
To build the image, at the root directory of the repo:
```bash
docker build -t roboticsmicrofarms/plant_3d_explorer:2.1 .
```
To run it:
```bash
docker run -it -p 3000:3000 roboticsmicrofarms/plant_3d_explorer:2.1
```
Once it's up, you should be able to access the viewer here: http://localhost:3000/

**important**:
> Use `chrome` as `firefox` has some issues with the used JavaScript libraries!

Push it on `roboticsmicrofarms` docker hub:
```bash
docker push roboticsmicrofarms/plant_3d_explorer:2.1
```
This requires a valid account, token and existing repository (`plant_3d_explorer`) on docker hub!

### Use pre-built docker image
First you need to pull the docker image:
```bash
docker pull roboticsmicrofarms/plant_3d_explorer
```
Then you can run it with:
```bash
docker run -p 3000:3000 roboticsmicrofarms/plant_3d_explorer
```


## Docker compose
To use a local database, for testing or development, we provide a docker compose recipe that:

1. start a `PlantDB` container using `roboticsmicrofarms/plantdb`
2. start a `Plant 3D Explorer` container using `roboticsmicrofarms/plant_3d_explorer`

**note**:
> You need `docker-compose` installed, see 
[here](https://docs.docker.com/compose/install/).

### Use pre-built docker image
From the directory containing the `docker-compose.yml` in a terminal:
```bash
export ROMI_DB=<path/to/db>
docker-compose up -d 
```
**important**:
> Do not forget to set `ROMI_DB`, the path to the database.

**note**:
To stop the containers: 
```bash
docker-compose stop
```

### Use local builds
To use local builds for development or debugging purposes:

1. build your image following the instructions above and use a specific tag like `debug`
2. edit the `docker-compose.yml` file to add the previously defined tag to the name of the image to start


## Documentation

The documentation of this package is done by [docz](https://www.docz.site/).
To install it, and its dependencies, do:
```bash
npm install docz react react-dom
```

Then:
```bash
npm run docz:dev
```

If you experience any difficulty with `docz`, head over [here](https://www.docz.site/docs/getting-started).
