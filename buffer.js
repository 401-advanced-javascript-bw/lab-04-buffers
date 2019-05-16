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

let final = buffer1.toString();

fs.writeFile('files/loop.js', final, err => {
  if (err) throw err;
  console.log('the file has been saved!');
});
