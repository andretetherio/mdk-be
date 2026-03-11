'use strict'

const WMTypes = require('whatsminer')
const AMTypes = require('antminer')
const AVTypes = require('avalon')
const path = require('path')
const worker = require('bfx-svc-boot-js/lib/worker')
const OrkBase = require('ork/workers/aggr.proc.ork.wrk')
const { WRK_TYPES, ORK_CLUSTER, MDK_ROOT, MDK_STORE } = require('./lib/constants')
const { createFacs } = require('./lib/util')
const initialize = require('./lib/initialize')

const baseDir = path.join(process.cwd(), MDK_ROOT)
const storeDir = path.join(baseDir, MDK_STORE)
let ork
initialize()

const startApi = async (port = 3000) => {
  // initialize Ork
  ork = new OrkBase({}, {
    cluster: ORK_CLUSTER,
    root: baseDir,
    wtype: WRK_TYPES.ORK,
    isRpcMode: false
  })
  const facs = await createFacs(storeDir)
  ork.setFacs(facs)

  // start app-node
  worker({
    wtype: WRK_TYPES.APP_NODE,
    serviceRoot: baseDir,
    port,
    isRpcMode: false,
    ork
  })
}

const registerRack = async (rack, lib) => {
  if (!ork) return
  return ork.registerRack({
    id: `${lib.getThingType()}-${rack}`,
    type: lib.getThingType(),
    libInstance: lib
  })
}

const initType = async (TypeClass, rack) => {
  const typeBaseDir = path.join(baseDir, 'types', TypeClass.name)
  const ctx = { rack, storeDir: path.join(typeBaseDir, MDK_STORE), root: typeBaseDir }
  const instance = new TypeClass({}, ctx)
  await instance.init()
  await registerRack(rack, instance)
  return instance
}

module.exports = {
  startApi,
  registerRack,
  initType,
  WMTypes,
  AMTypes,
  AVTypes
}
