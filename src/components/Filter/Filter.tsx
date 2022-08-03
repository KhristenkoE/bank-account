import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Filter as FilterInterface, FilterType } from '../../interfaces/Filter';
import styles from './Filter.module.css';
import FilterDate from './FilterDate/FilterDate';
import FilterRange from './FilterRange/FilterRange';
import FilterSelect from './FilterSelect/FilterSelect';

interface Props {
	filters: FilterInterface[];
	onChange(value: string | { min: number, max: number }, name: string, type: FilterType): void;
}

const Filter = ({
	filters,
	onChange,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [canRenderPortal, setCanRenderPortal] = useState(false);

	useEffect(() => {
		setCanRenderPortal(true);
	}, []);

	const onChangeSelect = (value: string, name: string, type: FilterType) => {
		onChange(value, name, type);
	};

	const onRangeChange = (value: { min: number, max: number }, name: string, type: FilterType) => {
		onChange(value, name, type);
	};

	const onDateChange = (value: string, name: string, type: FilterType) => {
		onChange(value, name, type);
	};

	return (
		<article>
			<button onClick={() => setIsOpen((isOpenPrev) => !isOpenPrev)} className={styles.filterButton}>Filters</button>
			{canRenderPortal && ReactDOM.createPortal(
				<article className={`${styles.filtersBlock} ${!isOpen ? styles.filterBlockClosed : ''}`}>
					<div className={styles.filtersBlockContent}>
						<h4>Filters</h4>
						<ul>
							{filters.map(({ label, options, type }) => {
								return (
									<li key={label}>
										<label htmlFor={label}>{label}</label>
										{type === FilterType.SELECT_ONE && (
											<FilterSelect onChange={(value) => onChangeSelect(value, label, FilterType.SELECT_ONE)} name={label} options={options} />
										)}
										{type === FilterType.DATE && (
											<FilterDate onChange={(value) => onDateChange(value, label, FilterType.DATE)}/>
										)}
										{type === FilterType.RANGE && (
											<FilterRange min={0} max={1000} onChange={(value) => onRangeChange(value, label, FilterType.RANGE)}/>
										)}
									</li>
								)
							})}
						</ul>
					</div>
				</article>,
				document.getElementById('filters-block')
			)}
		</article>
	);
};

export default Filter;
