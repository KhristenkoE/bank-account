import React from 'react';
import { FilterOption } from '../../../interfaces/Filter';

interface Props {
	options: FilterOption[];
	name: string;
	onChange: (value: string) => void;
}

const FilterSelect = ({
	options,
	name,
	onChange,
}: Props) => {
	return (
		<select onChange={(e) => onChange(e.target.value)} name={name} id={name}>
			{options.map(({ label, value }) => (
				<option value={value} key={value}>{label}</option>
			))}
		</select>
	)
}

export default FilterSelect;
