import { Point } from "@cypherlab/types-ring-signature";
import { Request, Response, Router, json } from "express";
import { hexDecodeMLSAG, verifyMlsag } from "../utils/mlsag";
import { Mlsag } from "../interfaces";


const router: Router = Router();
router.use(json());
router.post("/", async (req: Request, res: Response) => {
  try {

    const body = req.body as { signature: string };

    res.json({
      isValid: verifyMlsag(hexDecodeMLSAG(body.signature)),
    });

  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }

});

export default router;
