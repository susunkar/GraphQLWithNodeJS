import myCurrentLocation, { getGreeting, message, name } from './myModule'
// import myCurrentLocation from './myModule'

import sum, { Substract } from './math'


console.log(message);
console.log(name);
console.log(myCurrentLocation);
console.log(getGreeting('Kumar'));

console.log('Add:' + sum(10, 20));
console.log('Sub:' + Substract(30, -20));