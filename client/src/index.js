import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {
				Drizzle,
				generateStore
} from "drizzle";

import {
				DrizzleContext
} from "drizzle-react";

import Bankcoin from './contracts/Bankcoin.json';

const options = {
				contracts: [Bankcoin]
}
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(
				<DrizzleContext.Provider drizzle={drizzle}>
						<App />
				</DrizzleContext.Provider>, document.getElementById('root'));

registerServiceWorker();
