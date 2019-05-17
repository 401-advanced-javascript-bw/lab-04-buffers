'use strict';

const fs = require('fs');

let buffer1 = Buffer.alloc(95);

let part1 = `'use strict'; 

let arr = ['Bob', 'Sam', 'Ana'];
arr.forEach(name => {
  console.log(name);
});`;

function getCode(string) {
  for (let i = 0; i < string.length; i++) {
    buffer1[i] = string.charCodeAt(i);
  }
}
getCode(part1);

// let final = buffer1.toString();

fs.writeFile('files/loop.js', buffer1, err => {
  if (err) throw err;
  console.log('the file has been saved!');
});

const util = require('util');
const readFile = util.promisify(fs.readFile);

let stringifyBuffer = buffer => {
  let str = '';
  for (let char of buffer) {
    str += String.fromCharCode(char);
  }
  return str;
};

function article() {
  readFile('files/pair-programming.txt')
    .then(data => {
      return stringifyBuffer(incorporateArticleTags(data));
    })
    .then(data => {
      return incorporateh2s(data);
    })
    .then(data => {
      console.log('list items!!', incorporateListItems(data));
    })
    .catch(console.error);
}

console.log(article());

// fs.writeFile('files/index.html', , err => {
//   if (err) throw err;
//   console.log('the file has been saved!');
// });

function incorporateArticleTags(data) {
  //create article tags
  let articleStart = Buffer.from(`<article>
  `);
  let articleEnd = Buffer.from('</article>');

  //attach article tags
  let result = Buffer.concat([articleStart, data, articleEnd]);
  return result;
}

function incorporateh2s(data) {
  let h2Start = '<h2>';
  let h2End = '</h2>';
  let splitted = data.split('\n');
  splitted[1] = `${h2Start}${splitted[1]}${h2End}`;
  splitted[4] = `${h2Start}${splitted[4]}${h2End}`;
  splitted[7] = `${h2Start}${splitted[7]}${h2End}`;
  splitted[10] = `${h2Start}${splitted[10]}${h2End}`;
  return splitted.join('\n');
}

function incorporateListItems(data) {
  // let splitted = data.split('\n');
  let liStart = '<li>';
  let liEnd = '</li>';
  let regex = /^((While|Iterative|It|When|Everyone|Pair|A|Many) .*[,\s])/gm;
  let result = data
    .match(regex)
    .join('')
    .match(/[^.!?\n]+[.!?]+/g);

  for (let i in result) {
    result[i] = `${liStart}${result[i]}${liEnd}`;
  }

  return result;
}
