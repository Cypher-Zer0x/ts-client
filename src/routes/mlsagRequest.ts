import { Point } from "@cypherlab/types-ring-signature";
import { Request, Response, Router, json } from "express";
import { hexEncodeMLSAG, signMlsag } from "../utils/mlsag";
import { Mlsag } from "../interfaces";


const router: Router = Router();
router.use(json());
router.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body as {
      message: string,
      keys: {
        utxoPrivKeys: string[], // base 10 bigints
        commitmentKey: string  // base 10 bigints
      },
      ring: string[][] // compressed points [][]
    };

    const message = body.message;
    const keys = {
      utxoPrivKeys: body.keys.utxoPrivKeys.map(BigInt),
      commitmentKey: BigInt(body.keys.commitmentKey)
    };
    const ring = body.ring.map(pubKeys => pubKeys.map(pubKey => Point.decompress(pubKey)));


    const signature: Mlsag = signMlsag(message, keys, ring);

    res.json({
      hexSignature: hexEncodeMLSAG(signature),
    });

  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }

});

export default router;
