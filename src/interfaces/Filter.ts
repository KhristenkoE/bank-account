export enum FilterType {
	SELECT_ONE = 'select_one',
	RANGE = 'range',
	DATE = 'date',
}

export interface FilterOption {
	value: string | null;
	label: string;
}


export interface Filter {
	type: FilterType;
	label: string;
	options?: FilterOption[];
	from?: number;
	to?: number;
}

export interface AppliedFilter {
	[name: string]: string | null | number | Date | { min: number; max: number };
}
