Payment [tests](non-auth/test/pay.test.ts) are set up but are not automatically run because myfatoorah/knet test environment is inherently flaky.

To forward cli args from root dir:

```bash
pnpm run test --project "property"
```
