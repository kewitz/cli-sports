const jsdom = require('jsdom')
const { map } = require('lodash/fp')

const Program = require('./Program')

/**
 * Promisified parse function.
 * @param  {String} url       URL to parse.
 * @return {Object} document  JSDOM window.document object,
 */
const getDom = url => new Promise((resolve, reject) => {
  jsdom.env(url, [], (err, window) => {
    if (err) return reject(err)
    return resolve(window.document)
  })
})

/**
 * Absracted Network object.
 * @param {String} name     Network name.
 * @param {String} url      URL of the network channel guide.
 * @param {Function} parser Parser function that takes the DOM.document
 *                          and returns a list of program object:
 *                            { channel, name, start }
 */
const Network = ({ name, url, parser }) => ({
  fetch() {
    return getDom(url)
      .then(this.parser)
      .then(map(Program))
  },
  name,
  parser,
})

module.exports = Network
