# Live Integration Tests

Run only against a disposable Atlas project and credentials with the minimum required roles.

1. Copy `env.example` to `.env` in the repository root.
2. Set `ATLAS_RUN_INTEGRATION=true`.
3. Enable only the CRUD flags you intend to run.
4. Run `npm run test:integration`.

To run only one resource suite, pass its file to the single-file command:

```sh
npm run test:integration:file -- intergation/cluster.integration.js
```

Tests register cleanup immediately after creating a resource and execute cleanup in reverse order. Do not enable destructive flags against a production Atlas project.

Provide JSON request bodies in the variables ending with `_BODY`. The CRUD suites replace generated resource names where needed and delete only the resource created during the same test run.

Read-only suites run when their required identifier is present. Cluster failover, backup restore creation, alert acknowledgement, project membership changes, organization mutation, and Atlas-user creation are excluded because this client does not provide a safe, deterministic cleanup operation for them.
