# Microservice boilerplate for SamagraX

![github action status](https://github.com/brocoders/nestjs-boilerplate/actions/workflows/docker-e2e.yml/badge.svg)

## Description

Microservice boilerplate for SamagraX

[Full documentation here](https://github.com/brocoders/nestjs-boilerplate/blob/main/docs/readme.md)

## Table of Contents

- [Features](#features)
- [Quick run](#quick-run)
- [Comfortable development](#comfortable-development)
- [Links](#links)
- [Automatic update of dependencies](#automatic-update-of-dependencies)
- [Database utils](#database-utils)
- [Tests](#tests)

## Features

- [x] Database ([Prisma](https://www.prisma.io/)).
- [ ] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer)).
- [x] Sign in and sign up via email.
- [x] Social sign in (Apple, Facebook, Google, Twitter).
- [x] Admin and User roles.
- [x] I18N ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [x] File uploads. Support local and Amazon S3 drivers.
- [x] Swagger.
- [x] E2E and units tests.
- [x] Docker.
- [x] CI (Github Actions).

## Quick run

```bash
git clone --depth 1 https://github.com/ChakshuGautam/stencil.git my-app
cd my-app/
cp env-example .env
docker compose up setup
docker compose up -d
```

For checking status of containers run

```bash
docker compose logs
```

## Logging

Stencil provides support for logging in 2 modes:

### Axiom Logging

Axiom provides structured, customizable logging with features like custom log levels, log message formatting, filtering, and flexible storage options. Make sure to replace the values of `DATASET_NAME` and `TOKEN` in `logging/logstash/pipeline/axiom.conf`

### ELK (Elasticsearch, Logstash, Kibana) Logging

ELK offers centralized log management using Elasticsearch for storage, Logstash for parsing and transformation, and Kibana for real-time analytics, custom dashboards, and scalability. Stencil provides out of the box support for ELK stack. Once all the containers are up, go to https://localhost:5601 to access kibana console. The default username is `elastic` and password is `changeme` which can be configured through .env .



## Comfortable development

```bash
git clone --depth 1 https://github.com/ChakshuGautam/stencil.git my-app
cd my-app/
cp env-example .env
```

Change `DATABASE_HOST=postgres` to `DATABASE_HOST=localhost`

Change `MAIL_HOST=maildev` to `MAIL_HOST=localhost`

Run additional container:

```bash
docker compose up -d postgres adminer maildev
```

```bash
npm install

npm run migration:run

npm run seed:run

npm run start:dev
```

## Links

- Swagger: http://localhost:3000/docs
- Adminer (client for DB): http://localhost:8080
- Maildev: http://localhost:1080

## Automatic update of dependencies

If you want to automatically update dependencies, you can connect [Renovate](https://github.com/marketplace/renovate) for your project.

## Database utils

Generate migration

```bash
npm run migration:generate -- src/database/migrations/CreateNameTable
```

Run migration

```bash
npm run migration:run
```

Revert migration

```bash
npm run migration:revert
```

Drop all tables in database

```bash
npm run schema:drop
```

Run seed

```bash
npm run seed:run
```

## Tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Tests in Docker

```bash
docker compose -f docker-compose.ci.yaml --env-file env-example -p ci up --build --exit-code-from api && docker compose -p ci rm -svf
```

## Test benchmarking

```bash
docker run --rm jordi/ab -n 100 -c 100 -T application/json -H "Authorization: Bearer USER_TOKEN" -v 2 http://<server_ip>:3000/api/v1/users
```
