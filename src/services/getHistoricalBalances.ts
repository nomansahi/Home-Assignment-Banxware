// This is just an example, it is not expected from you to keep this function
// signature or even the file name. Feel free to change whatever you like.

import express = require("express");
const axios = require("axios");

const app = express();
export function getHistoricalBalance() {
  const BASE_URL =
    "https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws";
  const HEADERS = {
    "x-api-key":
      "b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18",
  };

  app.get("/balances", async (req, res) => {
    try {
      const response = await axios.get(`${BASE_URL}/balances`, {
        headers: HEADERS,
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).send("Error fetching balances");
    }
  });
}
