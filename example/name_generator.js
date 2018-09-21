const MarkovChain = require('../index.js');

const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
  {
    type: 'list',
    name: 'dataset',
    message: 'Which dataset should be used?',
    choices: [
      {
        value: 'tolkein_names.list',
        name: 'Tolkein Names'
      },
      {
        value: 'american_names.list',
        name: 'American Names'
      },
      {
        value: 'german_names.list',
        name: 'German Names'
      }
    ]
  },
  {
    type: 'input',
    message: 'How many names should be generated?',
    name: 'limit',
    default: 10,
    filter: (input) => parseInt(input),
    validate: (input) => (typeof(input) === 'number')
  }
]).then(answers => {
  fs.readFile('./data/'+answers.dataset, { encoding: 'utf8' }, (err, list) => {
    if (err) console.error('Whoose! There is not dataset!');
    else {
      let chain = new MarkovChain(list.split('\n'));
      let names = [];
      for (let i = 0; i < answers.limit; i++) {
        names.push(chain.generate());
      }
      names.map((name) => name.substring(0,1).toUpperCase()+name.substring(1))
          .forEach((name) => console.log(name));

    }
  })
})
