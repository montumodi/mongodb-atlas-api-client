# MongoDB Atlas API Client

A Node.js client for the MongoDB Atlas Administration API v2.

## Install

```sh
npm install mongodb-atlas-api-client
```

## Usage

Atlas API requests use HTTP Digest Authentication with an Atlas API public key and private key.

```js
const getClient = require("mongodb-atlas-api-client");

const client = getClient({
  "publicKey": process.env.ATLAS_PUBLIC_KEY,
  "privateKey": process.env.ATLAS_PRIVATE_KEY,
  "baseUrl": "https://cloud.mongodb.com/api/atlas/v2",
  "projectId": "your-project-id",
  "apiVersion": "2025-03-12"
});

const clusters = await client.cluster.getAll({"itemsPerPage": 10});
```

`options` values become Atlas query parameters. Use `options.httpOptions` for additional `urllib` request options, such as `timeout`.

The client sends the required versioned API `Accept` header for resource version `2025-03-12`. Set `apiVersion` only when you have reviewed the corresponding official API changelog and migrated the affected resource requests.

Use `onResponse` to observe Atlas response metadata, including `Deprecation` and `Sunset` lifecycle headers.

### Resource Versions

The client uses the Atlas Administration API v2 base URL and sends the selected resource version in the `Accept` header. It defaults to `2025-03-12`, but you can provide another supported resource version explicitly:

```js
const client = getClient({
  "publicKey": process.env.ATLAS_PUBLIC_KEY,
  "privateKey": process.env.ATLAS_PRIVATE_KEY,
  "baseUrl": "https://cloud.mongodb.com/api/atlas/v2",
  "projectId": "your-project-id",
  "apiVersion": "2025-02-19"
});
```

Review the [Atlas API changelog](https://www.mongodb.com/docs/api/doc/atlas-admin-api-v2/whats-new/) and the version-specific API documentation before selecting a resource version. The `baseUrl` must end in `/api/atlas/v2`; v5 does not support `/api/atlas/v1.0` URLs or automatically translate v1 requests to v2.

## API Coverage

This package exposes only operations with a corresponding route and HTTP verb in the official Atlas Administration API v2 specification:

- Alerts
- Atlas Search indexes
- Cloud users: create and read
- Cloud backup
- Cloud provider access
- Clusters
- Custom database roles
- Events
- Organizations
- Projects
- Project access lists
- Database users for the `admin` database

Method signatures and types are published at
[montumodi.github.io/mongodb-atlas-api-client](https://montumodi.github.io/mongodb-atlas-api-client/),
generated from the TypeScript declarations. Run `npm run docs` to build them locally.

Refer to the [official Atlas Administration API v2 documentation](https://www.mongodb.com/docs/api/doc/atlas-admin-api-v2/) for request and response schemas.

## Upgrade From v4

Version 5 is a breaking release. It targets the Atlas Administration API v2, so update the package and client configuration together:

```sh
npm install mongodb-atlas-api-client@^5
```

```js
const client = getClient({
  "publicKey": process.env.ATLAS_PUBLIC_KEY,
  "privateKey": process.env.ATLAS_PRIVATE_KEY,
  "baseUrl": "https://cloud.mongodb.com/api/atlas/v2",
  "projectId": "your-project-id"
});
```

The default resource version is `2025-03-12`. You can select another supported version with `apiVersion`, but review the [Atlas API changelog](https://www.mongodb.com/docs/api/doc/atlas-admin-api-v2/whats-new/) and test the affected requests before changing it.

### Renamed and removed APIs

Make these source changes when upgrading:

| v4 | v5 |
| --- | --- |
| `client.projectWhitelist` | `client.projectAccesslist` |
| `client.projectWhitelist.update(body)` | `client.projectAccesslist.create(body)` |

The following v4 APIs were removed because Atlas Administration API v2 has no corresponding operation in this client:

- `client.dataLake`
- `client.atlasSearch.getAllAnalyzers()`
- `client.atlasSearch.upsertAnalyzer()`
- `client.atlasUser.update()` (v1 profile updates; use `client.cloudUser.updateRoles()` for v2 project-role updates)

Cloud-user methods are available under `client.cloudUser`. The older `client.atlasUser` name remains as a compatibility alias.

The old `projectWhitelist` TypeScript types were also replaced by `projectAccesslist` types. Database-user item methods use `admin` by default and accept an optional database name (`admin` or `$external`):

```js
await client.user.get("username", "$external");
await client.user.update("username", body, "$external");
await client.user.delete("username", "$external");
```

## Development

```sh
npm test
```
