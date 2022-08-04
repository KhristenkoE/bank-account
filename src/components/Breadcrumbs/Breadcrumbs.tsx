import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BreadcrumbsContext } from '../../contexts/BreadcrumbsContext';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = () => {
	const { breadcrumbs, setBreadcrumbs } = useContext(BreadcrumbsContext);
	const navigate = useNavigate();

	const onBreadcrumbClick = (url: string, index: number) => {
		navigate(url);
	}

	return (
		<nav>
			<ul className={styles.list}>
				{breadcrumbs.map(({ url, name }, index) => (
					<li key={index}>
						<button className={index === breadcrumbs.length - 1 ? styles.breadcrumbActive : ''} onClick={() => onBreadcrumbClick(url, index)}>{name}</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Breadcrumbs;
