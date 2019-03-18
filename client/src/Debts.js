import React from "react";

export class Debts extends React.Component {
	state = {

	}

	componentDidMount() {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Bankcoin;	
		let address = this.props.drizzleState.accounts[0]
		
	}

	render() {


		return (
			<div></div>)
	}
}
