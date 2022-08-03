import React, { useContext, useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import DataContext from '../../contexts/DataContext';

const CardDetails = () => {
	const { cardID: cardIdFromURL } = useParams(); // or from props
	const { cards } = useContext(DataContext);

	const card = useMemo(() => cards.find(({ cardID }) => cardID === cardIdFromURL), [cards]);
	
	if (card === undefined) {
		return <Navigate to="/404" />
	}

	return (
		<article>
			<h1>Card Details</h1>
			<h3>ID: {card.cardID}</h3>
			<ul>
				<li>Date: <strong>{card.balance}</strong></li>
				<li>Amount: <strong>{card.expireDate}</strong></li>
				<li>Currency: <strong>{card.currency}</strong></li>
				<li>Merchant Info: <strong>{card.maskedCardNumber}</strong></li>
				<li>Card Account: <strong>{card.cardAccount}</strong></li>
				<li>Card Account: <strong>{card.status}</strong></li>
				<li>Card ID: <strong>{card.cardID}</strong></li>
			</ul>
			<Link to={`/transactions?filter=cardID=${card.cardID}`}>See transactions on this card</Link>
		</article>
	);
};

export default CardDetails;
