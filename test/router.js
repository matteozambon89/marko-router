/*
* @Author: Matteo Zambon
* @Date:   2017-03-29 18:19:55
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-31 23:42:58
*/

'use strict'

const expect = require('chai').expect
const assert = require('chai').assert

const MarkoRouter = require('../MarkoRouter')
const markoRouter = new MarkoRouter()

const testConfig = {
  'test': {
    '_base': '/test',
    '_default': 'page1',
    '_key': 'test-page',
    'page1': {
      'path': '/page1',
      'component': {
        'key': 'test-route-page1',
        'params': {}
      }
    },
    'notfound': {
      'path': '*',
      'component': {
        'key': 'test-route-notfound',
        'params': {}
      }
    }
  }
}

describe('Router Integration', () => {
  describe('MarkoRouter Class', () => {
    it('initializes', () => {
      expect(markoRouter._debug).to.equal(false)

      assert.instanceOf(markoRouter, MarkoRouter, 'markoRouter is instance of MarkoRouter')

      assert.isNull(markoRouter.config, 'markoRouter.config must be null')

      markoRouter.config = testConfig

      assert.typeOf(markoRouter.config, 'object', 'markoRouter.config must be an object after being set')
    })
  })
})
