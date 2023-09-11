export interface Balance {
  date: string;
  amount: number;
  currency: string;
}

export interface Transaction {
  amount: number;
  currency: string;
  date: Date;
  status: string;
}
