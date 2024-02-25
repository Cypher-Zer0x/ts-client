import { Point } from "@cypherlab/types-ring-signature"


export interface baseUTXO {
  version: string, // hex version number of the transaction
  transaction_hash: string, // hash of the transaction where this UTXO was output, coinbase transactions have a hash of 0
  output_index: number, // index number of the output in the transaction
  public_key: string, // (compressed point) -> a one-time public key generated for this transaction output
  unlock_time?: number, // timestamp until which this UTXO cannot be spent
}

export interface PaymentUTXO extends baseUTXO {
  amount: string, // encrypted amount + blinding factor, only the owner can decrypt it (if coinbase, the amount is clear and there is no blinding factor)
  currency: string, // currency -> TODO: find a way to encrypt it too
  commitment: string, // (compressed point) -> a cryptographic commitment to the amount, allows verification without revealing the amount
  rangeProof: LightRangeProof, // range proof of the amount
  rG: string, // rG = G*r
}

export interface ExitUTXO extends Omit<PaymentUTXO, 'rangeProof' | 'rG'> {
  exitChain: ExitChainId
}


export enum ExitChainId {
  OPTIMISM = "0xa",
}

export interface CoinbaseUTXO extends baseUTXO {
  amount: string, // coinbase amount is always clear
  currency: string, // todo: mask this too using the same method as the amount (xor concat(8bytesAmount, currencyId) and shared secret) -> How to prove the currency input = currency output ???
  commitment: string, // (compressed point) -> a cryptographic commitment to the amount, allows verification without revealing the amount
  rG: string,
}


export interface UnsignedPaymentTX {
  inputs: string[], // inputs of the transaction
  outputs: string[], // outputs of the transaction
  fee: string, // fee paid to validators as hex string
}

export interface Mlsag {
  message: string,
  ring: Point[][],
  c: bigint,
  responses: bigint[][],
  keyImages: Point[]
}

export interface SignedPaymentTX extends UnsignedPaymentTX {
  signature: string, // MLSAG signature as hex string
}

export interface TxToVerify {
  tx: SignedPaymentTX,
  inputs: (PaymentUTXO | CoinbaseUTXO | ExitUTXO)[],
  outputs: (PaymentUTXO | CoinbaseUTXO | ExitUTXO)[],
}

export interface LightRangeProof {
  V: string,
  A: string,
  S: string,
  T1: string,
  T2: string,
  tx: string,
  txbf: string,
  e: string,
  a0: string,
  b0: string,
  ind: {L: string, R: string}[],
}

export interface RangeProof extends LightRangeProof {
  G: string,
  order: string,
}