import React, { useContext, useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import DataContext from '../../contexts/DataContext';

const TransactionDetails = () => {
	const { transactionID: transactionIdFromURL } = useParams(); // or from props
	const { transactions } = useContext(DataContext);

	const transaction = useMemo(() => transactions.find(({ transactionID }) => transactionID === transactionIdFromURL), [transactions]);
	
	if (transaction === undefined) {
		return <Navigate to="/404" />
	}

	return (
		<article>
			<h1>Transaction Details</h1>
			<h3>ID: {transaction.transactionID}</h3>
			<ul>
				<li>Date: <strong>{transaction.transactionDate}</strong></li>
				<li>Amount: <strong>{transaction.amount}</strong></li>
				<li>Currency: <strong>{transaction.currency}</strong></li>
				<li>Merchant Info: <strong>{transaction.merchantInfo}</strong></li>
				<li>Card Account: <strong>{transaction.cardAccount}</strong></li>
				<li>ID: <Link to={`/cards/${transaction.cardID}`}><strong>{transaction.cardID}</strong></Link></li>
			</ul>
		</article>
	);
};

export default TransactionDetails;
