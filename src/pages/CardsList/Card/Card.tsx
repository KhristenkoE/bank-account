import React from 'react';
import styles from './Card.module.css';
import { Card as CardType } from '../../../interfaces/Card';

interface Props {
	card: CardType;
};

const Card = ({
	card,
}: Props) => {
	const { balance, status, currency, cardAccount, cardID } = card;

	return (
		<article className={styles.transaction}>
			<h3>ID: {cardID}</h3>
			<ul className={styles.transactionInfoList}>
				<li>Balance: <strong>{balance}</strong></li>
				<li>Status: <strong>{status}</strong></li>
				<li>Currency: <strong>{currency}</strong></li>
				<li>Card Account: <strong>{cardAccount}</strong></li>
			</ul>
		</article>
	);
};

export default Card;
