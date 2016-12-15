#!/usr/bin/env node
'use strict'
const jsdom = require('jsdom')

const URL = 'http://espn.uol.com.br/programacao'
const CHANNELS = [
  { className: 'espn_brasil', name: 'ESPN Brasil' },
  { className: 'espn_internacional', name: 'ESPN' },
  { className: 'espn_hd', name: 'ESPN+' },
]

/**
 * Promisified parse function.
 * @param  {String} url       URL to parse.
 * @return {Object} document  JSDOM window.document object,
 */
const parse = url => new Promise((resolve, reject) => {
  jsdom.env(
    url,
    [],
    function (err, window) {
      if (err) return reject(err)
      resolve({ document: window.document })
    })
})

parse(URL)
  .then(({ document }) => {
    const printProgram = program => {
      const name = program.querySelector('span._summary').innerHTML
      const start = program.querySelector('span._start').innerHTML
      console.log(`\t${start} ${name}`)
    }
    const processChannel = ({ className, name }) => {
      const programs = Array.from(document.querySelector(`section.${className}`).querySelectorAll('article a'))
      console.log(`\t${name}`)
      programs.forEach(printProgram)
      console.log('\n')
    }

    CHANNELS.forEach(processChannel)
  })
