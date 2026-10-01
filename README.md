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

## API Coverage

This package exposes only operations with a corresponding route and HTTP verb in the official Atlas Administration API v2 specification:

- Alerts
- Atlas Search indexes
- Atlas users: create and read
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

## Migrating from v4

Version 5 targets `/api/atlas/v2` and removes v1-only public APIs that have no equivalent operation in the official v2 specification:

- `projectWhitelist`: use `projectAccesslist`.
- `dataLake`: no Atlas Administration API v2 operation is available.
- `atlasSearch.getAllAnalyzers` and `atlasSearch.upsertAnalyzer`.
- `atlasUser.update`.

Database-user item methods retain the v4 `admin` database behavior. The Atlas v2 API also supports other authentication databases through the `{databaseName}` path parameter; broader support will be added as an explicit API rather than changing existing method signatures.

## Development

```sh
npm test
```
