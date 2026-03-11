'use strict'

const MDK_ROOT = 'mdk'
const MDK_STORE = 'store'
const ORK_CLUSTER = 'cluster-0'
const WRK_TYPES = {
  ORK: 'wrk-ork-proc-aggr',
  APP_NODE: 'wrk-node-http'
}
const LIB_TYPES = {
  ORK: 'ork',
  APP_NODE: 'app-node',
  ANTMINER: 'antminer',
  AVALON: 'avalon',
  WHATSMINER: 'whatsminer'
}

module.exports = {
  WRK_TYPES,
  MDK_ROOT,
  MDK_STORE,
  ORK_CLUSTER,
  LIB_TYPES
}
