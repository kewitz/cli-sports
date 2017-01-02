const moment = require('moment')
const {
  filter,
  flatMap,
  flow,
  get,
  join,
  map,
  split,
  uniq,
} = require('lodash/fp')

const Network = require('../lib/Network')

const combineName = flow(join(' '), split(' '), uniq, join(' '))

const parser = (document) => {
  const channels = [
    { selector: '.ge-programacao-canal[data-canal-sigla=spo] li', channel: 'SporTV' },
    { selector: '.ge-programacao-canal[data-canal-sigla=spo2] li', channel: 'SporTV2' },
    { selector: '.ge-programacao-canal[data-canal-sigla=spo3] li', channel: 'SporTV3' },
  ]
  const parseChannel = ({ channel, selector }) => {
    const parseProgram = (program) => {
      const name = get('textContent')(program.querySelector('span.ge-programacao-edicao-nome'))
      const desc = get('textContent')(program.querySelector('span.ge-programacao-edicao-descricao'))
      const live = get('textContent')(program.querySelector('span.ge-programacao-edicao-aovivo'))
      const startString = get('textContent')(program.querySelector('span.ge-programacao-edicao-horario'))
      const start = moment(startString, 'HH:mm')
      const fullName = combineName([desc, name, live])
      return { channel, name: fullName, start }
    }
    const programs = document.querySelectorAll(selector)
    return flow(map(parseProgram), filter('start'))(programs)
  }
  return flatMap(parseChannel)(channels)
}

const name = 'SporTV'
const url = 'http://sportv.globo.com/site/programacao/'

module.exports = Network({ name, url, parser })
