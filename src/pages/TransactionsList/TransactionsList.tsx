import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import Filter from '../../components/Filter/Filter';
import ItemsList from '../../components/ItemsList/ItemsList';
import DataContext from '../../contexts/DataContext';
import { FiltersContext } from '../../contexts/FiltersContext';
import { FilterType } from '../../interfaces/Filter';
import Transaction from './Transaction/Transaction';
import styles from './TransactionsList.module.css';

const TransactionsList = () => {
	const { transactions, filters } = useContext(DataContext);
	const { setTransactionFilters, transactionFilters, appliedTransactionFilters, setAppliedTransactionFilters } = useContext(FiltersContext);
	const debounceTimeoutId = useRef<NodeJS.Timeout>(null);

	useEffect(() => {
		setTransactionFilters(filters);
	}, []);

	const updateFilters = (value: string | { min: number, max: number }, name: string) => {
		const newFilters = { ...appliedTransactionFilters };
		if (!value || value === 'All') {
			delete newFilters[name];
			setAppliedTransactionFilters(newFilters);
			return;
		}
		setAppliedTransactionFilters({ ...appliedTransactionFilters, [name]: value });
	}

	const onFilterChange = (value: string | { min: number, max: number }, name: string, type: FilterType, ) => {
		if (type === FilterType.RANGE) {
			clearTimeout(debounceTimeoutId.current);

			debounceTimeoutId.current = setTimeout(() => {
				updateFilters(value, name);
			}, 300);
			return;
		}

		updateFilters(value, name);
	};
console.log(appliedTransactionFilters, 'ap')
	return (
		<section className={styles.section}>
			<div className={styles.topMenu}>
				<h1>Transactions</h1>
				<Filter onChange={onFilterChange} filters={transactionFilters} />
			</div>
			<ItemsList>
				<div id='filters-block'></div>
				{transactions.map((transaction) =>
					<Link key={transaction.transactionID} className={styles.transactionLink} to={`${transaction.transactionID}`}>
						<Transaction transaction={transaction} />
					</Link>
				)}
			</ItemsList>
		</section>
	);
};

export default TransactionsList;
