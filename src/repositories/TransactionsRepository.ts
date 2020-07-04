import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransacionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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

    const incomeTransactions = this.transactions
      .filter(trans => trans.type === 'income')
      .map(trans => trans.value);
    const outcomeTransactions = this.transactions
      .filter(trans => trans.type === 'outcome')
      .map(trans => trans.value);

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

  public create({ title, value, type }: TransacionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
