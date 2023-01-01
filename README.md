# porichoy

## [Porichoy](http://www.porichoy.gov.bd/) &middot; NID Verification Gateway of Bangladesh &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/nurulhuda859/porichoy/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/porichoy)](https://www.npmjs.com/package/porichoy)

```js
const porichoy = require('porichoy');

const person = {
  nid: '1234567890',
  dob: '2000-01-01',
  name: 'Mehdi Hassan Jony',
};

const createAccount = async () => {
  if (await porichoy.verify(person)) {
    //Your code for creating account.
  }
};
```

## Intro

This package will make it very easy to use Porichoy API in your NodeJS project along with nestjs and express. It has some dependency like @nestjs/axios, @nestjs/config, moment, rxjs. This package is now ready to use in production. Although more new features are on the way. Feel free to provide feedback, I will highly appreciate it.

- Visit the official [website](http://www.porichoy.gov.bd/) of Porichoy API to get your API Key.
- For Porichoy API documentation visit this [website](https://porichoy.azurewebsites.net/docs/index.html).
- This npm package is still under mass development. This package is not managed by the officials of Porichoy API.

## Configaration

#### Setting API Key.
set env variable `PORICHOY_BASE_URL = <api_url>`
set env api  `PORICHOY_KEY = <api_key>`

## Example Usage
####The callback approach
```js
export class DemoService{
    constructor(
        private nidService: NidVerificationService,
    ){}

const person = {nid: "1456782945", dob: "1999-11-29", name: "Asik Ahmed"};


const nidUserResponse: NIDVerificationResponse =
        await this.nidService.verify(person);

if (!nidUserResponse)
        throw new BadRequestException(
          'Nid verification failed with the provider NID and DOB',
        );

(async () => console.log((await this.nidService.verify(person))? 'Valid NID':'Invalid NID'))();
}
```
