import React from 'react';

interface Props {
	onChange(value: string): void;
}

const FilterDate = ({
	onChange,
}: Props) => {
	return (
		<input onChange={(e) => onChange(e.target.value)} type="date" />
	)
}

export default FilterDate;
