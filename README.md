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

### user.get(username, [options]) ⇒ <code>Promise</code>
Function - Returns the details of user name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | name of the user for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/database-users-get-single-user/

### user.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the users. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/database-users-get-all-users/

### user.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the user as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for user which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/database-users-create-a-user/

### user.update(username, body, [options]) ⇒ <code>Promise</code>
Function - Updates the user for the username passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | name of the user for which details needs to be updated |
| body | <code>Object</code> |  | Body which has details for user which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/database-users-update-a-user/

### user.delete(username, [options]) ⇒ <code>Promise</code>
Function - Deletes the user name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | name of the user which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/database-users-delete-a-user/



