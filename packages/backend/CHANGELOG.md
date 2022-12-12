# @self/backend

## 2.2.0

### Minor Changes

- 610ddbe59: update deps
- 032978d05: update deps

### Patch Changes

- Updated dependencies [610ddbe59]
- Updated dependencies [032978d05]
  - @self/utils@3.1.0

## 2.1.0

### Minor Changes

- c39f88a75: add landing page features
- 9477b853a: add landing page features

## 2.0.3

### Patch Changes

- d8a78a3cb: add seperate endpoint for units-minimal

## 2.0.2

### Patch Changes

- a7b44f0df: skip parse private env when building

## 2.0.1

### Patch Changes

- 86dd7c641: don't parse env when building

## 2.0.0

### Major Changes

- 67ab8a1ea: merged uxrefactor branch

### Patch Changes

- Updated dependencies [67ab8a1ea]
  - @self/utils@3.0.0

## 1.6.3

### Patch Changes

- 83b89e4f: log in timeout interceptor
- 83b89e4f: increase timeout interceptor to 45s

## 1.6.2

### Patch Changes

- 34ccf625: revert backend importsNotUsedAsValues

## 1.6.1

### Patch Changes

- dbe4f879: add context to logging interceptor

## 1.6.0

### Minor Changes

- cb82f36a: update deps

### Patch Changes

- Updated dependencies [cb82f36a]
  - @self/utils@2.1.0

## 1.5.4

### Patch Changes

- f68d59b6: enable strict

## 1.5.3

### Patch Changes

- afbeab8c: use same winston logger helpers

## 1.5.2

### Patch Changes

- Updated dependencies [e5c16564]
  - @self/utils@2.0.3

## 1.5.1

### Patch Changes

- c5c4ec7b: skip validation of env at build time

## 1.5.0

### Minor Changes

- e12a32b5: introduce exception mapper

### Patch Changes

- e12a32b5: update deps
- 472fc662: handle postmark errors
- Updated dependencies [e12a32b5]
  - @self/utils@2.0.2

## 1.4.3

### Patch Changes

- 634c52ba: get commit hash from docker env
- 93736a2d: don't add sentry event req data to avoid max call stack error loop
- 33c8b62f: add source code to sourcemaps

## 1.4.2

### Patch Changes

- f9ec0d7b: bump again
- Updated dependencies [f9ec0d7b]
  - @self/utils@2.0.1

## 1.4.1

### Patch Changes

- ce7bc763: bump all

## 1.4.0

### Minor Changes

- 94cade9c: flatten sourcemaps

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

- 3df61c61: add db tracing

## 1.1.0

### Minor Changes

- cf21cf46: enhance sentry(user/trace), local jwks

## 1.0.0

### Major Changes

- 4cd46cc5: bump major version

### Patch Changes

- Updated dependencies [4cd46cc5]
  - @self/utils@2.0.0

## 0.7.1

### Patch Changes

- 5ed63358: create new user on /me first visit
- Updated dependencies [5ed63358]
  - @self/utils@1.6.1

## 0.7.0

### Minor Changes

- 2b5958a5: handle role in cookies

## 0.6.1

### Patch Changes

- 74f75a51: add prefix to sentry config

## 0.6.0

### Minor Changes

- 83188149: unify sentry config logic

### Patch Changes

- Updated dependencies [83188149]
  - @self/utils@1.6.0

## 0.5.1

### Patch Changes

- c2a205f1: fix clientError on role switch
- Updated dependencies [c2a205f1]
  - @self/utils@1.5.1

## 0.5.0

### Minor Changes

- c88644f4: better sentry release tracking

### Patch Changes

- Updated dependencies [c88644f4]
  - @self/utils@1.5.0

## 0.4.0

### Minor Changes

- ffbab2dd: fetch fresh user data in roles page

### Patch Changes

- Updated dependencies [ffbab2dd]
  - @self/utils@1.4.0

## 0.3.10

### Patch Changes

- e89e5d62: exclude /health from sentry

## 0.3.9

### Patch Changes

- d781c18b: rm unused .env's

## 0.3.8

### Patch Changes

- 25770c10: disable force-rebuild
- 3ddfc9ea: allow bumping one service's version without the other
- 6863a01b: rm get-tags from ci workflow
- Updated dependencies [25770c10]
- Updated dependencies [3ddfc9ea]
- Updated dependencies [6863a01b]
  - @self/utils@1.3.8

## 0.3.7

### Patch Changes

- 16980034: fix step output name
- Updated dependencies [16980034]
  - @self/utils@1.3.7

## 0.3.6

### Patch Changes

- d60dc7d5: add quotes
- Updated dependencies [d60dc7d5]
  - @self/utils@1.3.6

## 0.3.5

### Patch Changes

- b30ca271: get prod versions from changesets
- Updated dependencies [b30ca271]
  - @self/utils@1.3.5

## 0.3.4

### Patch Changes

- 3a3ed864: bump to use changeset tags
- Updated dependencies [3a3ed864]
  - @self/utils@1.3.4

## 0.3.3

### Patch Changes

- 97514772: run pnpm install --lockfile-only after changeset version in CI
- Updated dependencies [97514772]
  - @self/utils@1.3.3

## 0.3.2

### Patch Changes

- 5a708e1d: bump-all-deps-3
- Updated dependencies [5a708e1d]
  - @self/utils@1.3.2

## 0.3.1

### Patch Changes

- eb4c8f12: bump-all-deps-2
- Updated dependencies [eb4c8f12]
  - @self/utils@1.3.1

## 0.3.0

### Minor Changes

- c633041c: move changeset to github actions

### Patch Changes

- Updated dependencies [c633041c]
  - @self/utils@1.3.0

## 0.2.0

### Minor Changes

- 8db623bb: fix double fetch

### Patch Changes

- Updated dependencies [8db623bb]
  - @self/utils@1.2.0

## 0.1.1

### Patch Changes

- update changelog format
- Updated dependencies
  - @self/utils@1.1.1

## 0.1.0

### Minor Changes

- add distributed tracing

### Patch Changes

- Updated dependencies
  - @self/utils@1.1.0
