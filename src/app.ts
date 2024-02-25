import express, { Express } from "express";
import cors from "cors";
import mlsagRequest from "./routes/mlsagRequest";
import verifyMlsag  from "./routes/verifyMlsag";
import txBuilber from "./routes/txBuilder";
import verifyTx from "./routes/verifyTx";



// declare a new express app
const app: Express = express();

// Allow requests from all origins
const corsOptions = {
  origin: "*", // todo: only allow the rust client to access this api
};

app.use(cors(corsOptions));


app.use("/api/signTx", mlsagRequest);
app.use("/api/mlsagVerify", verifyMlsag);
app.use("/api/txBuilber", txBuilber);
app.use("/api/verifyTx", verifyTx);


export default app;
