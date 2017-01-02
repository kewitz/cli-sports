#!/usr/bin/env node
const chalk = require('chalk')
const { forEach, groupBy, mapKeys } = require('lodash/fp')
const { espn, sportv } = require('./networks')

const printNetwork = network => {
  const channels = groupBy('channel')(network)
  const printChannel = key => {
    /* eslint-disable no-console */
    const programs = channels[key]
    const print = p => {
      const live = p.live ? chalk.bold.red.inverse : chalk.reset
      const time = p.start.format('HH:mm')
      console.log(live(`\t${time} ${p.name}`))
    }
    console.log(`${key}`)
    forEach(print)(programs)
  }
  // Print Programs grouped by Channel
  mapKeys(printChannel)(channels)
}

Promise.all([espn.fetch(), sportv.fetch()])
  .then(forEach(printNetwork))
