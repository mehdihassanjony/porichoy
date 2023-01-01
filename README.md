# porichoy

## [Porichoy](http://www.porichoy.gov.bd/) &middot; NID Verification Gateway of Bangladesh &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/nurulhuda859/porichoy/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/porichoy)](https://www.npmjs.com/package/porichoy)


```js
const porichoy = require('porichoy');

const person = {nid: "1234567890", dob: "2000-01-01", name: "Mehdi Hassan Jony"};

const createAccount = async () => {
  if(await porichoy.verify(person)) {
    //Your code for creating account.
  }
}
```