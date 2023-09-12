import "dotenv/config";
import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { parseDate } from "./services/helpers";

import {
  getTranscations,
  getBalance,
  getHistoricalBalance,
} from "./services/getHistoricalBalances";

const app = express();
const swaggerDocument = require("../swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Fetch balances from the external API
app.get("/balances", async (req, res) => {
  const balance = await getBalance();
  if (balance !== null) {
    res.json(balance);
  } else {
    res.status(500).json({ error: "Failed to fetch balances" });
  }
});

// Fetch transactions from the external API
app.get("/transactions", async (req, res) => {
  const transactions = await getTranscations();
  res.json(transactions);
});

app.get("/historical-balances", async (req: Request, res: Response) => {
  let fromDate;
  let toDate;

  if (req.query.from) {
    const fromDateMoment = parseDate(req.query.from as string);
    if (!fromDateMoment.isValid()) {
      return res
        .status(400)
        .json({ error: "from date should be in 'DD-MM-YYYY' format" });
    } else {
      fromDate = fromDateMoment.toDate();
    }
  }

  if (req.query.to) {
    const toDateMoment = parseDate(req.query.to as string);
    if (!toDateMoment.isValid()) {
      return res
        .status(400)
        .json({ error: "from date should be in 'DD-MM-YYYY' format" });
    } else {
      toDate = toDateMoment.toDate();
    }
  }

  let order = "asc";
  if (req.query.order && ["asc", "desc"].includes(req.query.order as string)) {
    order = req.query.order as string;
  }

  const historicalBalance = await getHistoricalBalance(fromDate, toDate, order);
  return res.json(historicalBalance);
});

export default app;
