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

To run the cucumber tests:
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
prisma migrate dev --name init
```

Then generate the prisma client:
```shell
npx prisma generate
```
