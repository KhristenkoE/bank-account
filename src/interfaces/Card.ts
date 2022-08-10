import { Currency } from "./Currency";
import Transaction from "./Transaction";

export enum Status {
	ACTIVE = 'active',
	BLOCKED = 'blocked',
}

export interface Card {
	cardID: string;
	cardAccount: string;
	maskedCardNumber: string;
	expireDate: string;
	currency: Currency;
	status: Status;
	balance: number;
	transactions: Transaction[];
}
