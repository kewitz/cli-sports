const moment = require('moment')
const { findLast, flatMap, flow, get, map } = require('lodash/fp')

const Network = require('../lib/Network')

const markLive = programs => {
  const liveProgram = findLast(program => program.start < moment())(programs)
  liveProgram.live = true
  return programs
}

const parser = document => {
  const channels = [
    { selector: 'section.espn_brasil article a', channel: 'ESPN Brasil' },
    { selector: 'section.espn_internacional article a', channel: 'ESPN' },
    { selector: 'section.espn_hd article a', channel: 'ESPN+' },
  ]
  const parseChannel = ({ channel, selector }) => {
    const parseProgram = program => {
      const name = get('textContent')(program.querySelector('span._summary'))
      const startString = get('textContent')(program.querySelector('span._start'))
      const start = moment(startString, 'DD/MM/YYYY HH:mm')
      return { channel, name, start }
    }
    const rawprograms = document.querySelectorAll(selector)

    return flow(map(parseProgram), markLive)(rawprograms)
  }
  return flatMap(parseChannel)(channels)
}

const name = 'EPSN'
const url = 'http://espn.uol.com.br/programacao'

module.exports = Network({ name, url, parser })
