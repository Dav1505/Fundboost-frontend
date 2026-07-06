import {TransactionType} from './TransactionType';

export interface WalletTransaction {
  id: number;
  amount: number;
  transactionType: TransactionType;
  timestamp: string;
}
