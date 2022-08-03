import React, { useState } from 'react';

interface Props {
	onChange(value: { min: number, max: number }): void;
	min: number;
	max: number;
}

const FilterRange = ({
	onChange,
	min,
	max,
}: Props) => {
	const [minValue, setMinValue] = useState(min);
	const [maxValue, setMaxValue] = useState(max);

	const onUpdateValue = (type: 'min' | 'max', value: number) => {

		if (type === 'min' && value < maxValue) {
			onChange({
				min: value,
				max: maxValue,
			});
			setMinValue(value);
		}

		if (type === 'max' && value > minValue) {
			onChange({
				min: minValue,
				max: value,
			});
			setMaxValue(value);
		}
	};

	return (
		<div>
			<div>
				Min:
				<input onChange={(e) => onUpdateValue('min', +e.target.value)} value={minValue} min={min} max={max} type="range" />
				{minValue}
			</div>
			<div>
				Max:
				<input onChange={(e) => onUpdateValue('max', +e.target.value)} value={maxValue} min={min} max={max} type="range" />
				{maxValue}
			</div>
		</div>
	)
};

export default FilterRange;
