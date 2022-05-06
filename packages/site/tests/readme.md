# Enables inspector

PWDEBUG=1 npx playwright test test/pay.test.ts

npx playwright test test/pay.test.ts --headed

# Potential test ideas

Take screenshot of detail page > go to edit page > click submit without changing anything > back to detail page > check if screenshots match
use expect(loc).toHaveValue() to check edit form is property populated

## Payment
