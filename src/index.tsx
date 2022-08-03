import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import './css/index.css';

ReactDOM.render(
	<BrowserRouter basename='home'>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);
