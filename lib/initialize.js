'use strict'

const fs = require('fs')
const path = require('path')
const { MDK_ROOT, LIB_TYPES } = require('./constants')

const deps = path.join(__dirname, '..', 'node_modules')
const THING_CONFIG_SOURCES = [
  { destDir: 'types/AntminerManagerS19xp/config', srcDir: path.join(deps, LIB_TYPES.ANTMINER, 'config') },
  { destDir: 'types/AvalonMinerManagerA1346/config', srcDir: path.join(deps, LIB_TYPES.AVALON, 'config') },
  { destDir: 'types/WhatsminerManagerM56s/config', srcDir: path.join(deps, LIB_TYPES.WHATSMINER, 'config') }
]
const TEMPLATE = {
  dirs: [
    'config/facs',
    'db',
    'types/AntminerManagerS19xp/config',
    'types/AvalonMinerManagerA1346/config',
    'types/WhatsminerManagerM56s/config',
    'workers'
  ],
  files: {
    'workers/http.node.wrk.js': 'module.exports = require(\'app-node/workers/http.node.wrk\')\n'
  }
}

const resolveSource = (dir, filename) => {
  const plain = path.join(dir, filename)
  const example = path.join(dir, `${filename}.example`)
  if (fs.existsSync(plain)) return plain
  if (fs.existsSync(example)) return example
  return null
}

module.exports = () => {
  const rootStoreDir = path.join(process.cwd(), MDK_ROOT)
  if (fs.existsSync(rootStoreDir)) return
  for (const dir of TEMPLATE.dirs) {
    fs.mkdirSync(path.join(rootStoreDir, dir), { recursive: true })
  }

  const commonDest = path.join(rootStoreDir, 'config', 'common.json')
  if (!fs.existsSync(commonDest)) {
    const src = resolveSource(path.join(deps, LIB_TYPES.APP_NODE, 'config'), 'common.json')
    if (src) fs.copyFileSync(src, commonDest)
  }

  const orkConfDir = path.join(deps, LIB_TYPES.ORK, 'config')
  for (const entry of fs.readdirSync(orkConfDir)) {
    if (!entry.endsWith('.example')) continue
    const filename = entry.slice(0, -'.example'.length)
    const dest = path.join(rootStoreDir, 'config', filename)
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(path.join(orkConfDir, entry), dest)
    }
  }

  const appNodeConfigsDir = path.join(deps, LIB_TYPES.APP_NODE, 'config', 'facs')
  for (const entry of fs.readdirSync(appNodeConfigsDir)) {
    if (!entry.endsWith('.example')) continue
    const filename = entry.slice(0, -'.example'.length)
    const dest = path.join(rootStoreDir, 'config', 'facs', filename)
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(path.join(appNodeConfigsDir, entry), dest)
    }
  }

  for (const { destDir, srcDir } of THING_CONFIG_SOURCES) {
    const dest = path.join(rootStoreDir, destDir, 'base.thing.json')
    if (!fs.existsSync(dest)) {
      const src = resolveSource(srcDir, 'base.thing.json')
      if (src) fs.copyFileSync(src, dest)
    }
  }

  for (const [relPath, content] of Object.entries(TEMPLATE.files)) {
    const filePath = path.join(rootStoreDir, relPath)
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content, 'utf8')
    }
  }
}
