# Oracle Script

An oracle script for the epoch.drops service related to Drops.

### Setup

Create an `.env` file in the root folder containing:

```
PRIVATE_KEY=5PRIVATKEY
PERMISSION_LEVEL=active
ACCOUNT_NAME=oracle1.gm
```

The permission can be scoped to `epoch.drops` and all actions on the contract for security purposes.

Run with bun:

```
bun run src/index.ts
```

More ways to run will be added soon. PRs welcome!
