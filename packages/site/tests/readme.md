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
