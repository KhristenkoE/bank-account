import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, Status } from '../interfaces/Card';
import { Currency } from '../interfaces/Currency';
import { Filter, FilterName, FilterType } from '../interfaces/Filter';
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
	return `${randomDate.getDate()}/${randomDate.getMonth() + 1}/${randomDate.getFullYear()}`;
};

const getMockTransactionsData = (currency: Currency) => ({
	transactionID: uuidv4(),
	amount: getRandomIntInRange(MIN_TRANSFER_AMOUNT, MAX_CARD_BALANCE),
	currency,
	transactionDate: getRandomFormatedDate({ year: 2015, month: 1, day: 1 }),
	merchantInfo: 'Cloudflare.Inc',
});

const getMockCardsData = () => Array.from({ length: 20 }, () => {
	const supportedCurrency = getRandomItemIn(Object.values(Currency));
	return {
		cardID: uuidv4(),
		cardAccount: getRandomItemIn(accounts),
		maskedCardNumber: '1234 5678 9012 3456',
		expireDate: '11/08/26',
		currency: supportedCurrency,
		status: getRandomItemIn(Object.values(Status)),
		balance: getRandomIntInRange(0, MAX_CARD_BALANCE),
		transactions: Array.from({ length: getRandomIntInRange(10, 30) }, () => getMockTransactionsData(supportedCurrency)),
	};
});

const cards = getMockCardsData();

const cardsFilters: Filter[] = [
	{
		label: FilterName.CARD_ID,
		name: 'Card ID',
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
		label: FilterName.CARD_ACCOUNT,
		name: 'Card Account',
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
		label: FilterName.CURRENCY,
		name: 'Currency',
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
		label: FilterName.STATUS,
		name: 'Status',
		options: [{
			label: 'All',
			value: null,
		}, ...Object.values(Status).map(status => ({
			label: status,
			value: status,
		}))],
		type: FilterType.SELECT_ONE,
	},
];

const transactionFilters: Filter[] = [
	{
		label: FilterName.CARD_ID,
		name: 'Card ID',
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
		label: FilterName.CARD_ACCOUNT,
		name: 'Card Account',
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
		label: FilterName.AMOUNT,
		name: 'Amount',
		from: 0,
		to: MAX_CARD_BALANCE,
		type: FilterType.RANGE,
	},
	{
		label: FilterName.CURRENCY,
		name: 'Currency',
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
		label: FilterName.DATE,
		name: 'Date',
		type: FilterType.DATE,
	},
];

interface InitialContext {
	cards: Card[],
	transactions: TransactionFullInfo[],
	transactionFilters: Filter[],
	cardsFilters: Filter[],
}

export const initialContext: InitialContext = {
	cards,
	transactions: cards.reduce((acc, card) => [
		...acc,
		...card.transactions.map((transactions) => ({
			...transactions,
			cardAccount: card.cardAccount,
			cardID: card.cardID
		})),
	], []).flat(),
	transactionFilters,
	cardsFilters,
};

const DataContext = React.createContext(initialContext);

export default DataContext;
