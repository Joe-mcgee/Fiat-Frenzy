
import { DrizzleContext } from "drizzle-react";
import React, { Component } from "react";
import { Layout } from "./Layout/Layout" 
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
					<Layout 
						drizzle={drizzle}
						drizzleState={drizzleState} />
			)
		}}
	</DrizzleContext.Consumer>
)
export default App;
