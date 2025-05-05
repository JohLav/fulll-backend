# Fulll Backend Test

## Pre-requisites

- Node v20 and later: https://nodejs.org/en

## Install

> To be defined

## Development

Install the project dependencies:
```shell
npm i
```

To build the project:
```shell
npm run build
```

To run the cucumber tests:
```shell
npm run cucumber
```

To run the vitest tests:
```shell
npm run test
```

### MySQL with Docker

To start MySQL:
```shell
docker compose up -d
```

To stop MySQL:
```shell
docker compose stop
```

You can access PhpMyAdmin at http://localhost:8090 with the following credentials:
```shell
# Username: fulll
# Password: fulll-backend
```

To create the database:
```shell
prisma migrate dev
```

Then generate the prisma client:
```shell
npx prisma generate
```

If you want to reset the database:
```shell
prisma migrate reset
```

### Command-Line Interface (CLI)

Write in the previously created database through the following commands to interact with the fleet management system.

Return a `<fleetId>` on the standard output with a random `<userId>`:
```shell
npm run fleet create 1234
```

Register a vehicle with the previously created `<fleetId>`, a `<vehiclePlateNumber>` and a `<vehicleType>`:
```shell
npm run fleet register-vehicle ea10ff46-7729-4179-aabb-f3f89bbd2a3b AB-123-CD CAR
```

Localize the vehicle with the `<fleetId>`, `<vehiclePlateNumber>`, `lat`, `lng`, and optional `alt`:
```shell
npm run fleet localize-vehicle ea10ff46-7729-4179-aabb-f3f89bbd2a3b AB-123-CD 48.8566 2.3522
```

