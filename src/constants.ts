import { Curve, CurveName } from "@cypherlab/types-ring-signature"
import { keccak256 } from "@cypherlab/types-ring-signature/dist/src/utils";

export const SECP256K1 = new Curve(CurveName.SECP256K1);
const gamma = BigInt(keccak256("gamma6516516515615615151"));
export const G = SECP256K1.GtoPoint();
export const H = G.mult(gamma); // NOT SECURE, ONLY USED FOR POC