# Mongodb atlas api client for NODEJS

A mongdb atlas api client for nodejs.

[![Known Vulnerabilities](https://snyk.io/test/github/montumodi/mongodb-atlas-api-client/badge.svg)](https://snyk.io/test/github/montumodi/mongodb-atlas-api-client)
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

Atlas API uses HTTP Digest Authentication. It essentially requires a username and a password which are hashed using a unique server-generated value called a nonce. The username is the API public key and the password is the corresponding private key.

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

### User

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

### Cluster

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

### CustomDbRole

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

### ProjectWhitelist

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

### ProjectAccesslist

### projectAccesslist.get(accesslistentry, [options]) ⇒ <code>Promise</code>
Function - Returns the details of accesslistentry name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| accesslistentry | <code>String</code> |  | name of the accesslistentry for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/ip-access-list/get-one-access-list-entry/

### projectAccesslist.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the accesslistentries. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/ip-access-list/get-all-access-list-entries/

### projectAccesslist.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the accesslistentry as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for accesslistentry which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/ip-access-list/add-entries-to-access-list/

### projectAccesslist.update(body, [options]) ⇒ <code>Promise</code>
Function - Updates the accesslistentry passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for accesslistentry which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/ip-access-list/add-entries-to-access-list/

### projectAccesslist.delete(accesslistentry, [options]) ⇒ <code>Promise</code>
Function - Deletes the accesslistentry name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| accesslistentry | <code>String</code> |  | name of the accesslistentry which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/ip-access-list/delete-one-access-list-entry/

### Project

### project.getById(projectId, [options]) ⇒ <code>Promise</code>
Function - Returns the details of project id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| projectId | <code>String</code> |  | project id for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/project-get-one/

### project.getByName(projectName, [options]) ⇒ <code>Promise</code>
Function - Returns the details of project name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| projectId | <code>String</code> |  | project name for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/project-get-one-by-name/

### project.getTeamsByProjectId(projectId, [options]) ⇒ <code>Promise</code>
Function - Returns the teams of project id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| projectId | <code>String</code> |  | project id for which teams needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/project-get-teams/

### project.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the projects. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/project-get-all/

### project.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the project as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for project which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/project-create-one/

### project.assignTeams(projectId, body, [options]) ⇒ <code>Promise</code>
Function - Assigns the teams for the projectId passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| projectId | <code>String</code> |  | Id of the project for which teams needs to be associated |
| body | <code>Object</code> |  | Body which has details for teams which needs to be associated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/project-add-team/

### project.delete(projectId, [options]) ⇒ <code>Promise</code>
Function - Deletes the project id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| projectId | <code>String</code> |  | Id of the project which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/project-delete-one/

### project.removeUserFromProject(projectId, userId, [options]) ⇒ <code>Promise</code>
Function - Removes the user id passed from the project.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | <code>String</code> |  | Id of the user which needs to be removed from project |
| projectId | <code>String</code> |  | Id of the project |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/project-remove-user/

### Organization

### organization.getById(organizationId, [options]) ⇒ <code>Promise</code>
Function - Returns the details of organization id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | org§ id for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/organization-get-one/

### organization.getAllUsersForOrganization(organizationId, [options]) ⇒ <code>Promise</code>
Function - Returns all the users for organization id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | organization id for which users needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/organization-users-get-all-users/

### organization.getAllProjectsForOrganization(organizationId, [options]) ⇒ <code>Promise</code>
Function - Returns all the projects for organization id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | organization id for which projects needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/organization-get-all-projects/

### organization.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the organizations. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/organization-get-all/

### organization.rename(organizationId, body, [options]) ⇒ <code>Promise</code>
Function - Renames the organization

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | Id of the organization for which needs to be renamed |
| body | <code>Object</code> |  | Body which has details for organization which needs to be renamed |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/organization-rename/

### organization.delete(organizationId, [options]) ⇒ <code>Promise</code>
Function - Deletes the project id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | Id of the organization which needs to be deleted |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/organization-delete-one/

### AtlasUser

### atlasUser.getById(userId, [options]) ⇒ <code>Promise</code>
Function - Returns the details of user id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | <code>String</code> |  | Id of the user for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/user-get-by-id/

### atlasUser.getByName(username, [options]) ⇒ <code>Promise</code>
Function - Returns the details of user name passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| username | <code>String</code> |  | Name of the user for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/user-get-one-by-name/

### atlasUser.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the users. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/user-get-all/

### atlasUser.create(body, [options]) ⇒ <code>Promise</code>
Function - Creates the atlas user as per body passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| body | <code>Object</code> |  | Body which has details for atlas user which needs to be created |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/user-create/

### atlasUser.update(userId, body, [options]) ⇒ <code>Promise</code>
Function - Updates the user for the userId passed. It only updates the properties passed in body.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| userId | <code>String</code> |  | Id of the user for which details needs to be updated |
| body | <code>Object</code> |  | Body which has details for user which needs to be updated |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/user-update/

### Event

### event.get(eventId, [options]) ⇒ <code>Promise</code>
Function - Returns the details of event id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| eventId | <code>String</code> |  | id of the event for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/events-projects-get-one/

### event.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the events. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/events-projects-get-all/

### event.getByOrganizationId(organizationId, eventId, [options]) ⇒ <code>Promise</code>
Function - Returns the details of event id passed for organization id.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | id of the organization for which details needs to be retrieved |
| eventId | <code>String</code> |  | id of the event for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/events-orgs-get-one/

### event.getAllByOrganizationId(organizationId, [options]) ⇒ <code>Promise</code>
Function - Returns all the events. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| organizationId | <code>String</code> |  | id of the organization for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/events-orgs-get-all/

### Alert

### alert.get(alertId, [options]) ⇒ <code>Promise</code>
Function - Returns the details of alert id passed.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| alertId | <code>String</code> |  | id of the alert for which details needs to be retrieved |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/alerts-get-alert/

### alert.getAll([options]) ⇒ <code>Promise</code>
Function - Returns all the alerts. Pagination can be controlled via options object.

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/alerts-get-all-alerts/

### event.acknowledge(alertId, [options]) ⇒ <code>Promise</code>
Function - Acknowledge or unacknowledge an alert

**Returns**: <code>Promise</code> - - promise which resolves on success and rejects on error  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| alertId | <code>String</code> |  | id of the alert which needs to be acknowledged |
| body | <code>Object</code> |  | Body which has details for alert which needs to be acknowledged |
| [options] | <code>Object</code> | <code>{}</code> | Optional object containing extra query strings which will be passed to atlas api |

More details - https://docs.atlas.mongodb.com/reference/api/alerts-acknowledge-alert/


