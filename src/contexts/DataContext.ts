import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, Status } from '../interfaces/Card';
import { Currency } from '../interfaces/Currency';
import { Filter, FilterType } from '../interfaces/Filter';
import { TransactionFullInfo } from '../interfaces/Transaction';


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

const cards = getMockCardsData();

const filters: Filter[] = [
	{
		label: 'cardID',
		options: [{
			label: 'All',
			value: null,
		}, ...cards.map(({ cardID }) => ({
			label: cardID,
			value: cardID,
		}))],
		type: FilterType.SELECT_ONE,
	},
	{
		label: 'cardAccount',
		options: [{
			label: 'All',
			value: null,
		}, ...accounts.map((account) => ({
			label: account,
			value: account,
		}))],
		type: FilterType.SELECT_ONE,
	},
	{
		label: 'amount',
		from: 0,
		to: MAX_CARD_BALANCE,
		type: FilterType.RANGE,
	},
	{
		label: 'currency',
		options: [{
			label: 'All',
			value: null,
		}, ...Object.values(Currency).map(currency => ({
			label: currency,
			value: currency,
		}))],
		type: FilterType.SELECT_ONE,
	},
	{
		label: 'transaction date',
		type: FilterType.DATE,
	},
]

export const initialContext: { cards: Card[], transactions: TransactionFullInfo[], filters: Filter[] } = {
	cards,
	transactions: cards.reduce((acc, card) => [
		...acc,
		...card.transactions.map((transactions) => ({
			...transactions,
			cardAccount: card.cardAccount,
			cardID: card.cardID
		})),
	], []).flat(),
	filters,
};

const DataContext = React.createContext(initialContext);

export default DataContext;
