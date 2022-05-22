#

```bash
# get shell to running test container
docker exec -it sitetest bash
```

```bash
# run locally
DEV=1 pnpm exec playwright test
```

# Enables inspector

PWDEBUG=1 npx playwright test test/pay.test.ts

npx playwright test test/pay.test.ts --headed

# Potential test ideas

Take screenshot of detail page > go to edit page > click submit without changing anything > back to detail page > check if screenshots match
use expect(loc).toHaveValue() to check edit form is property populated

## Payment

# Structure

/admin: Tests start with admin cookies
/nonauth: Tests start with no admin cookies

Both can be run by cd'ing into them and then npx playwright test

TODO: make it so that:

1. global-setup is exucted once for all test directories. no need to clean up db twice.
2. combine html reports

# TODO:

merge tests back into site dir, use $lib for imports
-- unresolved: will bloat final svelte bundle? Check by diffing the output of sveltekit build
working file: https://github.com/aqaratech/aqtech/actions/runs/2364807382/workflow
svelte.config.js -> keep exclude environment?
install @self/seed using link: `pnpm add -D @self/seed`
revert to using action versions same as here https://pnpm.io/continuous-integration#github-actions
