import React, { useEffect } from 'react';
import { FilterOption } from '../../../interfaces/Filter';
import styles from './FilterSelect.module.css';

interface Props {
	options: FilterOption[];
	name: string;
	initialValue?: string;
	onChange: (value: string) => void;
}

const FilterSelect = ({
	options,
	name,
	initialValue,
	onChange,
}: Props) => {
	const [selectedOption, setSelectedOption] = React.useState(initialValue);

	useEffect(() => {
		setSelectedOption(initialValue);
	}, [initialValue]);

	const changeValue = (value: string) => {
		onChange(value);
		setSelectedOption(value);
	}

	return (
		<select className={styles.select} value={selectedOption} onChange={(e) => changeValue(e.target.value)} name={name} id={name}>
			{options.map(({ label, value }) => (
				<option value={value} key={value}>{label}</option>
			))}
		</select>
	)
}

export default FilterSelect;
