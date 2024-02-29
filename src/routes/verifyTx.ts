import { Request, Response, Router, json } from "express";
import { hexDecodeMLSAG, verifyMlsag } from "../utils/mlsag";
import { Point } from "@cypherlab/types-ring-signature";
import { H } from "../constants";
import { verifyRangeProof } from "../utils/rangeProofs";
import { CoinbaseUTXO, ExitUTXO, PaymentUTXO, SignedPaymentTX, TxToVerify, UnsignedPaymentTX } from "../interfaces";
import { isPaymentUTXO } from "../utils/isPaymentUTXo";


const router: Router = Router();
router.use(json());
router.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body as TxToVerify;

    console.log("body:\n", body);
    const signature = hexDecodeMLSAG(body.tx);
    const txData = JSON.parse(signature.message) as UnsignedPaymentTX;
    // verify the MLSAG signature
    if (!verifyMlsag(signature)) return res.json({ isValid: false });

    // check if the value is conserved
    if (body.inputs.length >= 1 && body.outputs.length >= 1) { // excludes coinbase and exit transactions
      let sumInputs: Point = Point.decompress(body.inputs[0]);
      for (let i = 1; i < body.inputs.length; i++) {
        sumInputs = sumInputs.add(Point.decompress(body.inputs[i]));
      }

      let sumOutputs: Point = Point.decompress(body.outputs[0].commitment);
      for (let i = 1; i < body.outputs.length; i++) {
        sumOutputs = sumOutputs.add(Point.decompress(body.outputs[i].commitment));
      }
      console.log("sumInputs: ", sumInputs.compress());
      // if (!signature.ring[0][0].equals(
      //   sumInputs
      //     .add(sumOutputs)
      //     .add(H.mult(BigInt(txData.fee)).negate()))
      // ) {
      //   console.log("value is not conserved");
      //   return res.json({ isValid: false });
      // }

      // check if the range proofs are accepted
      // todo: fix range proof and use them in snap
      // body.outputs.map((output) => {
      //   // check if range proof is needed
      //   if (isPaymentUTXO(output) && !verifyRangeProof((output as PaymentUTXO).rangeProof))
      //     return res.json({ isValid: false });
      // });
        console.log("range proof is not verified yet");
      return res.json({ isValid: true });
    }

    // FOR TESTING PURPOSES, ACCEPT ALL OTHER TX -> todo: remove this
    return res.json({ isValid: true });

    // if all the checks are passed, the transaction is considered valid

  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }

});

export default router;
