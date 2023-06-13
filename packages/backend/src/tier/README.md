# Billing

Pricing is managed by [tier](https://docs.tier.run/docs/learning-tier/what-is-tier). See `packages/backend/src/tier/pricing.json`.

## Flow

1. New organization is created.
2. We create a new Stripe customer for the organization.
3. We create a new Stripe subscription for the organization.

## Update pricing:

> Do not update subscription pricing manually on stripe.com! Instead, tier provides an immutable method for managing pricing. For more info, consult the tier docs.

1. Update the `TIER_CLI_VERSION` (see root `README.md` for more info)

2. Update `packages/backend/src/tier/pricing.json` with your desired new values. See [`pricing.json` schema](https://docs.tier.run/docs/learning-tier/getting-started-with-tier/pricing-json).

3. Push the updated pricing model to Stripe:

```bash
 STRIPE_API_KEY="MY_STRIPE_KEY" tier push packages/backend/src/tier/pricing.json
```

4. Update `PUBLIC_TIER_PLAN_ID_*` environment variables to match the new plan id's. These will be applied for:

- new organizations signing up.
- existing organizations renewing their subscription.
