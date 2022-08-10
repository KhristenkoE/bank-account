import React, { useEffect } from 'react';
import styles from './FilterDate.module.css';

interface Props {
	onChange(value: string): void;
	initialValue?: string;
}

const FilterDate = ({
	onChange,
	initialValue,
}: Props) => {
	const [value, setValue] = React.useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	const changeValue = (value: string) => {
		onChange(value);
		setValue(value);
	};

	return (
		<input className={styles.datePicker} value={value} onChange={(e) => changeValue(e.target.value)} type="date" />
	)
}

export default FilterDate;
