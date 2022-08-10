import React, { PropsWithChildren, ReactElement } from 'react';
import styles from './ItemsList.module.css';

interface Props {
	
}

const ItemsList = ({
	children,
}: PropsWithChildren<Props>) => {
	return (
		<div>
			<div className={styles.elementsContainer}>
				{children}
			</div>
		</div>
	);
};

export default ItemsList;
