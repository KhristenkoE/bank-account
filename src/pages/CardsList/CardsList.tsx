import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ItemsList from '../../components/ItemsList/ItemsList';
import DataContext from '../../contexts/DataContext';
import Card from './Card/Card';
import styles from './CardsList.module.css';

const CardsList = () => {
	const { cards } = useContext(DataContext);

	return (
		<section className={styles.section}>
			<h1>Cards</h1>
			<ItemsList>
				{cards.map((card) =>
					<Link key={card.cardID} className={styles.transactionLink} to={`${card.cardID}`}>
						<Card card={card} />
					</Link>
				)}
			</ItemsList>
		</section>
	);
};

export default CardsList;
