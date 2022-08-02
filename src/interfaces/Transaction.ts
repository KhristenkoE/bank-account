import { Card } from "./Card";
import { Currency } from "./Currency";

export default interface Transaction {
	transactionID: string;
	amount: number;
	currency: Currency;
	transactionDate: string;
	merchantInfo: string;
}

export type TransactionFullInfo = Transaction & Pick<Card, 'cardAccount' | 'cardID'>;
