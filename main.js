#!/usr/bin/env node

const { forEach, groupBy, mapKeys } = require('lodash/fp')
const { espn, sportv } = require('./networks')

const printNetwork = (network) => {
  const channels = groupBy('channel')(network)
  const printChannel = (key) => {
    const programs = channels[key]
    console.log(`${key}`)
    forEach(p => console.log(`\t${p.start} ${p.name}`))(programs)
  }
  mapKeys(printChannel)(channels)
}

Promise.all([espn.fetch(), sportv.fetch()])
  .then(forEach(printNetwork))
