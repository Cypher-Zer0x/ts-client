import { Point } from "@cypherlab/types-ring-signature";
import { Request, Response, Router, json } from "express";
import { hexDecodeMLSAG, verifyMlsag } from "../utils/mlsag";
import { Mlsag } from "../interfaces";
import { G, H } from "../constants";


const router: Router = Router();
router.use(json());
router.post("/", async (req: Request, res: Response) => {
  try {

    const body = req.body as { amount: string };
   
    try{
    res.json({
      commitment: G.mult(1n).add(H.mult(BigInt(body.amount))).compress(),
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error generating commitment. Is the payload ok ?");
  }

  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }

});

export default router;
