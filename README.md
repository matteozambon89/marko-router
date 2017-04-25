# marko-router

[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Join the chat at https://gitter.im/marko-router/Lobby](https://badges.gitter.im/marko-router/Lobby.svg)](https://gitter.im/marko-router/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Donate][donate-image]][donate-url]

Frontend Router for your Marko project.

## Dependencies and Compatibilities

- Marko 4.x
- Lasso (tested with 2.x)

## Install

```sh
$ npm install --save marko-router
```

## Getting Started

This is a suggested tree view of what your Marko + Lasso project should look like when integrating with `marko-router`:
```
...
|- package.json
  ...
|- views
  |- marko.json
  |- components
    |- marko-router
      |- browser.json
      |- component.js
      |- index.marko
      |- marko-router-config.json
      |- marko-tag.json
    ...
  |- pages
    |- myRootState
      |- browser.json
      |- index.marko
      |- routeComponents
        |- myRootState-route-loading
          |- index.marko
          ...
        |- myRootState-route-myPageStart
          |- index.marko
          ...
        |- myRootState-route-myPageNext
          |- index.marko
          ...
        ...
        |- myRootState-route-myPageLast
          |- index.marko
          ...
        |- myRootState-route-notfound
          |- index.marko
          ...
    ...
```

### Marko Router Component

After installing `marko-router` copy the folder `./node_modules/marko-router/components/marko-router` into your Marko components folder.
This component will ease the interaction with `marko-router` and it's fully customizable for your needs.
Due to Marko/Lasso limitation I was unable to make `marko-router` an actual Marko component with all the features this alternative approach introduced.

### Marko Router Config

```js
// views/components/marko-router/marko-router-config.json

{
  // Root State
  "myRootState": {
    // Base path for this root state (e.g. handle all the requests at .../myRootState/*)
    "_base": "/myRootState",
    // Default state (default redirects for '/')
    "_default": "myPageStart",
    // State for myPageStart
    "myPageStart": {
      // Route segment for this state
      "path": "/myPageStart",
      // Component Details
      "component": {
        // Component Key
        "key": "myRootState-route-myPageStart",
        // Static Component Params
        "params": {}
      }
    },
    // State for myPageNext
    "myPageNext": {
      // Route segment for this state
      "path": "/myPageNext",
      // Component Details
      "component": {
        // Component Key
        "key": "myRootState-route-myPageNext",
        // Static Component Params
        "params": {}
      }
    },
    // State for myPageNext with url params
    "myPageNextWithParam": {
      // Route segment for this state
      "path": "/myPageNext/:p",
      // Component Details
      "component": {
        // Override state
        "state": "myPageNext",
        // Component Key
        "key": "myRootState-route-myPageNext",
        // Static Component Params
        "params": {}
      }
    },
    ...
    // Redirect
    "/myPageLast": "/myPageStart",
    // State to handle Not Found
    "notfound": {
      // Route segment for this state
      "path": "*",
      // Component Details
      "component": {
        // Component Key
        "key": "myRootState-route-notfound",
        // Static Component Params
        "params": {}
      }
    }
  }
}

```

Essentially the `marko-router-config.json` has the following constraints:
- Root states are always first level properties
- Root state must always define `_base`, `_default`
- Root state `_base` must be a url segment just starting with `/`
- Root state `_default` must be a state correctly defined within the root state
- States are always second level properties
- States cannot start with `_`
- States must always define `path`, `component.key`, `component.params`
- State `path` must be defined accordingly PageJS documentation
- State `component.key` must be exactly the key of the state component
- State `component.param` must be an object and if not defined must be an empty object `{}`

### Marko Tags Definition

```js
// views/marko.json

{
  "tags-dir": [
    "./components"
    "./pages/myRootState/routeComponents"
  ]
}

```

### Root State - Browser

```js
// views/pages/myRootState/browser.json

{
  "dependencies": [
    "./routeComponents/myRootState-route-loading/index.marko",
    "./routeComponents/myRootState-route-myPageStart/index.marko",
    "./routeComponents/myRootState-route-myPageNext/index.marko",
    ...
    "./routeComponents/myRootState-route-myPageLast/index.marko",
    "./routeComponents/myRootState-route-notfound/index.marko"
  ]
}

```

### Root State - Marko

```marko
// views/pages/myRootState/index.marko

<lasso-page package-path="./browser.json" />

<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>
    Root
  </title>
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
  <meta name="viewport" content="width=device-width" />

  <lasso-head />
</head>

<body>

  <my-header selected="root" />

  <marko-router
    rootState="myRootState"
    componentPath="~/views/pages/myRootState/routeComponents" />

  <my-footer />

  <lasso-body />

  <browser-refresh />
</body>

</html>
```

| Parameter Name | Type | Required | Default | Description |
|--- | :-: | :-: |--- |--- |
| rootState | string | x | | Name of the root state |
| configPath | string |  | './marko-router-config.json' | Location of the `marko-router-config.json` |
| debug | boolean | | false | Initialize `marko-router` with or without debug |
| componentPath | string | | '../' | Where the route components are located |
| routeDelimiter | string | | '-route-' | Delimiter to set between root state and state for the component |
| loadingState | string | | loading | Name of the component to launch during loading |


## Events

### state.change

`state.change` will be triggered every time the frontend router will have to handle the change of url within the same root state.


## Doubts

Please check my sample at [marko-sample-router](https://github.com/matteozambon89/marko-sample-router)

## Credits

- [Marko](markojs.com)
- [PageJS](https://visionmedia.github.io/page.js/) as Frontend Router

## Please Contribute!

I'm happy to receive contributions of any kind!

## Did you like my work?
Help me out with a little donation, press on the button below.
[![Donate][donate-image]][donate-url]

[npm-image]: https://img.shields.io/npm/v/marko-router.svg?style=flat-square
[npm-url]: https://npmjs.org/package/marko-router
[ci-image]: https://img.shields.io/travis/matteozambon89/marko-router/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/matteozambon89/marko-router
[daviddm-image]: http://img.shields.io/david/matteozambon89/marko-router.svg?style=flat-square
[daviddm-url]: https://david-dm.org/matteozambon89/marko-router
[codeclimate-image]: https://img.shields.io/codeclimate/github/matteozambon89/marko-router.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/matteozambon89/marko-router
[donate-image]: https://img.shields.io/badge/Donate-PayPal-green.svg
[donate-url]: matteo.zambon.89@gmail.com
