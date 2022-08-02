import React from 'react';
import DataContext, { initialContext as initialDataContext } from './contexts/DataContext';
import TransactionsList from './pages/TransactionsList/TransactionsList';

const App = () => {

	return (
		<DataContext.Provider value={initialDataContext}>
			<TransactionsList />
		</DataContext.Provider>
	)
};

export default App;
