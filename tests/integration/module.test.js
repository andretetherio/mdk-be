'use strict'

const { test } = require('brittle')
const sdk = require('../../index')

test('SDK exports startApi, registerRack, initType', (t) => {
  t.ok(typeof sdk.startApi === 'function', 'startApi is a function')
  t.ok(typeof sdk.registerRack === 'function', 'registerRack is a function')
  t.ok(typeof sdk.initType === 'function', 'initType is a function')
})

test('SDK exports miner type constructors WMTypes, AMTypes, AVTypes', (t) => {
  t.ok(sdk.WMTypes, 'WMTypes exported')
  t.ok(sdk.AMTypes, 'AMTypes exported')
  t.ok(sdk.AVTypes, 'AVTypes exported')
})
