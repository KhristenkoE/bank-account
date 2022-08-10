import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BreadcrumbsContextProvider from '../../contexts/BreadcrumbsContext';
import DataContext, { initialContext as initialDataContext } from '../../contexts/DataContext';
import FiltersContextProvider from '../../contexts/FiltersContext';
import CardDetails from '../../pages/CardDetails/CardDetails';
import CardsList from '../../pages/CardsList/CardsList';
import Home from '../../pages/Home/Home';
import TransactionDetails from '../../pages/TransactionDetails/TransactionDetails';
import TransactionsList from '../../pages/TransactionsList/TransactionsList';
import _404 from '../../pages/_404/_404';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const App = () => {
	return (
		<DataContext.Provider value={initialDataContext}>
			<FiltersContextProvider>
				<BreadcrumbsContextProvider>
					<Breadcrumbs />
					<Routes>
						<Route path="transactions" element={<TransactionsList />} />
						<Route path="transactions/:transactionID" element={<TransactionDetails />} />
						<Route path="transactions/:transactionID/:cardID" element={<CardDetails />} />
						<Route path="cards" element={<CardsList />} />
						<Route path="cards/:cardID" element={<CardDetails />} />
						<Route path="cards/:cardID/transactions" element={<TransactionsList />} />
						<Route path="cards/:cardID/transactions/:transactionID" element={<TransactionDetails />} />
						<Route path="/" element={<Home />} />
						<Route path="*" element={<_404 />} />
					</Routes>
				</BreadcrumbsContextProvider>
			</FiltersContextProvider>
		</DataContext.Provider>
	)
};

export default App;
