import React, { useContext, useMemo } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ItemsList from '../../components/ItemsList/ItemsList';
import DataContext from '../../contexts/DataContext';
import { TransactionFullInfo } from '../../interfaces/Transaction';
import Transaction from './Transaction/Transaction';
import styles from './TransactionsList.module.css';

const TransactionsList = () => {
	const { cards } = useContext(DataContext);
	const allTransactions = useMemo<TransactionFullInfo[]>(() => (
		cards.reduce((acc, card) => [
			...acc,
			...card.transactions.map((transactions) => ({
				...transactions,
				cardAccount: card.cardAccount,
				cardID: card.cardID
			}))
		], []).flat()
	), cards);

	return (
		<section className={styles.section}>
			<Breadcrumbs />
			<ItemsList>
				{allTransactions.map((transaction) => <Transaction {...transaction} />)}
			</ItemsList>

			{/* <ItemsList elements={transactions} /> */}
		</section>
	);
};

export default TransactionsList;
