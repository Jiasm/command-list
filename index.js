#!/usr/bin/env node

/**
 * Expand list examples
 */
'use strict';

const fs = require('fs')
const commandFileName = 'command_list.sh'
let commands = require('./command.json')

let template = `
#!/bin/bash
OPTIONS="$$options$$ Quit"

select opt in $OPTIONS; do
if [ "$opt" = "Quit" ]; then
  echo done
  exit
$$switchs$$else
  clear
  echo bad option
fi
done
`

let options = commands.map(({title}) => title).join(' ')
let switchs = commands.map(item => `elif [ "$opt" = "${item.title}" ]; then
  ${item.command}
  exit
`).join('')

let bashStr = template.replace(/\$\$options\$\$/, options).replace(/\$\$switchs\$\$/, switchs)

if (fs.existsSync(commandFileName)) {
  fs.unlinkSync(commandFileName)
}

fs.writeFileSync(commandFileName, bashStr)
console.log('done');
