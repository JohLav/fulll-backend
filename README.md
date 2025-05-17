# Fleet Management System - Fulll Technical Test

## Overview

This technical test involves building a vehicle fleet management system. The goal was to create an application that manages vehicles and their parking locations within a fleet. Key operations include registering vehicles, parking them at specific locations, and ensuring vehicles cannot be registered or localized multiple times in the same fleet or location.

Please refer to the [INSTRUCTIONS.md](INSTRUCTIONS.md) file for detailed test instructions.

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

Create the database:
```shell
prisma migrate dev
```

Generate the prisma client:
```shell
npx prisma generate
```

To reset the database (if any):
```shell
prisma migrate reset
```

### Command-Line Interface (CLI)

Interact with the fleet management system using the following commands:

- **Create a new fleet**: creates a fleet associated with a user. Returns a `<fleetId>`:

```shell
# Syntax
npm run fleet create <userId>

# Example
npm run fleet create 1234
```

- **Register a vehicle to a fleet**: adds a vehicle to an existing fleet:

```shell
# Syntax
npm run fleet register-vehicle <fleetId> <vehiclePlateNumber>

# Example
npm run fleet register-vehicle 58394350-99b9-4764-8423-8fcda3223d3f AB-123-CD
```

- **Update a vehicle’s location**: updates the GPS position of a vehicle in a fleet:

```shell
# Syntax
npm run fleet update-location <fleetId> <vehiclePlateNumber> <latitude> <longitude> [altitude]

# Example (without altitude)
npm run fleet update-location 58394350-99b9-4764-8423-8fcda3223d3f AB-123-CD 48.8566 2.3522

# Example (with altitude)
npm run fleet update-location 58394350-99b9-4764-8423-8fcda3223d3f AB-123-CD 48.8566 2.3522 35
```

- **Localize a vehicle**: retrieves the last known location of a vehicle in a fleet:

```shell
# Syntax
npm run fleet localize-vehicle <fleetId> <vehiclePlateNumber>

# Example
npm run fleet localize-vehicle 58394350-99b9-4764-8423-8fcda3223d3f AB-123-CD
```

#### 🆘 View Help Menu

Displays a list of all available fleet CLI commands with their usage and descriptions.

```shell
# Syntax
npm run fleet -- --help
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

## Retrospective
- Gained valuable insights into hexagonal architecture, DDD, and CQRS principles.
- Enjoyed working without a framework, as it provided a deeper understanding of configurations.
- Experienced some back-and-forth with unit testing setups, initially using Jest, then Mocha, and finally settling on Vitest.
- Faced challenges with importing the Prisma client, requiring some trial and error.
- Noticed the immediate benefits of CQRS & DDD, particularly when transitioning from in-memory to database persistence.
- Both challenging and enjoyable at the same time!

## Next Steps
1. Clean up and organize imports:
   - Replace messy relative imports with alias-based or consistent paths.
   - Ensure all imports follow the same convention across the project.
2. Fix CLI command parsing warning
    - Investigate and resolve the warning that appears during CLI command parsing.
3. Add more tests to cover edge cases
4. Set up Continuous Integration (CI) pipeline using GitHub Actions to automate testing.
5. Improve error handling mechanisms to provide clearer feedback in case of failures.
