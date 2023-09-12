# Balance and Transactions API

**Getting Started:**

# Historical Balances Endpoint

**Endpoint:**
`GET /historical-balances`

Fetch the daily balance for a specific date range.

**Parameters:**

- `from`: Start date (e.g., `2022-01-03`)
- `to`: End date (e.g., `2022-01-05`)
- `sort`: Sort order (`asc` or `desc`)

**Response Format:**
A list of balances for the specified date range.

**Example Request:**
`GET /historical-balances?from=2022-01-03&to=2022-01-05&sort=desc`

1. `git clone https://github.com/nomansahi/Home-Assignment-Banxware/tree/master` - Clone the repo.
2. `cd Balance-and-transactions-api` - Navigate.
3. `npm install` - Install dependencies.
4. `npm start` - Run app.

**Prerequisites:** Node.js,

**API:**

- `/historical-balance` (`GET`): Params: `fromDate`, `toDate`, `sortOrder`

**Testing:**
Run `npm test`.

**Tech Stack:**

- Framework: [e.g., Express.js]
- Typescript

**Author:** Noman Ali
