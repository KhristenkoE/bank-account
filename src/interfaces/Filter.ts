export enum FilterType {
	SELECT_ONE = 'select_one',
	RANGE = 'range',
	DATE = 'date',
}

export enum FilterName {
	CARD_ID = 'cardID',
	DATE = 'transactionDate',
	CARD_ACCOUNT = 'cardAccount',
	AMOUNT = 'amount',
	CURRENCY = 'currency',
	STATUS = 'status',
}

export interface FilterOption {
	value: string | null;
	label: string;
}

export interface Filter {
	type: FilterType;
	label: FilterName
	name: string;
	options?: FilterOption[];
	from?: number;
	to?: number;
}

export type AppliedFilter = Partial<Record<FilterName, string | number | { min: number; max: number; }>>;
