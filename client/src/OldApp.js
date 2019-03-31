import { Summary } from './Summary';
import { Assets } from './Assets';

import { Loans } from "./Loans";
import { Debts } from "./Debts";

import { DrizzleContext } from "drizzle-react";
import React, { Component } from "react";
export const App = () => (
	//DrizzleContext Consumer gives us access to our drizzle objects.
	<DrizzleContext.Consumer>
		{drizzleContext => {
			const { drizzle,
				drizzleState,
				initialized } = drizzleContext;
			//return a loading UI if drizzle is not yet initialised
			if(!initialized){
				return "Loading...";
			}
			//pass drizzle down as props into a subcomponen
			return (
				<div>
				<Summary
					drizzle={drizzle}
					drizzleState={drizzleState} />
				<Assets
					drizzle={drizzle}
					drizzleState={drizzleState} />
				<Loans
					drizzle={drizzle}
					drizzleState={drizzleState} />
				<Debts
					drizzle={drizzle}
					drizzleState={drizzleState} />
			</div>
			)
		}}
	</DrizzleContext.Consumer>
)
export default App;
