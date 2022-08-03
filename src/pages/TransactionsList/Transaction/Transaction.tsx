import React from 'react';
import { TransactionFullInfo } from '../../../interfaces/Transaction';
import styles from './Transaction.module.css';

type Props = {
	transaction: TransactionFullInfo;
};

const Transaction = ({
	transaction,
}: Props) => {
	const { transactionID, transactionDate, amount, currency, merchantInfo, cardAccount, cardID } = transaction;

	return (
		<article className={styles.transaction} key={transactionID}>
			<h3>ID: {transactionID}</h3>
			<ul className={styles.transactionInfoList}>
				<li>Date: <strong>{transactionDate}</strong></li>
				<li>Amount: <strong>{amount}</strong></li>
				<li>Currency: <strong>{currency}</strong></li>
				<li>Merchant Info: <strong>{merchantInfo}</strong></li>
				<li>Card Account: <strong>{cardAccount}</strong></li>
				<li>Card ID: <strong>{cardID}</strong></li>
			</ul>
		</article>
	);
};

export default Transaction;
