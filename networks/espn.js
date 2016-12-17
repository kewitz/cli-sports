const { flatMap, get, map } = require('lodash/fp')
const Network = require('../lib/Network')

const parser = (document) => {
  const channels = [
    { selector: 'section.espn_brasil article a', channel: 'ESPN Brasil' },
    { selector: 'section.espn_internacional article a', channel: 'ESPN' },
    { selector: 'section.espn_hd article a', channel: 'ESPN+' },
  ]
  const parseChannel = ({ channel, selector }) => {
    const parseProgram = (program) => {
      const name = get('textContent')(program.querySelector('span._summary'))
      const start = get('textContent')(program.querySelector('span._start'))
      return { channel, name, start }
    }
    const programs = document.querySelectorAll(selector)
    return map(parseProgram)(programs)
  }
  return flatMap(parseChannel)(channels)
}

const espn = Network('ESPN', 'http://espn.uol.com.br/programacao', parser)

module.exports = espn
