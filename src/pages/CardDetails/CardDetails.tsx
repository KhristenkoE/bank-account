import React, { useContext, useMemo } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import DataContext from '../../contexts/DataContext';
import { FiltersContext } from '../../contexts/FiltersContext';
import { FilterName } from '../../interfaces/Filter';
import styles from './CardDetails.module.css';

const CardDetails = () => {
	const { cardID: cardIdFromURL } = useParams(); // or from props
	const { cards } = useContext(DataContext);
	const { setAppliedTransactionFilters } = useContext(FiltersContext);
	const navigate = useNavigate();

	const card = useMemo(() => cards.find(({ cardID }) => cardID === cardIdFromURL), [cards]);

	const onSeeTransactionsClick = () => {
		setAppliedTransactionFilters({
			[FilterName.CARD_ID]: card.cardID,
		});
		navigate('/transactions');
	};
	
	if (card === undefined) {
		return <Navigate to="/404" />
	}

	return (
		<section className={styles.section}>
			<h1 className={styles.title}>Card Details</h1>
			<article>
				<ul className={styles.propsList}>
					<li>Card ID: <strong>{card.cardID}</strong></li>
					<li>Card Account: <strong>{card.cardAccount}</strong></li>
					<li>Card Status: <strong>{card.status}</strong></li>
					<li>Card Number: <strong>{card.maskedCardNumber}</strong></li>
					<li>Balance: <strong>{card.balance}</strong></li>
					<li>Currency: <strong>{card.currency}</strong></li>
					<li>Expire Date: <strong>{card.expireDate}</strong></li>
				</ul>
				<button className={styles.seeTransactionsButton} onClick={onSeeTransactionsClick}>See transactions</button>
			</article>
		</section>
	);
};

export default CardDetails;
