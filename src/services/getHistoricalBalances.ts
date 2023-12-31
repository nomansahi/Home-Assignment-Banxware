import axios from "axios";
import moment from "moment";

import { Balance, Transaction } from "./interfaces";

// This is just an example, it is not expected from you to keep this function
// signature or even the file name. Feel free to change whatever you like.
const API_ENDPOINT =
  "https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws"; // Replace with the full URL
const requestConfig = {
  headers: {
    "x-api-key":
      "b4a4552e-1eac-44ac-8fcc-91acca085b98-f94b74ce-aa17-48f5-83e2-8b8c30509c18",
  },
};

export const getBalance = async () => {
  let balance: Balance | null = null;
  try {
    const response = await axios.get<Balance>(
      `${API_ENDPOINT}/balances`,
      requestConfig
    );
    balance = response.data;
  } catch (error) {
    console.error(error);
  }
  return balance;
};

export const getTranscations = async () => {
  let transactions: Transaction[] = [];
  try {
    const response = await axios.get<{ transactions: Transaction[] }>(
      `${API_ENDPOINT}/transactions`,
      requestConfig
    );
    transactions = response.data.transactions;
  } catch (error) {
    console.error(error);
  }
  return transactions;
};

export const getHistoricalBalance = async (
  fromDate?: Date,
  toDate?: Date,
  sortOrder?: string
) => {
  const transactions = await getTranscations();
  const transactionsMap = new Map<string, Set<Transaction>>();

  // Combined filter logic
  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);

    // Filter transactions based on fromDate and toDate
    if (
      (!fromDate || transactionDate >= fromDate) &&
      (!toDate || transactionDate <= toDate)
    ) {
      const dateString = moment(transactionDate).format("DD-MM-YYYY");
      const transactionsSet = transactionsMap.get(dateString) || new Set();
      transactionsSet.add(transaction);
      transactionsMap.set(dateString, transactionsSet);
    }
  });

  const totalBalances: Balance[] = [];

  for (const [date, transactions] of transactionsMap.entries()) {
    let totalAmount = 0;
    let currency = "";

    for (const transaction of transactions) {
      totalAmount += transaction.amount;
      currency = transaction.currency; // Assumes that all transactions for a given date have the same currency.
    }

    totalBalances.push({
      date,
      amount: totalAmount,
      currency,
    });
  }

  // Sort the balances based on sortOrder parameter
  totalBalances.sort((a, b) => {
    const comparison =
      moment(b.date, "DD-MM-YYYY").valueOf() -
      moment(a.date, "DD-MM-YYYY").valueOf();
    return sortOrder === "asc" ? -comparison : comparison;
  });

  return totalBalances;
};
