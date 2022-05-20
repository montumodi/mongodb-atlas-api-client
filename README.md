# Mongodb atlas api client for NODEJS

A mongdb atlas api client for nodejs.

[![Coverage Status](https://gist.github.com/montumodi/4863975b3d11c22536fcf9fcc8d237dd/raw/badge.svg)](https://gist.github.com/montumodi/4863975b3d11c22536fcf9fcc8d237dd/raw/badge.svg)
![NPM Publish](https://github.com/montumodi/mongodb-atlas-api-client/actions/workflows/.github/workflows/npmpublish.yml/badge.svg)

[![NPM](https://nodei.co/npm/mongodb-atlas-api-client.png?downloads=true)](https://www.npmjs.com/package/mongodb-atlas-api-client/)

## How to install

```
npm install mongodb-atlas-api-client
```

## Getting Started

The basic syntax is

Atlas API uses HTTP Digest Authentication. It essentially requires a username and a password which are hashed using a unique server-generated value called a nonce. The username is the API public key and the password is the corresponding private key. It internally uses [urllib](https://www.npmjs.com/package/urllib)

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
  "pretty": true,
  "httpOptions": { // This parameter will not be sent as querystring. This will be send to http request package `urllib`
    "timeout": 5000
  }
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

Following entities are currently supported

- [User](#user)
- [Cluster](#cluster)
- [CustomDbRole](#customdbrole)
- [ProjectWhitelist](#projectwhitelist)
- [ProjectAccesslist](#projectaccesslist)
- [Project](#project)
- [Organization](#organization)
- [AtlasUser](#atlasuser)
- [Event](#event)
- [Alert](#alert)
- [DataLake](#datalake)
- [AtlasSearch](#atlassearch)

### User

### user.get(username, [options]) ⇒ <code>Promise</code>
Function - Returns the details of user name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | name of the user for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib. |

More details - https://docs.atlas.mongodb.com/reference/api/database-users-get-single-user/

### user.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the users. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/database-users-get-all-users/

### user.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the user as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for user which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/database-users-create-a-user/

### user.update(username, body, [options]) ⇒ <code>Promise</code>
Function - Updates the user for the username passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | name of the user for which details needs to be updated |
| body | <code>Object</code> |  | Body which has details for user which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/database-users-update-a-user/

### user.delete(username, [options]) ⇒ <code>Promise</code>
Function - Deletes the user name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | name of the user which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/database-users-delete-a-user/

### Cluster

### cluster.get(clustername, [options]) ⇒ <code>Promise</code>
Function - Returns the details of cluster name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clustername | <code>String</code> |  | name of the cluster for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-get-one/

### cluster.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the clusters. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-get-all/

### cluster.getAdvanceConfiguration(clustername, [options]) ⇒ <code>Promise</code>
Function - Returns the advance configuration of cluster name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clustername | <code>String</code> |  | name of the cluster for which advance configuration needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-get-advanced-configuration-options/

### cluster.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the cluster as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for cluster which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-create-one/

### cluster.update(clustername, body, [options]) ⇒ <code>Promise</code>
Function - Updates the cluster for the clustername passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clustername | <code>String</code> |  | name of the cluster for which details needs to be updated |
| body | <code>Object</code> |  | Body which has details for cluster which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-modify-one/

### cluster.updateAdvanceConfiguration(clustername, body, [options]) ⇒ <code>Promise</code>
Function - Updates the advance configuration of cluster for the clustername passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clustername | <code>String</code> |  | name of the cluster for which advance configuration needs to be updated |
| body | <code>Object</code> |  | Body which has details for cluster which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-modify-advanced-configuration-options/

### cluster.testPrimaryFailOver(clustername, [options]) ⇒ <code>Promise</code>
Function - Tests failure of primary replica set member.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clustername | <code>String</code> |  | name of the cluster for which failure needs to be tested |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-test-failover/

### cluster.delete(clustername, [options]) ⇒ <code>Promise</code>
Function - Deletes the cluster name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clustername | <code>String</code> |  | name of the cluster which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/clusters-delete-one/

### CustomDbRole

### customDbRole.get(rolename, [options]) ⇒ <code>Promise</code>
Function - Returns the details of role name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rolename | <code>String</code> |  | name of the role for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/custom-roles-get-single-role/

### customDbRole.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the roles. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/custom-roles-get-all-roles/

### customDbRole.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the role as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for role which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/custom-roles-create-a-role/

### customDbRole.update(rolename, body, [options]) ⇒ <code>Promise</code>
Function - Updates the role for the rolename passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rolename | <code>String</code> |  | name of the role for which details needs to be updated |
| body | <code>Object</code> |  | Body which has details for role which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/custom-roles-update-a-role/

### customDbRole.delete(rolename, [options]) ⇒ <code>Promise</code>
Function - Deletes the role name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rolename | <code>String</code> |  | name of the role which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/custom-roles-delete-a-role/

### ProjectWhitelist

### projectWhitelist.get(whitelistentry, [options]) ⇒ <code>Promise</code>
Function - Returns the details of whitelistentry name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| whitelistentry | <code>String</code> |  | name of the whitelistentry for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/whitelist-get-one-entry/

### projectWhitelist.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the whitelistentries. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/whitelist-get-all/

### projectWhitelist.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the whitelistentry as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for whitelistentry which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/whitelist-add-one/

### projectWhitelist.update(body, [options]) ⇒ <code>Promise</code>
Function - Updates the whitelistentry passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for whitelistentry which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/whitelist-update-one/

### projectWhitelist.delete(whitelistentry, [options]) ⇒ <code>Promise</code>
Function - Deletes the whitelistentry name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| whitelistentry | <code>String</code> |  | name of the whitelistentry which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/whitelist-delete-one/

### ProjectAccesslist

### projectAccesslist.get(accesslistentry, [options]) ⇒ <code>Promise</code>
Function - Returns the details of accesslistentry name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| accesslistentry | <code>String</code> |  | name of the accesslistentry for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/ip-access-list/get-one-access-list-entry/

### projectAccesslist.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the accesslistentries. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/ip-access-list/get-all-access-list-entries/

### projectAccesslist.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the accesslistentry as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for accesslistentry which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/ip-access-list/add-entries-to-access-list/

### projectAccesslist.update(body, [options]) ⇒ <code>Promise</code>
Function - Updates the accesslistentry passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for accesslistentry which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/ip-access-list/add-entries-to-access-list/

### projectAccesslist.delete(accesslistentry, [options]) ⇒ <code>Promise</code>
Function - Deletes the accesslistentry name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| accesslistentry | <code>String</code> |  | name of the accesslistentry which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/ip-access-list/delete-one-access-list-entry/

### Project

### project.getById(projectId, [options]) ⇒ <code>Promise</code>
Function - Returns the details of project id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| projectId | <code>String</code> |  | project id for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/project-get-one/

### project.getByName(projectName, [options]) ⇒ <code>Promise</code>
Function - Returns the details of project name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| projectId | <code>String</code> |  | project name for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/project-get-one-by-name/

### project.getTeamsByProjectId(projectId, [options]) ⇒ <code>Promise</code>
Function - Returns the teams of project id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| projectId | <code>String</code> |  | project id for which teams needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/project-get-teams/

### project.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the projects. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/project-get-all/

### project.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the project as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for project which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/project-create-one/

### project.assignTeams(projectId, body, [options]) ⇒ <code>Promise</code>
Function - Assigns the teams for the projectId passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| projectId | <code>String</code> |  | Id of the project for which teams needs to be associated |
| body | <code>Object</code> |  | Body which has details for teams which needs to be associated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/project-add-team/

### project.delete(projectId, [options]) ⇒ <code>Promise</code>
Function - Deletes the project id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| projectId | <code>String</code> |  | Id of the project which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/project-delete-one/

### project.removeUserFromProject(projectId, userId, [options]) ⇒ <code>Promise</code>
Function - Removes the user id passed from the project.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | <code>String</code> |  | Id of the user which needs to be removed from project |
| projectId | <code>String</code> |  | Id of the project |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/project-remove-user/

### Organization

### organization.getById(organizationId, [options]) ⇒ <code>Promise</code>
Function - Returns the details of organization id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | org§ id for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/organization-get-one/

### organization.getAllUsersForOrganization(organizationId, [options]) ⇒ <code>Promise</code>
Function - Returns all the users for organization id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | organization id for which users needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/organization-users-get-all-users/

### organization.getAllProjectsForOrganization(organizationId, [options]) ⇒ <code>Promise</code>
Function - Returns all the projects for organization id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | organization id for which projects needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/organization-get-all-projects/

### organization.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the organizations. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/organization-get-all/

### organization.rename(organizationId, body, [options]) ⇒ <code>Promise</code>
Function - Renames the organization

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | Id of the organization for which needs to be renamed |
| body | <code>Object</code> |  | Body which has details for organization which needs to be renamed |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/organization-rename/

### organization.invite(organizationId, body, [options]) ⇒ <code>Promise</code>
Function - Sends an invitation to the given email (username) to join the Organization

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | Id of the organization for which needs to be renamed |
| body | <code>Object</code> |  | Organization invitation details 
| body.roles | <code>string[]</code> |  | Atlas roles to assign to the invited user. If the user accepts the invitation, Atlas assigns these roles to them. |
| body.teamIds | <code>string[]</code> |  | *(Optional)* Unique 24-hexadecimal digit strings that identify the teams that you invite the user to join. 
| body.username | <code>string</code> |  | Email address of the invited user. This is the address to which Atlas sends the invite. 
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/organization-create-one-invitation/


### organization.delete(organizationId, [options]) ⇒ <code>Promise</code>
Function - Deletes the project id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | Id of the organization which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/organization-delete-one/

### AtlasUser

### atlasUser.getById(userId, [options]) ⇒ <code>Promise</code>
Function - Returns the details of user id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | <code>String</code> |  | Id of the user for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/user-get-by-id/

### atlasUser.getByName(username, [options]) ⇒ <code>Promise</code>
Function - Returns the details of user name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | Name of the user for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/user-get-one-by-name/

### atlasUser.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the users. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/user-get-all/

### atlasUser.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the atlas user as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for atlas user which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/user-create/

### atlasUser.update(userId, body, [options]) ⇒ <code>Promise</code>
Function - Updates the user for the userId passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | <code>String</code> |  | Id of the user for which details needs to be updated |
| body | <code>Object</code> |  | Body which has details for user which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/user-update/

### Event

### event.get(eventId, [options]) ⇒ <code>Promise</code>
Function - Returns the details of event id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| eventId | <code>String</code> |  | id of the event for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/events-projects-get-one/

### event.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the events. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/events-projects-get-all/

### event.getByOrganizationId(organizationId, eventId, [options]) ⇒ <code>Promise</code>
Function - Returns the details of event id passed for organization id.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | id of the organization for which details needs to be retrieved |
| eventId | <code>String</code> |  | id of the event for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/events-orgs-get-one/

### event.getAllByOrganizationId(organizationId, [options]) ⇒ <code>Promise</code>
Function - Returns all the events. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | id of the organization for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/events-orgs-get-all/

### Alert

### alert.get(alertId, [options]) ⇒ <code>Promise</code>
Function - Returns the details of alert id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| alertId | <code>String</code> |  | id of the alert for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/alerts-get-alert/

### alert.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the alerts. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/alerts-get-all-alerts/

### event.acknowledge(alertId, [options]) ⇒ <code>Promise</code>
Function - Acknowledge or unacknowledge an alert

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| alertId | <code>String</code> |  | id of the alert which needs to be acknowledged |
| body | <code>Object</code> |  | Body which has details for alert which needs to be acknowledged |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/alerts-acknowledge-alert/

### DataLake

### dataLake.get(dataLakeName, [options]) ⇒ <code>Promise</code>
Function - Returns the details of dataLake name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataLakeName | <code>String</code> |  | name of the dataLake for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.mongodb.com/datalake/reference/api/dataLakes-get-one-tenant/

### dataLake.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the dataLakes. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.mongodb.com/datalake/reference/api/dataLakes-get-all-tenants/

### dataLake.getLogsStream(dataLakeName, [options]) ⇒ <code>Promise</code>
Function - Returns the dataLake logs stream.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataLakeName | <code>String</code> |  | name of the dataLake for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.mongodb.com/datalake/reference/api/dataLakes-download-query-logs/

### dataLake.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the dataLake as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for dataLake which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.mongodb.com/datalake/reference/api/dataLakes-create-one-tenant/

### dataLake.update(dataLakeName, body, [options]) ⇒ <code>Promise</code>
Function - Updates the dataLake for the username passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataLakeName | <code>String</code> |  | name of the dataLake for which details needs to be retrieved |
| body | <code>Object</code> |  | Body which has details for dataLake which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.mongodb.com/datalake/reference/api/dataLakes-update-one-tenant/

### dataLake.delete(dataLakeName, [options]) ⇒ <code>Promise</code>
Function - Deletes the dataLake name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| dataLakeName | <code>String</code> |  | name of the datalake which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.mongodb.com/datalake/reference/api/dataLakes-delete-one-tenant/

### CloudProviderAccess

### cloudProviderAccess.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the cloudProviderAccess. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/cloud-provider-access-get-roles/

### cloudProviderAccess.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the cloudProviderAccess as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for cloudProviderAccess which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/cloud-provider-access-create-one-role/

### cloudProviderAccess.update(roleId, body, [options]) ⇒ <code>Promise</code>
Function - Updates the cloudProviderAccess for the roleId passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| roleId | <code>String</code> |  | roleId of the cloudProviderAccess for which details needs to be updated |
| body | <code>Object</code> |  | Body which has details for dataLake which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/cloud-provider-access-authorize-one-role/

### cloudProviderAccess.delete(roleId, [options]) ⇒ <code>Promise</code>
Function - Deletes the cloudProviderAccess name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| roleId | <code>String</code> |  | roleId of the cloudProviderAccess which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/cloud-provider-access-deauthorize-one-role/

### AtlasSearch

### atlasSearch.get(clusterName, indexId, [options]) ⇒ <code>Promise</code>
Function - Returns the details of atlas search index by cluster name and index passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clusterName | <code>String</code> |  | name of the cluster for which details needs to be retrieved |
| indexId | <code>String</code> |  | id of the index for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/fts-indexes-get-one/

### atlasSearch.getAll(clusterName, databaseName, collectionName, [options]) ⇒ <code>Promise</code>
Function - Returns all the atlas search indexes. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clusterName | <code>String</code> |  | name of the cluster for which details needs to be retrieved |
| databaseName | <code>String</code> |  | name of the database for which details needs to be retrieved |
| collectionName | <code>String</code> |  | name of the collection for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/fts-indexes-get-all/

### atlasSearch.getAllAnalyzers(clusterName, [options]) ⇒ <code>Promise</code>
Function - Returns all the Analyzers. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clusterName | <code>String</code> |  | name of the cluster for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/fts-analyzers-get-all/

### atlasSearch.create(clusterName, body, [options]) ⇒ <code>Promise</code>
Function - Creates the atlas search index as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clusterName | <code>String</code> |  | name of the cluster for which details needs to be retrieved |
| body | <code>Object</code> |  | Body which has details for cluster which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/fts-indexes-create-one/

### atlasSearch.update(clusterName, indexId, body, [options]) ⇒ <code>Promise</code>
Function - Updates the atlas search index for the clusterName passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clusterName | <code>String</code> |  | name of the cluster for which details needs to be updated |
| indexId | <code>String</code> |  | name of the index for which details needs to be updated |
| body | <code>Object</code> |  | Body which has details for cluster which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/fts-indexes-update-one/

### atlasSearch.upsertAnalyzer(clusterName, body, [options]) ⇒ <code>Promise</code>
Function - Upserts the analyser for the clusterName passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clusterName | <code>String</code> |  | name of the cluster for which details needs to be upserted |
| body | <code>Object</code> |  | Body which has details for cluster which needs to be upserted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/fts-analyzers-update-all/

### atlasSearch.delete(clusterName, indexId, [options]) ⇒ <code>Promise</code>
Function - Deletes the atlas search index by cluster name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| clusterName | <code>String</code> |  | name of the cluster which needs to be deleted |
| indexId | <code>String</code> |  | name of the index for which details needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api. It can also include httpOptions which will be sent to `urllib`. More info can be found here - https://github.com/node-modules/urllib |

More details - https://docs.atlas.mongodb.com/reference/api/fts-indexes-delete-one/


