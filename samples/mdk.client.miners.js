'use strict'

const {
  startApi,
  initType,
  WMTypes,
  AMTypes,
  AVTypes
} = require('../index')

const startClient = async () => {
  // start API server
  const apiPort = 3000
  await startApi(apiPort)

  // Initialize and register WM56 miner
  const rack = 'shelf-1'
  const wm56 = await initType(WMTypes.WM_M56S, rack)
  console.log('WM56 Miner Type initialized')
  await wm56.registerThing({
    info: {
      container: 'bitdeer-1',
      serialNum: 'WM001'
    },
    opts: {
      address: '127.0.0.1',
      port: 4028,
      password: 'admin'
    }
  })

  // Initialize and register S19XP miner
  const amS19xp = await initType(AMTypes.AM_S19XP, rack)
  console.log('S19XP Miner Type initialized')

  await amS19xp.registerThing({
    info: {
      container: 'bitdeer-2',
      serialNum: 'AM001'
    },
    opts: {
      address: '127.0.0.1',
      port: 8000,
      password: 'root',
      username: 'root'
    }
  })

  // Initialize and register AV A1346 miner
  const avA1346 = await initType(AVTypes.AV_A1346, rack)
  console.log('A1346 Miner Type initialized')

  await avA1346.registerThing({
    info: {
      container: 'bitdeer-3',
      serialNum: 'AV001'
    },
    opts: {
      address: '127.0.0.1',
      port: 8000,
      password: 'root',
      username: 'root'
    }
  })

  console.log(`API running at http://localhost:${apiPort}`)
}

startClient().catch((err) => {
  console.error(err)
  process.exit(1)
})
