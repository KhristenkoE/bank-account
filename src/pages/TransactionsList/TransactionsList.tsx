import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Filter from '../../components/Filter/Filter';
import ItemsList from '../../components/ItemsList/ItemsList';
import DataContext from '../../contexts/DataContext';
import { FiltersContext } from '../../contexts/FiltersContext';
import { FilterName, FilterType } from '../../interfaces/Filter';
import Transaction from './Transaction/Transaction';
import styles from './TransactionsList.module.css';

const TransactionsList = () => {
	const { transactions, transactionFilters } = useContext(DataContext);
	const { appliedTransactionFilters, setAppliedTransactionFilters } = useContext(FiltersContext);
	const debounceTimeoutId = useRef<NodeJS.Timeout>(null);
	const [page, setPage] = useState(1);

	// TODO: remove filter logic from component
	const filteredTransactions = useMemo(() => (transactions.filter((transaction) => {
		return Object.entries(appliedTransactionFilters).every(([name, value]) => {
			if (name === FilterName.CARD_ACCOUNT) {
				return transaction.cardAccount === value;
			}

			if (name === FilterName.CARD_ID || name === FilterName.CURRENCY) {
				return transaction[name] === value;
			}

			if (name === FilterName.AMOUNT) {
				const filterValue = value as { min: number; max: number };
				return transaction.amount >= filterValue.min && transaction.amount <= filterValue.max;
			}

			if (name === FilterName.DATE) {
				const formatedDate: Date = new Date(value as string);
				return transaction.transactionDate === `${formatedDate.getDate()}/${formatedDate.getMonth() + 1}/${formatedDate.getFullYear()}`;
			}

			return true;
		}
	)})), [transactions, appliedTransactionFilters]);
		
	const updateFilters = (value: string | { min: number, max: number }, name: FilterName) => {
		const newFilters = { ...appliedTransactionFilters };
		setPage(1);
		if (!value || value === 'All') {
			delete newFilters[name];
			setAppliedTransactionFilters(newFilters);
			return;
		}
		setAppliedTransactionFilters({ ...appliedTransactionFilters, [name]: value });
	}

	const onFilterChange = (value: string | { min: number, max: number }, name: FilterName, type: FilterType, ) => {
		if (type === FilterType.RANGE) {
			clearTimeout(debounceTimeoutId.current);

			debounceTimeoutId.current = setTimeout(() => {
				updateFilters(value, name);
			}, 300);
			return;
		}

		updateFilters(value, name);
	};

	return (
		<section className={styles.section}>
			<div className={styles.topMenu}>
				<h1>Transactions</h1>
				<Filter intialAppliedFilters={appliedTransactionFilters} onClear={() => setAppliedTransactionFilters({})} onChange={onFilterChange} filters={transactionFilters} />
			</div>
			<ItemsList>
				<div id='filters-block'></div>
				{filteredTransactions.slice((page - 1) * 10, (page - 1) * 10 + 10).map((transaction) =>
					<Link key={transaction.transactionID} className={styles.transactionLink} to={`${transaction.transactionID}`}>
						<Transaction transaction={transaction} />
					</Link>
				)}
			</ItemsList>
			<div className={styles.nav}>
				{Array.from({ length: Math.ceil(filteredTransactions.length / 10) }, (_, index) =>
					<button className={`${styles.navButton} ${index + 1 === page ? styles.navButtonActive : ''}`} key={index} onClick={() => setPage(index + 1)}>{index + 1}</button>
				)}
			</div>
		</section>
	);
};

export default TransactionsList;
