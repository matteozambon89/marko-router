/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-31 23:59:38
*/

'use strict'

const markoRouter = require('marko-router')

module.exports = {
  onCreate(input) {
    if(!input.rootState) {
      throw new Error('input.rootState not found')
    }

    this.state = {
      'rootState': input.rootState,
      'configPath': input.configPath || './marko-router-config.json',
      'debug': input.debug || false,
      'componentPath': input.componentPath || '../',
      'routeDelimiter': input.routeDelimiter || '-route-',
      'loadingState': input.loadingState || 'loading'
    }

    this._logLine('[marko-router] onCreate')
  },
  onMount() {
    this._logLine('[marko-router] onMount')

    this.subscribeTo(markoRouter)
      .on('state.change', (args) => {
        this._logLine('[marko-router] markoRouter on(state.change).{args}: ')
        this._logLine(args)

        this.setState({
          'currentState': args.to.route.component.state || args.to.state,
          'componentKey': args.to.route.component.key,
          'componentParams': args.to.route.component.params,
          'router': args
        })

        this.emit('state.change', this.state)
      })

    markoRouter.config = require(this.state.configPath)
    markoRouter.handleOnMount(this.state.rootState, this.state.currentState)
  },
  onRender(out) {
    this._logLine('[marko-router] onRender')
  },
  onUpdate() {
    this._logLine('[marko-router] onUpdate')
    this._logLine(this)

    if(this.state.debug) {
      this._logLine('[marko-router] You can check the Marko Router instance on window.markoRouter')

      window.markoRouter = this
    }
  },
  onDestroy() {
    this._logLine('[marko-router] onDestroy')
  },
  _logLine(line) {
    if(this.state.debug) {
      /* eslint-disable */
      console.log(line)
      /* eslint-enable */
    }
  }
}
