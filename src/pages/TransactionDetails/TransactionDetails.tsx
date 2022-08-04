import React, { useContext, useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import DataContext from '../../contexts/DataContext';
import styles from './TransactionDetails.module.css';

const TransactionDetails = () => {
	const { transactionID: transactionIdFromURL } = useParams(); // or from props
	const { transactions } = useContext(DataContext);

	const transaction = useMemo(() => transactions.find(({ transactionID }) => transactionID === transactionIdFromURL), [transactions]);
	
	if (transaction === undefined) {
		return <Navigate to="/404" />
	}

	return (
		<section className={styles.section}>
			<h1 className={styles.title}>Transaction Details</h1>
			<article>
				<ul className={styles.propsList}>
					<li>Transaction ID: <strong>{transaction.transactionID}</strong></li>
					<li>Card Account: <strong>{transaction.cardAccount}</strong></li>
					<li>Merchant Info: <strong>{transaction.merchantInfo}</strong></li>
					<li>Amount: <strong>{transaction.amount}</strong></li>
					<li>Currency: <strong>{transaction.currency}</strong></li>
					<li>Date: <strong>{transaction.transactionDate}</strong></li>
					<li>Card ID: <Link className={styles.cardLink} to={`/cards/${transaction.cardID}`}><strong>{transaction.cardID}</strong></Link></li>
				</ul>
			</article>
		</section>
	);
};

export default TransactionDetails;
