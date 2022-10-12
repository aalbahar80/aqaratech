# @self/site

## 1.4.0

### Minor Changes

- edc0372a: replace revenue table with tanstack variant

### Patch Changes

- e12a32b5: update deps
- b8045c87: fix netincome table missing datapoints

## 1.3.4

### Patch Changes

- 634c52ba: get commit hash from docker env
- 93736a2d: don't add sentry event req data to avoid max call stack error loop

## 1.3.3

### Patch Changes

- f9ec0d7b: bump again

## 1.3.2

### Patch Changes

- ce7bc763: bump all

## 1.3.1

### Patch Changes

- ca420c03: remove stale auth header definition from swagger schema and sdk

## 1.3.0

### Minor Changes

- dee635d4: configure winston logger

## 1.2.1

### Patch Changes

- 171dfa6c: fix server-side getUser auth bug
- 0de53414: use sentry version from matrix

## 1.2.0

### Minor Changes

- c6d407c7: only use cookies for backend auth, remove auth header usage

## 1.1.1

### Patch Changes

- 3df61c61: set chart.js as noExternal in vite.config.ts
- 3df61c61: add db tracing

## 1.1.0

### Minor Changes

- cf21cf46: enhance sentry(user/trace), local jwks

## 1.0.0

### Major Changes

- 4cd46cc5: bump major version

## 0.8.1

### Patch Changes

- 5ed63358: create new user on /me first visit

## 0.8.0

### Minor Changes

- 2b5958a5: handle role in cookies

## 0.7.1

### Patch Changes

- 74f75a51: add prefix to sentry config

## 0.7.0

### Minor Changes

- 83188149: unify sentry config logic

## 0.6.3

### Patch Changes

- c2a205f1: fix clientError on role switch

## 0.6.2

### Patch Changes

- c5ade245: ignore sourcemap errors

## 0.6.1

### Patch Changes

- 2314f5b2: rm sourcemap urls

## 0.6.0

### Minor Changes

- c88644f4: better sentry release tracking

## 0.5.0

### Minor Changes

- ffbab2dd: fetch fresh user data in roles page
- ffbab2dd: avoid extra calls to sveltekit server

### Patch Changes

- ffbab2dd: create handleClientError hook
- c8955f5c: use openapi 6.2.0

## 0.4.12

### Patch Changes

- e89e5d62: exclude /health from sentry

## 0.4.11

### Patch Changes

- 537f09c8: only site

## 0.4.10

### Patch Changes

- 25770c10: disable force-rebuild
- 3ddfc9ea: allow bumping one service's version without the other
- 6863a01b: rm get-tags from ci workflow

## 0.4.9

### Patch Changes

- 16980034: fix step output name

## 0.4.8

### Patch Changes

- d60dc7d5: add quotes

## 0.4.7

### Patch Changes

- b30ca271: get prod versions from changesets

## 0.4.6

### Patch Changes

- 3a3ed864: bump to use changeset tags

## 0.4.5

### Patch Changes

- 9a170303: debug changesets output summary

## 0.4.4

### Patch Changes

- aa0b4fb4: create failsafe constant file

## 0.4.3

### Patch Changes

- 97514772: run pnpm install --lockfile-only after changeset version in CI

## 0.4.2

### Patch Changes

- 5a708e1d: bump-all-deps-3

## 0.4.1

### Patch Changes

- eb4c8f12: bump-all-deps-2

## 0.4.0

### Minor Changes

- c633041c: move changeset to github actions

## 0.3.2

### Patch Changes

- b75c0a83: capture events in handleServerError

## 0.3.1

### Patch Changes

- 72353c60: allow access to /roles for orgAdmins

## 0.3.0

### Minor Changes

- 4b62caa2: add robots.txt, favicon.ico

## 0.2.0

### Minor Changes

- 8db623bb: fix double fetch

## 0.1.6

### Patch Changes

- aefe254f: upgrade node to 18.9

## 0.1.5

### Patch Changes

- 93266a70: persist origin var in docker

## 0.1.4

### Patch Changes

- b2f98d5b: don't use api middleware

## 0.1.3

### Patch Changes

- set origin as perma env var

## 0.1.2

### Patch Changes

- move origin env to build command

## 0.1.1

### Patch Changes

- update changelog format

## 0.1.0

### Minor Changes

- add distributed tracing

## 0.0.2

### Patch Changes

- eb190423: initialize changesets
