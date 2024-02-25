import { Request, Response, Router, json } from "express";
import { hexDecodeMLSAG, verifyMlsag } from "../utils/mlsag";
import { Point } from "@cypherlab/types-ring-signature";
import { H } from "../constants";
import { verifyRangeProof } from "../utils/rangeProofs";
import { PaymentUTXO, SignedPaymentTX, TxToVerify } from "../interfaces";
import { isPaymentUTXO } from "../utils/isPaymentUTXo";


const router: Router = Router();
router.use(json());
router.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body as TxToVerify;


    const signature = hexDecodeMLSAG(body.tx.signature);

    // verify the MLSAG signature
    if (!verifyMlsag(signature)) return res.json({ isValid: false });

    // check if the value is conserved
    if (!signature.ring[0][0].equals(
      Point.decompress(body.inputs[0].commitment)
        .add(Point.decompress(body.outputs[0].commitment).negate())
        .add(Point.decompress(body.outputs[1].commitment).negate())
        .add(H.mult(BigInt(body.tx.fee)).negate()))
    ) return res.json({ isValid: false });

    // check if the range proofs are accepted
    body.outputs.map((output) => {
      // check if range proof is needed
      if (isPaymentUTXO(output) && !verifyRangeProof((output as PaymentUTXO).rangeProof))
        return res.json({ isValid: false });
    });

    // if all the checks are passed, the transaction is considered valid
    return res.json({ isValid: true });

  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }

});

export default router;
