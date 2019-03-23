import React from "react";

export class Loans extends React.Component {
	constructor(props) {
		super(props)
		this.state = {loanKeys: [],
			debtor: "",
			amount: 0
		}
		this.createLoan = this.createLoan.bind(this) 

	}

	componentDidMount() {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Bankcoin;	
		let address = this.props.drizzleState.accounts[0];
		let events = contract.events.InscribeLoan({}, (error, event) => {
			console.log(error, event);
		})
	}

	async createLoan(event) {
		event.preventDefault()
		console.log(event)
		let address = this.props.drizzleState.accounts[0]
		const contract = this.props.drizzle.contracts.Bankcoin

		let hope = await contract.methods.createLoan(this.state.debtor, this.state.amount).send()
		console.log(hope)

		//let tx = contracts.createLoan
		//	.cacheSend(
		//		this.state.lender,
		//		this.state.amount,
		//		{
		//			from: address
		//		})
		//	console.log(tx)
	}

	render() {

		return (<div>
			<form onSubmit={this.createLoan}>
				<label>
					Inscribe Debtor:
					<input type="text"
						value={this.state.debtor}
						name="debtor"
						onChange={(event) => {
							console.log(event)
							this.setState({debtor: event.target.value})
						}}/>
				</label>
				<label>
					<input type="text"
						value={this.state.amount}
						name="amount"
						onChange={(event) => {
							this.setState({amount: event.target.value})
						}}/>
				</label>
				<input type="submit" value="Submit" />
			</form>
			<div>
			</div>
		</div>)
	}
}
