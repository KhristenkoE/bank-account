import React, { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Filter from '../../components/Filter/Filter';
import ItemsList from '../../components/ItemsList/ItemsList';
import DataContext from '../../contexts/DataContext';
import { FiltersContext } from '../../contexts/FiltersContext';
import { FilterName } from '../../interfaces/Filter';
import Card from './Card/Card';
import styles from './CardsList.module.css';

const CardsList = () => {
	const { cards, cardsFilters} = useContext(DataContext);
	const { appliedCardFilters, setAppliedCardFilters } = useContext(FiltersContext);
	const [page, setPage] = useState(1);
	const filteredCards = useMemo(() => (cards.filter((card) => {
		return Object.entries(appliedCardFilters).every(([name, value]) => {
			if (
				name === FilterName.CARD_ACCOUNT ||
				name === FilterName.CARD_ID ||
				name === FilterName.CURRENCY ||
				name === FilterName.STATUS
			) {
				return card[name] === value;
			}

			return true;
		}
	)})), [cards, appliedCardFilters]);

	const updateFilters = (value: string, name: FilterName) => {
		const newFilters = { ...appliedCardFilters };
		setPage(1);
		if (!value || value === 'All') {
			delete newFilters[name];
			setAppliedCardFilters(newFilters);
			return;
		}
		setAppliedCardFilters({ ...newFilters, [name]: value });
	}

	return (
		<section className={styles.section}>
			<div className={styles.topMenu}>
				<h1>Cards</h1>
				<Filter intialAppliedFilters={appliedCardFilters} onClear={() => setAppliedCardFilters({})} onChange={updateFilters} filters={cardsFilters} />
			</div>
			<ItemsList>
				<div id='filters-block'></div>
				{filteredCards.slice((page - 1) * 10, (page - 1) * 10 + 10).map((card) =>
					<Link key={card.cardID} className={styles.transactionLink} to={`${card.cardID}`}>
						<Card card={card} />
					</Link>
				)}
			</ItemsList>
			<div className={styles.nav}>
				{Array.from({ length: Math.ceil(filteredCards.length / 10) }, (_, index) =>
					<button className={`${styles.navButton} ${index + 1 === page ? styles.navButtonActive : ''}`} key={index} onClick={() => setPage(index + 1)}>{index + 1}</button>
				)}
			</div>
		</section>
	);
};

export default CardsList;
