import { CoinbaseUTXO, ExitUTXO, PaymentUTXO } from "../interfaces";

export function isPaymentUTXO(output: PaymentUTXO | CoinbaseUTXO | ExitUTXO): boolean {
  if(
    (output as PaymentUTXO).amount !== undefined &&
    (output as PaymentUTXO).currency !== undefined &&
    (output as PaymentUTXO).commitment !== undefined &&
    (output as PaymentUTXO).rangeProof !== undefined &&
    (output as PaymentUTXO).rG !== undefined
  ) return true;

  return false;
}