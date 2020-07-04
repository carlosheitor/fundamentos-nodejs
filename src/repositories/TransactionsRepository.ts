import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const reducer = (accumulator: any, currentValue: any) =>
      accumulator + currentValue;

    const incomeTransactions = this.transactions.filter(
      trans => trans.type === 'income',
    );
    const outcomeTransactions = this.transactions.filter(
      trans => trans.type === 'outcome',
    );

    const income = incomeTransactions.reduce(reducer, 0);
    const outcome = outcomeTransactions.reduce(reducer, 0);
    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create(): Transaction {}
}

export default TransactionsRepository;
