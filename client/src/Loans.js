import React from "react";

export class Loans extends React.Component {
	constructor(props) {
		super(props)
		this.state = {loanKeys: [],
									loanIndex: null,
									loanForm: {
											debtor: null
										}
									}
		this.createLoan = this.createLoan.bind(this); 
	
	}

	componentDidMount() {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Bankcoin;	
		let address = this.props.drizzleState.accounts[0];
	}

	createLoan(lender, amount) {
		console.log('ping')
		let address = this.props.drizzleState.accounts[0]
		let tx = this.props.drizzle.contracts.Bankcoin.methods.createLoan.cacheSend(lender, amount, {from: address})
		console.log(tx)
	}

	render() {
		
		return (
			<div>
				<form onSubmit={() => {
					const debtor = this.state.loanForm.debtor
					const amount = this.state.loanForm.amount
					this.createLoan(debtor, amount)
					
				}
				}>
					<label>
						Inscribe Debtor:
						<input type="text" name="debtors" />
					</label>
					<input type="submit" value="Submit" />
				</form>
				<div>
					<p>{this.state.loanIndex}</p>
					
				</div>
				</div>)
	}
}
