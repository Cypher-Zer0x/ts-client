

const API_BASE_URL = "http://localhost:3001/api";


/* ------------------------------------TEST API------------------------------------ */

import { Curve, CurveName, Point } from "@cypherlab/types-ring-signature";
import { hexDecodeMLSAG, hexEncodeMLSAG, signMlsag, verifyMlsag } from "../src/utils/mlsag";

const message = "Hello, world!";
const ring = [
  [
    (new Curve(CurveName.SECP256K1)).GtoPoint().mult(12n),
    (new Curve(CurveName.SECP256K1)).GtoPoint().mult(13n)
  ],
  [
    (new Curve(CurveName.SECP256K1)).GtoPoint().mult(14n),
    (new Curve(CurveName.SECP256K1)).GtoPoint().mult(15n)
  ],
  [
    (new Curve(CurveName.SECP256K1)).GtoPoint().mult(16n),
    (new Curve(CurveName.SECP256K1)).GtoPoint().mult(17n)
  ]
];

const mlsagBody: {
  message: string,
  keys: {
    utxoPrivKeys: string[], // base 10 bigints
    commitmentKey: string  // base 10 bigints
  },
  ring: string[][] // compressed points [][]
} = {
  message: message,
  keys: {
    utxoPrivKeys: [(123456888n).toString()],
    commitmentKey: (99899898n).toString()
  },
  ring: ring.map(pubKeys => pubKeys.map(pubKey => pubKey.compress()))
};

// call the api
async function testMlsag() {
  const response = await fetch(`${API_BASE_URL}/signTx`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(mlsagBody),
  });
  const signature = await response.json();

  // verify the signature
  console.log("verified sig from api: ", verifyMlsag(hexDecodeMLSAG(signature.hexSignature)));

  
  const verifFromApi = await fetch(`${API_BASE_URL}/mlsagVerify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(signature),
  });


  console.log("verif on api: ", await verifFromApi.json());
}

testMlsag();

