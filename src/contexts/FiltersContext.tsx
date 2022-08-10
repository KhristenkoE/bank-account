import React, { createContext, PropsWithChildren, useState } from 'react';
import { AppliedFilter, Filter } from '../interfaces/Filter';

export interface FiltersContext {
	transactionFilters: Filter[];
	appliedTransactionFilters: AppliedFilter;
	setTransactionFilters: (filters: Filter[]) => void;
	setAppliedTransactionFilters: (filters: AppliedFilter) => void;

	cardFilters: Filter[];
	appliedCardFilters: AppliedFilter;
	setCardFilters: (filters: Filter[]) => void;
	setAppliedCardFilters: (filters: AppliedFilter) => void;
}

export const initialContext: FiltersContext = {
	transactionFilters: [],
	appliedTransactionFilters: {},
	setTransactionFilters: () => {},
	setAppliedTransactionFilters: () => {},

	cardFilters: [],
	appliedCardFilters: {},
	setCardFilters: () => {},
	setAppliedCardFilters: () => {},
}

export const FiltersContext = createContext(initialContext);

const FiltersContextProvider = ({ children }: PropsWithChildren) => {
	const [transactionFilters, setTransactionFilters] = useState(initialContext.transactionFilters);
	const [appliedTransactionFilters, setAppliedTransactionFilters] = useState(initialContext.appliedTransactionFilters);
	const [cardFilters, setCardFilters] = useState(initialContext.cardFilters);
	const [appliedCardFilters, setAppliedCardFilters] = useState(initialContext.appliedCardFilters);

	return (
		<FiltersContext.Provider value={{
			...initialContext,
			transactionFilters,
			appliedTransactionFilters,
			setTransactionFilters,
			cardFilters,
			setCardFilters,
			appliedCardFilters,
			setAppliedCardFilters,
			setAppliedTransactionFilters,
		}}>
			{children}
		</FiltersContext.Provider>
	)
}

export default FiltersContextProvider
