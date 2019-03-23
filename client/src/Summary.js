import React from "react";
export class Summary extends React.Component {
	state = {
		balanceKey: null,
		assetKey: null,
		liabilityKey: null,
		InscribeLoan: null,
	}
	componentDidMount() {
		//access drizzle props within componentDidMount
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Bankcoin;	
		let address = this.props.drizzleState.accounts[0]
		const balanceKey = contract.methods.balanceOf.cacheCall(address)	
		const assetKey = contract.methods.assetsOf.cacheCall(address)	
		const liabilityKey = contract.methods.liabilitiesOf.cacheCall(address)
		let InscribeLoan = contract.events.InscribeLoan()
		this.setState({ InscribeLoan })
		this.setState({ balanceKey })
		this.setState({ assetKey })
		this.setState({ liabilityKey })
	}
	render() {
		const { Bankcoin } = this.props.drizzleState.contracts
		let balance = null;
		let assets = null;
		let liabilities = null;
		if (this.state.balanceKey in Bankcoin.balanceOf) {
			balance = Bankcoin.balanceOf[this.state.balanceKey].value
		} else {
			balance = "Loading" 
		}


		if (this.state.assetKey in Bankcoin.assetsOf) {
			assets = Bankcoin.assetsOf[this.state.balanceKey].value
		} else {
			assets = "Loading" 
		}
		if (this.state.liabilityKey in Bankcoin.liabilitiesOf) {
			liabilities = Bankcoin.liabilitiesOf[this.state.liabilityKey].value
		} else {
			liabilities = "Loading" 
		}

		let event = null
		event = this.state.InscribeLoan
		console.log(event)
		console.log(balance)
		return (
			<div>
				<div>
					<p>Balance</p>
					<p>{balance}</p>
				</div>
				<div>
					<p>Assets</p>
					<p>{assets}</p>
				</div>
				<div>
					<p>Liabilities</p>
					<p>{liabilities}</p>
				</div>
				<div>
					<p>Event</p>
					<p>{event}</p>
				</div>
			</div>

		);


	}
}
