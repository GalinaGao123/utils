'use strict'

const babel = require('babel-core')
const fs = require('fs')
let bs = require('browser-sync').create()

function transformFile (from, to) {
  return new Promise((resolve, reject) => {
    babel.transformFile(from, (err, { code }) => {
      if (err) {
        reject(err)
      } else {
        fs.writeFile(to, code, err => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      }
    })
  })
}

bs.watch('index.js').on('change', () => {
  transformFile('index.js', 'index.babel.js').then(() => {
    bs.reload()
  }).catch(err => {
    console.error(err)
  })
})

bs.watch('index.html').on('change', bs.reload)

bs.init({ server: '.' })

transformFile('index.js', 'index.babel.js').then(() => {
  console.log('[INFO] Transform File')
}).catch(err => {
  console.error(err)
})
