# README

---
PEER-AI
---

# Table of Contents
  * [Quick Start Guide](#chapter-0)
  * [Log](#chapter-log)
  * [FAQ](#chapter-faq)
  * [TODO](#chapter-todo)
  * [References](#chapter-references)

## Quick Start Guide <a id="chapter-0"></a>

* Change directory into the API folder
  ```
  cd api;
  ```

* Install and switch to latest Node.js version
  ```
  nvm install v9.3.0
  nvm use v9.3.0
  ```

* Run MongoDB Server
  ```
  mongod
  ```

* Compile Smart Contracts
  * Option 1: Generates build/contracts/Peerism.sol.js
    ```
    node lib/compileContract.js Peerism
    ```
  * Option 2: Genertes build/contracts/Peerism.json (DEPRECATED)
    ```
    truffle compile --compile-all;
    ```

* Deploy Smart Contracts
  * Option 1: Deploy without Truffle
    ```
    node lib/deployContract.js Peerism
    ```
  * Option 2: Deploy with Truffle (DEPRECATED)
    ```
    truffle migrate --reset --network development;
    ```

* Run Tests
  ```
  truffle test;
  ```

* Drop the server. Run server then try cURL requests
  ```
  yarn run drop; yarn run dev;
  ``` 

* Send request to server and receive response for authentication and authorisation to access specific API endpoints.
  * cURL
    * Register with email/password. JWT provided in response (i.e. `{"token":"xyz"}`)
      ```
      curl -v -X POST http://localhost:7000/users/auth/register -d "email=luke@schoen.com&password=123456&name=Luke" -H "Content-Type: application/x-www-form-urlencoded"
      curl -v -X POST http://localhost:7000/users/auth/register -d '{"email":"gavin@wood.com", "password":"123456", "name":"Gavin"}' -H "Content-Type: application/json"
      ```
    * Sign in with email/password. JWT provided in response (i.e. `{"token":"xyz"}`)
      ```
      curl -v -X POST http://localhost:7000/users/auth -d "email=luke@schoen.com&password=123456" -H "Content-Type: application/x-www-form-urlencoded"
      curl -v -X POST http://localhost:7000/users/auth -d '{"email":"gavin@wood.com", "password":"123456"}' -H "Content-Type: application/json"
      ```
    * Access a restricted endpoint by providing JWT
      ```
      curl -v -X GET http://localhost:7000/users -H "Content-Type: application/json" -H "Authorization: Bearer <INSERT_TOKEN>"
      ```
    * Create user by providing JWT
      ```
      curl -v -X POST http://localhost:7000/users/create --data '[{"email":"test@fake.com", "name":"Test"}]' -H "Content-Type: application/json" -H "Authorization: JWT <INSERT_TOKEN>"
      curl -v -X POST http://localhost:7000/users/create -d "email=test2@fake.com&name=Test2" -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: JWT <INSERT_TOKEN>"
      ```

* Send request to server with Smart Contract Name to be Compiled and Deployed to the Ethereum TestRPC and receive response with the Contract Address.
  * cURL
    ```
    curl -v -X POST http://localhost:7000/contracts/generate -d '{"contractName":"Peerism"}' -H "Content-Type: application/json"
    ```

* Run Tests on port 7111
  ```
  yarn run drop; yarn run test-watch
  ```

* Drop the database
  ```
  yarn run drop;
  ```

* Seed the database
  ```
  yarn run seed;
  ```

## Log <a id="chapter-log"></a>

* Initial setup
  ```
  git init; touch README.md; touch .gitignore; mkdir api web;
  code .;
  ```
  * [Add boilerplate contents to .gitignore for Node.js](https://github.com/github/gitignore/blob/master/Node.gitignore)

* Setup API
  ```
  cd api; yarn init -y; 
  yarn add express body-parser;
  yarn add nodemon --dev;
  touch server.js;
  ```
* Add boilerplate contents to api/server.js
* Add "dev" in "scripts" section of api/package.json

* Add Mongoose
  ```
  yarn add mongoose;
  mkdir models; touch models/init.js;
  touch models/User.js;
  touch models/seeds.js;
  touch models/drop.js
  ```

* Create Models for Mongoose
* Add boilerplate contents to models
* Add scripts to api/package.json

* Run MongoDB Server
  ```
  mongod
  ```

* MongoDB Client
  ```
  mongo

  show dbs
  use peerai
  show collections
  db.users.find({})
  db.skills.find({})
  ```

* Create routes
  ```
  mkdir routes
  ```
* Modify server.js. Add routes/users.js

* Add authentication with [Passport, Passport-Local, and Passport-Local-Mongoose](https://github.com/saintedlama/passport-local-mongoose):
  ```
  yarn add passport passport-local passport-local-mongoose
  ```
* Rename Person and people to User and users
* Add User Registration route
* Add User Sign in route
* Add JWT library to return a token instead of a user
  ```
  yarn add jsonwebtoken;
  ```
* Add Passport JWT library
  ```
  yarn add passport-jwt
  ```
* Add restricted endpoint that requires valid JWT to access
* Add Controllers https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
* Add Route Tests
  ```
  yarn add mocha chai chai-http --dev;
  mkdir -p test/routes;
  touch test/routes/users_test.js;
  ```
* Add Model Tests
  ```
  mkdir test/models;
  touch test/models/users_test.js
  ```
* Add Dotenv library to use different database in development and testing
  ```
  yarn add lodash;
  yarn add dotenv --dev;
  touch .sample-env;
  echo 'NODE_ENV=development' >> ./.sample-env;
  ```
* Add Ethereum dependencies including TestRPC
  ```
  yarn add web3@0.19 ethereumjs-util@4.4 ethereumjs-tx@1.3 eth-lightwallet@2.5;
  yarn add ethereumjs-testrpc --dev;
  yarn add solc ether-pudding --dev;
  yarn add truffle-artifactor --dev;
  ```
  * References
    * https://medium.com/@codetractio/try-out-ethereum-using-only-nodejs-and-npm-eabaaaf97c80
    * Smart Contracts without Truffle - https://medium.com/@doart3/ethereum-dapps-without-truffle-compile-deploy-use-it-e6daeefcf919
    * EthereumJS Util - Library for cryptographic hashes for Ethereum addresses - https://github.com/ethereumjs/ethereumjs-util
    * EthereumJS Tx - library to create, edit, and sign Ethereum transactions - https://github.com/ethereumjs/ethereumjs-tx
    * EthereumJS LightWallet - https://github.com/ConsenSys/eth-lightwallet
    * Solc - Compile Solidity Contract - https://www.npmjs.com/package/solc
    * Ether Pudding - Manage Solidity Contracts and Packages - https://www.npmjs.com/package/ether-pudding
    * Truffle Artifactor - replaces Ether Pudding - https://github.com/trufflesuite/truffle-artifactor
    * Reading from JSON files - https://www.codementor.io/codementorteam/how-to-use-json-files-in-node-js-85hndqt32

* Problem: Tried to manually compile using Solc with `node lib/compileContract.js ConvertLib`, which generates ConvertLib.solc.js in api/build/contracts. However it does not compile MetaCoin.sol, as it returns error `1:27: ParserError: Source "ConvertLib.sol" not found: File not supplied initially.\n ... import "./ConvertLib.sol"`.
  * Solution: Use Truffle to compile Solidity contracts with `truffle compile --compile-all`

* Run shell script in new Terminal tab (copy from https://github.com/ltfschoen/solidity_test/blob/master/testrpc.sh)
  ```
  rm -rf ./db;
  mkdir db && mkdir db/chaindb;
  cd ~/code/blockchain/solidity_test; testrpc --account '0x0000000000000000000000000000000000000000000000000000000000000001, 10002471238800000000000' \
    --account '0x0000000000000000000000000000000000000000000000000000000000000002, 10004471238800000000000' \
    --account '0x0000000000000000000000000000000000000000000000000000000000000003, 10004471238800000000000' \
    --account '0x0000000000000000000000000000000000000000000000000000000000000004, 10004471238800000000000' \
    --account '0x0000000000000000000000000000000000000000000000000000000000000005, 10004471238800000000000' \
    --account '0x0000000000000000000000000000000000000000000000000000000000000006, 10004471238800000000000' \
    --account '0x0000000000000000000000000000000000000000000000000000000000000007, 10004471238800000000000' \
    --unlock '0x0000000000000000000000000000000000000000000000000000000000000001' \
    --unlock '0x0000000000000000000000000000000000000000000000000000000000000002' \
    --unlock '0x0000000000000000000000000000000000000000000000000000000000000003' \
    --unlock '0x0000000000000000000000000000000000000000000000000000000000000004' \
    --unlock '0x0000000000000000000000000000000000000000000000000000000000000005' \
    --unlock '0x0000000000000000000000000000000000000000000000000000000000000006' \
    --unlock '0x0000000000000000000000000000000000000000000000000000000000000007' \
    --unlock '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf' \
    --unlock '0x2b5ad5c4795c026514f8317c7a215e218dccd6cf' \
    --blocktime 0 \
    --deterministic true \
    --port 8545 \
    --hostname localhost \
    --gasPrice 20000000000 \
    --gasLimit 1000000 \
    --debug true \
    --mem true \
    --db './db/chaindb'
  ```
* Install Truffle
  ```
  npm install -g truffle;
  cd api; truffle init;
  ```
* Run Truffle Unbox in separate directory to get template Metacoin example and move relevant boilerplate contracts and tests into the api/ folder
* Update package.json tests script to run tests for Smart Contracts and API tests:
  ```
  "test": "truffle test; NODE_ENV=testing mocha --recursive test/**/*_test.js",
  ```
* Remove truffle-config.js and add the following to truffle.js:
  ```
  module.exports = {
    // http://truffleframework.com/docs/advanced/configuration
    networks: {
      development: {
        host: "localhost",
        port: 8545,
        network_id: "*" // Match any network id
      }
    }
  };
  ```
* Add ethpm.json for EthPM Package Management 
  ```
  {
    "package_name": "truffle-box-peerism-api-node-express",
    "version": "0.0.1",
    "description": "Truffle Box of Peerism API built with Truffle, Node.js, Express.js,
  Solidity, Ether Pudding, and Ethereum TestRPC",
    "authors": [
      "Luke Schoen <ltfschoen@gmail.com>"
    ],
    "keywords": [
      "ethereum",
      "express.js",
      "node.js",
      "middleware",
      "api"
    ],
    "license": "MIT"
  }
  ```
  * References: 
    * http://truffleframework.com/docs/getting_started/packages-ethpm

* Open api/node_modules/bitcore-mnemoic/node_modules/bitcore-lib/index.js and commented out the following lines of code to avoid an error.
  ```
  bitcore.versionGuard = function(version) {
    // if (version !== undefined) {
    //   var message = 'More than one instance of bitcore-lib found. ' +
    //     'Please make sure to require bitcore-lib and check that submodules do' +
    //     ' not also include their own bitcore-lib dependency.';
    //   throw new Error(message);
    // }
  };
  ```

* Run Truffle Console experimentation
  ```
  truffle console --network development;
  ```

* Build script for Smart Contract (generates .sol.js file in build/contracts/)
  ```
  cd api; mkdir lib;
  node lib/compileContract.js Peerism
  ```
  * Alternatively compile with Truffle

* Deployment script for Smart Contract
  * Reference: https://medium.com/@codetractio/try-out-ethereum-using-only-nodejs-and-npm-eabaaaf97c80
  ```
  touch lib/deployContract.js;
  node lib/deployContract.js Peerism;
  ```
  * References:
    * http://truffleframework.com/docs/getting_started/contracts
    * Gas Limits - https://bitcoin.stackexchange.com/questions/39132/what-is-gas-limit-in-ethereum

## FAQ <a id="chapter-faq"></a>

* How to understand how to use Passport JWT library?
  * Refer to the library codebase on Github or in node_modules/jsonwebtoken/ i.e. [verify.js](https://github.com/auth0/node-jsonwebtoken/blob/master/verify.js)
  * Use breakpoints
  * Experiment using Node. i.e. Run `node` then
    ```
    npm install jsonwebtoken

    const JWT = require('jsonwebtoken');
    JWT.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx0ZnNjaG9lbkBnbWFpbC5jb20iLCJpYXQiOjE1MTMwNjY3NTEsImV4cCI6MTUxMzY3MTU1MSwic3ViIjoiNWEyZjkwZmZiNTI5YjI0YzM5MTA1NWM3In0.MkcCR1YD2c21x_WOQObyY-UPAQDWTcooOiO69saUVMI")
    ```

## References <a id="chapter-references"></a>

* [Express.js server API with JWT authorisation](https://www.youtube.com/watch?v=ggv3rnaHuK8)
* [Express.js Routes](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)

## TODO <a id="chapter-todo"></a>

* [ ] Integrate with Peerism React Native app
* [ ] Integrate Solidity smart contract using TestRPC
* [ ] Create a Truffle Box
  * https://github.com/trufflesuite/truffle/issues/433
  * http://truffleframework.com/boxes/