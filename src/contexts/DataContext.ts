import React from 'react';
import { v4 as uuidv4 } from 'uuid';

enum Currency {
	USD = 'USD',
	EUR = 'EUR',
	AZN = 'AZN',
}

enum Status {
	ACTIVE = 'active',
	BLOCKED = 'blocked',
}

const MAX_CARD_BALANCE = 99999999;
const MIN_TRANSFER_AMOUNT = 1;

const accounts = ['Eugene', 'John', 'Jane', 'Jack'];

const getRandomIntInRange = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomItemIn = (arr: any[]) => arr[getRandomIntInRange(0, arr.length - 1)];

const getRandomFormatedDate = (from: { year: number; month: number; day: number }) => {
	const start = new Date(from.year, from.month, from.day);
	const end = new Date();
	const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
	return `${randomDate.getDay()}/${randomDate.getMonth()}/${randomDate.getFullYear()}`;
};

const getMockTransactionsData = () => ({
	transactionID: uuidv4(),
	amount: getRandomIntInRange(MIN_TRANSFER_AMOUNT, MAX_CARD_BALANCE),
	currency: getRandomItemIn(Object.values(Currency)),
	transactionDate: getRandomFormatedDate({ year: 2010, month: 1, day: 1 }),
	merchantInfo: 'Cloudflare.Inc',
});

const getMockCardsData = () => Array.from({ length: 20 }, () => ({
	cardID: uuidv4(),
	cardAccount: getRandomItemIn(accounts),
	maskedCardNumber: '1234 5678 9012 3456',
	expireDate: '11/08/26',
	currency: getRandomItemIn(Object.values(Currency)),
	status: getRandomItemIn(Object.values(Status)),
	balance: getRandomIntInRange(0, MAX_CARD_BALANCE),
	transactions: Array.from({ length: getRandomIntInRange(10, 30) }, () => getMockTransactionsData()),
}));

export const initialContext = {
	cards: getMockCardsData(),
};

const DataContext = React.createContext(initialContext);

export default DataContext;
