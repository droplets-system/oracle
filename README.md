# Oracle Script

An oracle script for the epoch.drops service related to Drops.

### Setup

Create an `.env` file in the root folder containing:

```
ACCOUNT_NAME=oracle1.gm
PERMISSION_LEVEL=active
PRIVATE_KEY=5PRIVATKEY
```

The permission can be scoped to `epoch.drops` and all actions on the contract for security purposes.

#### Run with docker-compose

A `docker-compose.yaml` file is included to make deployment with Docker and Docker Compose as easy as possible.

After creating the `.env` file, run the build:

```
docker-compose build
```

And then launch the oracle with:

```
docker-compose up -d
```

You can view logs via:

```
docker-compose logs
```

And stop the oracle with:

```
docker-compose down
```

#### Run with bun:

```
bun run src/index.ts
```

More ways to run will be added soon. PRs welcome!
