import React, { useEffect, useState } from 'react';
import styles from './FilterRange.module.css';

interface Props {
	onChange(value: { min: number, max: number }): void;
	min: number;
	max: number;
	initialValue?: { min: number, max: number };
}

const FilterRange = ({
	onChange,
	min,
	max,
	initialValue,
}: Props) => {
	const [minValue, setMinValue] = useState(initialValue?.min || min);
	const [maxValue, setMaxValue] = useState(initialValue?.max || max);

	useEffect(() => {
		setMinValue(initialValue?.min || min);
		setMaxValue(initialValue?.max || max);
	}, [initialValue, min, max]);

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
		<div className={styles.wrapper}>
			<div>
				<input onChange={(e) => onUpdateValue('min', +e.target.value)} value={minValue} min={min} max={max} type="range" />
				<div>
					from: {minValue}
				</div>
			</div>
			<div>
				<input onChange={(e) => onUpdateValue('max', +e.target.value)} value={maxValue} min={min} max={max} type="range" />
				<div>
					to: {maxValue}
				</div>
			</div>
		</div>
	)
};

export default FilterRange;
