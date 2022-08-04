import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { AppliedFilter, Filter as FilterInterface, FilterName, FilterType } from '../../interfaces/Filter';
import styles from './Filter.module.css';
import FilterDate from './FilterDate/FilterDate';
import FilterRange from './FilterRange/FilterRange';
import FilterSelect from './FilterSelect/FilterSelect';

interface Props {
	filters: FilterInterface[];
	intialAppliedFilters: AppliedFilter;
	onChange(value: string | { min: number, max: number }, name: string, type: FilterType): void;
	onClear(): void;
}

const Filter = ({
	filters,
	intialAppliedFilters,
	onChange,
	onClear,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const filterContainerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		filterContainerRef.current = document.getElementById('filters-block');
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
			<button onClick={() => setIsOpen((isOpenPrev) => !isOpenPrev)} className={`${styles.filterButton} ${Object.keys(intialAppliedFilters).length ? styles.filterButtonIndicate : ''}`}>Filters</button>
			{filterContainerRef.current && ReactDOM.createPortal(
				<article className={`${styles.filtersBlock} ${!isOpen ? styles.filterBlockClosed : ''}`}>
					<div className={styles.filtersBlockContent}>
						<h4 className={styles.title}>Filters</h4>
						<ul className={styles.list}>
							{filters.map(({ label, name, options, from, to, type }) => {
								return (
									<li className={styles.filter} key={label}>
										<label htmlFor={label}>{name}</label>
										{type === FilterType.SELECT_ONE && (
											<FilterSelect initialValue={(intialAppliedFilters[label] || 'All') as string} onChange={(value) => onChangeSelect(value, label, FilterType.SELECT_ONE)} name={label} options={options} />
										)}
										{type === FilterType.DATE && (
											<FilterDate initialValue={(intialAppliedFilters[label] || '') as string} onChange={(value) => onDateChange(value, label, FilterType.DATE)}/>
										)}
										{type === FilterType.RANGE && (
											<FilterRange initialValue={intialAppliedFilters[label] as { min: number; max: number }} min={from} max={to} onChange={(value) => onRangeChange(value, label, FilterType.RANGE)}/>
										)}
									</li>
								)
							})}
						</ul>
						<button className={styles.clearFilters} onClick={onClear}>Clear filters</button>
					</div>
				</article>,
				filterContainerRef.current
			)}
		</article>
	);
};

export default Filter;
