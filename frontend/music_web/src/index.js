import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App.js';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import reducer from './store/reducer.js';
import { createStore } from 'redux';
import { Provider  } from 'react-redux';


const store = createStore(reducer);

ReactDOM.render(
	<Provider store = {store}>
		<App />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
