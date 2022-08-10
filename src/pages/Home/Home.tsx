import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
	return (
		<section>
			<nav className={styles.nav}>
				<div className={styles.navButtons}>
					<Link className={styles.navButton} to="/transactions">Transactions</Link>
					<Link className={styles.navButton} to="/cards">Cards</Link>
				</div>
			</nav>
		</section>
	)
};

export default Home;
