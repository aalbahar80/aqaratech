// @@@SNIPSTART subscription-ts-activities
import type { Customer } from "./types";

export async function sendWelcomeEmail(customer: Customer) {
  console.log(`Sending welcome email to ${customer.email}`);
}
export async function sendCancellationEmailDuringTrialPeriod(customer: Customer) {
  console.log(`Sending trial cancellation email to ${customer.email}`);
}
export async function chargeCustomerForBillingPeriod(customer: Customer, chargeAmount: number) {
  console.log(`Charging ${customer.email} amount ${chargeAmount} for their billing period`);
}
export async function sendCancellationEmailDuringActiveSubscription(customer: Customer) {
  console.log(`Sending active subscriber cancellation email to ${customer.email}`);
}
export async function sendSubscriptionOverEmail(customer: Customer) {
  console.log(`Sending subscription over email to ${customer.email}`);
}
// @@@SNIPEND