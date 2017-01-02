#!/usr/bin/env node

const { forEach, groupBy, mapKeys } = require('lodash/fp')
const { espn, sportv } = require('./networks')

const printNetwork = (network) => {
  const channels = groupBy('channel')(network)
  const printChannel = (key) => {
    /* eslint-disable no-console */
    const programs = channels[key]
    console.log(`${key}`)
    forEach(p => console.log(`\t${p.start.format('HH:mm')} ${p.name}`))(programs)
  }
  // Print Programs grouped by Channel
  mapKeys(printChannel)(channels)
}

Promise.all([espn.fetch(), sportv.fetch()])
  .then(forEach(printNetwork))
