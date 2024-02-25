import { Request, Response, Router, json } from "express";

// NOT NEEDED FOR POC
const router: Router = Router();
router.use(json());
router.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body as {

    }

    
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }

});

export default router;
