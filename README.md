# Mongodb atlas api client

A mongdb atlas api client for nodejs.

[![Greenkeeper badge](https://badges.greenkeeper.io/montumodi/mongodb-atlas-api-client.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/montumodi/mongodb-atlas-api-client/badge.svg?branch=master)](https://coveralls.io/github/montumodi/mongodb-atlas-api-client?branch=master)
[![Build Status](https://travis-ci.org/montumodi/mongodb-atlas-api-client.svg?branch=master)](https://travis-ci.org/montumodi/mongodb-atlas-api-client)
[![Deps](https://david-dm.org/montumodi/mongodb-atlas-api-client.svg)](https://david-dm.org/montumodi/mongodb-atlas-api-client#info=dependencies)
[![devDependency Status](https://david-dm.org/montumodi/mongodb-atlas-api-client/dev-status.svg)](https://david-dm.org/montumodi/mongodb-atlas-api-client#info=devDependencies)

[![NPM](https://nodei.co/npm/mongodb-atlas-api-client.png?downloads=true)](https://www.npmjs.com/package/mongodb-atlas-api-client/)

## How to install

```
npm install mongodb-atlas-api-client
```

## Getting Started

The basic syntax is:

```js
const getClient = require("mongodb-atlas-api-client");
const {user} = getClient({
  "publicKey": "some public key",
  "privateKey": "some private key",
  "baseUrl": "https://cloud.mongodb.com/api/atlas/v1.0",
  "projectId": "some project/group id"
});

const options = {
  "envelope": true,
  "itemsPerPage": 10,
  "pretty": true
}

const response = await user.getAll(options); // get All users
const response = await user.get("someUserName"); // get single user
const response = await user.delete("someUserName", options); // delete single user
const response = await user.create(body, options); // create user
const response = await user.update("someUserName", body, options); // update user

```

## Running the tests

`npm test`

### API

<a src="https://docs.atlas.mongodb.com/reference/api/database-users-get-single-user/">get</a>

### user.get(username, [options]) ⇒ <code>Promise</code>
Function - Returns the details of user name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | name of the user for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which needs to be passed to atlas api |