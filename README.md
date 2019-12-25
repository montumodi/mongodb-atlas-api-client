# Mongodb atlas api client

A mongdb atlas api client for nodejs.

[![Greenkeeper badge](https://badges.greenkeeper.io/montumodi/mongodb-atlas-api-client.svg)](https://greenkeeper.io/)
[![Coverage Status](https://coveralls.io/repos/github/montumodi/mongodb-atlas-api-client/badge.svg?branch=master)](https://coveralls.io/github/montumodi/mongodb-atlas-api-client?branch=master)
[![Build Status](https://travis-ci.com/montumodi/mongodb-atlas-api-client.svg?branch=master)](https://travis-ci.com/montumodi/mongodb-atlas-api-client)
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
const {user, cluster} = getClient({
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
const response = await cluster.get("someClusterName"); // get single cluster
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

### cluster.get(clustername, [options]) ⇒ <code>Promise</code>
Function - Returns the details of cluster name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clustername | <code>String</code> |  | name of the cluster for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-get-one/

### cluster.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the clusters. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-get-all/

### cluster.getAdvanceConfiguration(clustername, [options]) ⇒ <code>Promise</code>
Function - Returns the advance configuration of cluster name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clustername | <code>String</code> |  | name of the cluster for which advance configuration needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-get-advanced-configuration-options/

### cluster.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the cluster as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for cluster which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-create-one/

### cluster.update(clustername, body, [options]) ⇒ <code>Promise</code>
Function - Updates the cluster for the clustername passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clustername | <code>String</code> |  | name of the cluster for which details needs to be updated |
| body | <code>Object</code> |  | Body which has details for cluster which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-modify-one/

### cluster.updateAdvanceConfiguration(clustername, body, [options]) ⇒ <code>Promise</code>
Function - Updates the advance configuration of cluster for the clustername passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clustername | <code>String</code> |  | name of the cluster for which advance configuration needs to be updated |
| body | <code>Object</code> |  | Body which has details for cluster which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-modify-advanced-configuration-options/

### cluster.testPrimaryFailOver(clustername, [options]) ⇒ <code>Promise</code>
Function - Tests failure of primary replica set member.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clustername | <code>String</code> |  | name of the cluster for which failure needs to be tested |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-test-failover/

### cluster.delete(clustername, [options]) ⇒ <code>Promise</code>
Function - Deletes the cluster name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clustername | <code>String</code> |  | name of the cluster which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-delete-one/

### customDbRole.get(rolename, [options]) ⇒ <code>Promise</code>
Function - Returns the details of role name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rolename | <code>String</code> |  | name of the role for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/custom-roles-get-single-role/

### customDbRole.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the roles. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/custom-roles-get-all-roles/

### customDbRole.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the role as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for role which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/custom-roles-create-a-role/

### customDbRole.update(rolename, body, [options]) ⇒ <code>Promise</code>
Function - Updates the role for the rolename passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rolename | <code>String</code> |  | name of the role for which details needs to be updated |
| body | <code>Object</code> |  | Body which has details for role which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/custom-roles-update-a-role/

### customDbRole.delete(rolename, [options]) ⇒ <code>Promise</code>
Function - Deletes the role name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rolename | <code>String</code> |  | name of the role which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/custom-roles-delete-a-role/

### projectWhitelist.get(whitelistentry, [options]) ⇒ <code>Promise</code>
Function - Returns the details of whitelistentry name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| whitelistentry | <code>String</code> |  | name of the whitelistentry for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/whitelist-get-one-entry/

### projectWhitelist.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the whitelistentries. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/whitelist-get-all/

### projectWhitelist.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the whitelistentry as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for whitelistentry which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/whitelist-add-one/

### projectWhitelist.update(body, [options]) ⇒ <code>Promise</code>
Function - Updates the whitelistentry passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for whitelistentry which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/whitelist-update-one/

### projectWhitelist.delete(whitelistentry, [options]) ⇒ <code>Promise</code>
Function - Deletes the whitelistentry name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| whitelistentry | <code>String</code> |  | name of the whitelistentry which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/whitelist-delete-one/



