# Fleet Management System - Fulll Technical Test

## Overview

This technical test involves building a vehicle fleet management system. The goal is to create an application that manages vehicles and their parking locations within a fleet. Key operations include registering vehicles, parking them at specific locations, and ensuring vehicles cannot be registered or localized multiple times in the same fleet or location.

Please refer to the INSTRUCTIONS.md file for detailed test instructions.

## Setup

### Pre-requisites

- Node v20 and later: https://nodejs.org/en

#### Installations

Install the project dependencies:
```shell
npm i
```

To build the project:
```shell
npm run build
```

#### Running the tests

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

### PhpMyAdmin with Docker

You can access PhpMyAdmin at http://localhost:8090 with the following credentials:
```shell
# Username: fulll
# Password: fulll-backend
```

### Prisma

To create the database:
```shell
prisma migrate dev
```

Then generate the prisma client:
```shell
npx prisma generate
```

If you need to reset the database:
```shell
prisma migrate reset
```

### Command-Line Interface (CLI)

You can interact with the fleet management system using the following commands to modify the database.

- **Create a fleet**: Returns a `<fleetId>` along with a random `<userId>`:
```shell
npm run fleet create 1234
```

- **Register a vehicle**: Adds a vehicle to the specified `<fleetId>` with a provided `<vehiclePlateNumber>` and `<vehicleType>` (e.g., CAR, TRUCK, MOTORCYCLE):
```shell
npm run fleet register-vehicle ea10ff46-7729-4179-aabb-f3f89bbd2a3b AB-123-CD CAR
```
- **Localize a vehicle**: Updates the location of a vehicle with the specified `<fleetId>`, `<vehiclePlateNumber>`, `<latitude>`, `<longitude>`, and optional `[altitude]`:
```shell
npm run fleet localize-vehicle ea10ff46-7729-4179-aabb-f3f89bbd2a3b AB-123-CD 48.8566 2.3522
```

## Code Quality

For code quality, I used ESLint and Prettier. ESLint helps catch bugs and enforce coding standards, while Prettier ensures consistent code formatting automatically.
- ESLint: https://eslint.org/
- Prettier: https://prettier.io/

## CI/CD Process

To set up a CI/CD process, I would use GitHub Actions to automate the workflow. Key steps include:
- Trigger the pipeline on each push or pull request.
- Install dependencies (npm ci).
- Run code quality checks (npm run lint).
- Execute tests (npm test and npm run cucumber).
- Optionally, build the project and deploy if tests pass.

## Restrospective
- Gained valuable insights into hexagonal architecture, DDD, and CQRS principles.
- Enjoyed working without a framework, as it provided a deeper understanding of configurations.
- Experienced some back-and-forth with unit testing setups, initially using Jest, then Mocha, and finally settling on Vitest.
- Faced challenges with importing the Prisma client, requiring some trial and error.
- Noticed the immediate benefits of CQRS & DDD, particularly when transitioning from in-memory to database persistence.
- Both challenging and enjoyable at the same time!

