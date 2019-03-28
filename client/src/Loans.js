import React from "react";


export class Loans extends React.Component {
	constructor(props) {
		super(props)
		this.state = {loanKeys: [],
			debtor: "",
			amount: 0,
			inscriptions: {
				toMe: [],
				fromMe: []
			},
			signedLoans: {
				asDebtor: [],
				asLender: []
			}
		}
		this.createLoan = this.createLoan.bind(this) 
	}

	async componentDidMount() {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Bankcoin
		let Inscriptions = await this.getInscriptions()
		let organizedInscriptions = this.organizeInscriptions(Inscriptions)
		console.log(organizedInscriptions)
		this.setState({inscriptions: organizedInscriptions})
		let SignedLoans = await this.getSignedLoans()
		let organizedLoans = this.organizeSignedLoans(SignedLoans)
		this.setState({signedLoans: organizedLoans})

	}

	async getInscriptions() {
		let contract = this.props.drizzle.contracts.Bankcoin
		let BankcoinWeb3 = new this.props.drizzle.web3.eth.Contract(contract.abi, contract.address)
		let pastInscriptions = await BankcoinWeb3.getPastEvents('InscribeLoan',
			{
				fromBlock: 0, toBlock: 'latest'
			})
		return pastInscriptions
	}

	organizeInscriptions(inscriptions) {
		let organizedInscriptions = {
			toMe: [],
			fromMe: [],
		}
		
		inscriptions.forEach((inscription) => {
			console.log(inscription)
			if (inscription.returnValues._debtor === this.props.drizzleState.accounts[0]) {
			organizedInscriptions.toMe.push(inscription)
			}
			if (inscription.returnValues._lender === this.props.drizzleState.accounts[0]) {
				organizedInscriptions.fromMe.push(inscription)
			}
		})

		return organizedInscriptions
	}

	async createLoan(event) {
		event.preventDefault()
		console.log(event)
		let address = this.props.drizzleState.accounts[0]
		const contract = this.props.drizzle.contracts.Bankcoin

		let hope = await contract.methods.createLoan(this.state.debtor, this.state.amount).send()
		console.log(await this.getInscriptions())
		//let tx = contracts.createLoan
		//	.cacheSend(
		//		this.state.lender,
		//		this.state.amount,
		//		{
		//			from: address
		//		})
		//	console.log(tx)
	}

	async signLoan(lender, _id) {
		let address = this.props.drizzleState.accounts[0]
		const contract = this.props.drizzle.contracts.Bankcoin
		console.log(contract.methods)
		let signLoan = await contract.methods.signLoanByIndex(lender, _id).send()
		console.log(signLoan)
	}

	async getSignedLoans() {
		let contract = this.props.drizzle.contracts.Bankcoin
		let BankcoinWeb3 = new this.props.drizzle.web3.eth.Contract(contract.abi, contract.address)
		let pastInscriptions = await BankcoinWeb3.getPastEvents('SignLoan',
			{
				fromBlock: 0, toBlock: 'latest'
			})
		return pastInscriptions
	}

	organizeSignedLoans(signedLoans) {
		let organizedLoans = {
			asDebtor: [],
			asLender: [],
		}
		
		signedLoans.forEach((loan) => {
			console.log(loan)
			if (loan.returnValues._debtor === this.props.drizzleState.accounts[0]) {
			organizedLoans.asDebtor.push(loan)
			}
			if (loan.returnValues._lender === this.props.drizzleState.accounts[0]) {
				organizedLoans.asLender.push(loan)
			}
		})

		return organizedLoans
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
			<p>Inscriptions written to</p>
			<table>
				<thead>
					<tr>
						<th>debtor</th>
					</tr>
				</thead>
				<tbody>
					{this.state.inscriptions.fromMe.map((inscription, i) => {
						return <tr key={i}><td>{inscription.returnValues._debtor}</td></tr>
					})
					}
				</tbody>
			</table>
			<p>Incriptions wrote to me</p>
			<table>
				<thead>
					<tr>
						<th>lender</th>
					</tr>
				</thead>
				<tbody>
					{this.state.inscriptions.toMe.map((inscription, i) => {
						return <tr key={i}>
							<td>{inscription.returnValues._lender}</td>
							<td><button onClick={() => this.signLoan(inscription.returnValues._lender, inscription.returnValues._id)}>Sign Loan</button>
							</td>
							</tr>
						})
					}
					
				</tbody>
			</table>

		</div>)
	}
}
