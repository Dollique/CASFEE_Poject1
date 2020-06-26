# CASFEE2020 - Project 1

 CASFEE 2020 - Project 1 - To Do List

## Getting Started

My ToDo-List is based click on an element and after editing click outside of the form to save (blur/focusout).

### Browser Support

I use dynamic Module import, so only browsers are supported, who support this: https://caniuse.com/#feat=es6-module-dynamic-import

### Prerequisites

You need these:

```
* Yarn
* ESLint
* NodeJS > 12.x
```

Info: This project uses ES6 and ESM for JS and NodeJS.
NodeJS runs using the parameter `--experimental-modules`
Babel is not yet set up.

### Installing dependencies

Frontend
```
cd .\root\frontend\
yarn
```

Backend
```
cd .\root\backend\
yarn
```

## Running NodeJS

```
cd .\root\backend\
yarn run start
```
will run nodemon using `--experimental-modules`

### working local (using localstorage instead of nodeJS)

If you don't start the node server you can still work offline.
This is currently not very fast, due to the test connection that checks if the server is up (see todos below).

## Running ESLint

Frontend
```
cd .\root\frontend\
yarn run lint
```

Backend
```
cd .\root\backend\
yarn run lint
```

## Running the tests

No tests setup for this project.

## Deployment

Manual deployment

## Built With

* [Visual Studio Code](https://code.visualstudio.com/) - Used for coding


## Known Bugs / ToDos

This project is finished and will probably never be improved any further.
The code is cleaned up from any ToDos, to be easier to look through for code review.

Nonetheless all ToDos and improvements are listed as follow:
* The folder /root/frontend/src/to_be_implemented/ includes some code of 'list' classes. The idea was to be able to build multiple lists. I discarded the idea early in programming stage for timing issue.
* /utils.js -> only one filter at a time works as expected.
* the date is not checked for valid input
* implement fetch abortion on test() request (https://stackoverflow.com/a/50101022/1402958)
* put each handlebar tempalte into a hbs file, precompile and import them.


## Authors

* **Tobias Marty** - *Initial work* - [Dollique](https://github.com/Dollique)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks for the help everyone at CASFEE2020

