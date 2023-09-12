import { expect } from "chai";
import * as sinon from "sinon";
import axios from "axios";
import {
  getBalance,
  getTranscations,
  getHistoricalBalance,
} from "../../src/services/getHistoricalBalances";
export const API_ENDPOINT =
  "https://uh4goxppjc7stkg24d6fdma4t40wxtly.lambda-url.eu-central-1.on.aws";

describe("Service Functions - Unit Tests", function () {
  let axiosGetStub: sinon.SinonStub;

  beforeEach(function () {
    // Stub the axios.get function before each test
    axiosGetStub = sinon.stub(axios, "get");
  });

  afterEach(function () {
    // Restore the stubbed function after each test
    axiosGetStub.restore();
  });

  it("should get balance", async function () {
    const mockBalance = { amount: 100, currency: "EUR" };
    axiosGetStub.resolves({ data: mockBalance });

    const balance = await getBalance();

    expect(axiosGetStub.calledOnceWith(`${API_ENDPOINT}/balances`)).to.be.true; // Check axios call
    expect(balance).to.deep.equal(mockBalance);
  });

  it("should get transactions", async function () {
    const mockTransactionsData = {
      transactions: [{ amount: 100, currency: "EUR", date: "2023-09-12" }],
    };
    axiosGetStub.resolves({ data: mockTransactionsData });

    const transactions = await getTranscations();

    expect(axiosGetStub.calledOnceWith(`${API_ENDPOINT}/transactions`)).to.be
      .true; // Check axios call
    expect(transactions).to.deep.equal(mockTransactionsData.transactions);
  });

  it("should get historical balance", async function () {
    const mockTransactionsData = {
      transactions: [
        { amount: 50, currency: "EUR", date: "2023-09-10" },
        { amount: 50, currency: "EUR", date: "2023-09-11" },
      ],
    };
    axiosGetStub.resolves({ data: mockTransactionsData });

    // const historicalBalance = await getHistoricalBalance(
    //   new Date("2023-09-01"),
    //   new Date("2023-09-20")
    // );
  });
});
