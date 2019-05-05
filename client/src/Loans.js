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
			inscriptionKeys: null,
			signedLoans: {
				asDebtor: [],
				asLender: []
			},
			signedLoanKeys: null,

		}
		this.createLoan = this.createLoan.bind(this) 
	}

	async componentDidMount() {
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Bankcoin
		let address = this.props.drizzleState.accounts[0]

		let inscriptions = await this.getInscriptions()
		let organizedInscriptions = this.organizeInscriptions(inscriptions)
		this.setState({inscriptions: organizedInscriptions})
		let SignedLoans = await this.getSignedLoans()
		let organizedLoans = this.organizeSignedLoans(SignedLoans)
		this.setState({signedLoans: organizedLoans})

		let inscriptionKeys = this.state.inscriptions.fromMe.map((inscription) => {
			let index = inscription.returnValues._id
			let debtor = inscription.returnValues._debtor
			return contract.methods.getLoanByIndex.cacheCall(debtor, index)
		})
		this.setState({inscriptionKeys: inscriptionKeys})

		let signedLoanKeys = this.state.signedLoans.asDebtor.map((signedLoan) => {
			let index = signedLoan.returnValues._id
			let lender = signedLoan.returnValues._lender
			return contract.methods.getDebtByIndex.cacheCall(lender, index)
		})
		this.setState({signedLoanKeys: signedLoanKeys})
	}

	async getLoans() {
		this.state.inscriptions.fromMe.forEach(async (inscription) => {
			const contract = this.props.drizzle.contracts.Bankcoin
			let index = inscription.returnValues._id
			let debtor = inscription.returnValues._debtor
			let loan = await contract.methods.getLoanByIndex(debtor, index).send()
			console.log(loan)
		})
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
		const { Bankcoin } = this.props.drizzleState.contracts
		console.log(this.state.inscriptionKeys)	
		let loanStuff = {0: "Loading", 1: "Loading", 2: "Loading"}
		let debtStuff = {0: "Loading", 1: "Loading", 2: "Loading"}
		for (let i in this.state.inscriptionKeys) {
			let values = [];
			let inscriptionKey = this.state.inscriptionKeys[i]
			let loanTuple;
			if (inscriptionKey in Bankcoin.getLoanByIndex) {
				loanTuple = Bankcoin.getLoanByIndex[inscriptionKey].value
				let formatTime = new Date(loanTuple[1] *1000)
				loanTuple[1] = formatTime.toString()

				values.push(loanTuple)


			} else {
				loanTuple = {0: "Loading", 1: "Loading", 2: "Loading"}
				values.push(loanTuple)
			}
			loanStuff = values
		}
		
		for (let j in this.state.signedLoanKeys) {
			let values = []
			let signedLoanKey = this.state.signedLoanKeys[j]
			let debtTuple
			if (signedLoanKey in Bankcoin.getDebtByIndex) {
				debtTuple = Bankcoin.getDebtByIndex[signedLoanKey].value
				console.log(debtTuple)
				let formatTime = new Date(debtTuple[1] *1000)
				debtTuple[1] = formatTime.toString()
				values.push(debtTuple)
			} else {
				debtTuple = {0: "Loading", 1:"Loading", 2:"Loading"}
				values.push(debtTuple)
			}
			debtStuff = values
		}
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
						<th>amount</th>
						<th>time</th>
						<th>Status</th>

					</tr>
				</thead>
				<tbody>
					{this.state.inscriptions.fromMe.map((inscription, i) => {
						return (<tr key={i}>
							<td>{inscription.returnValues._debtor}</td>
							<td>{loanStuff[i] ? loanStuff[i][0]: "Loading"}</td>
							<td>{loanStuff[i][1]}</td>
							<td>{loanStuff[i][2].toString()}</td> 
						</tr>)
					})
					}
				</tbody>
			</table>
			<p>Incriptions wrote to me</p>
			<table>
				<thead>
					<tr>
						<th>lender</th>
						<th>amount</th>
						<th>time</th>
						<th>status</th>
						<th>actions</th>
					</tr>
				</thead>
				<tbody>
					{this.state.inscriptions.toMe.map((inscription, i) => {
						return <tr key={i}>
							<td>{inscription.returnValues._lender}</td>
							<td>{debtStuff[i][0]}</td>
							<td>{debtStuff[i][1]}</td>
							<td>{debtStuff[i][2].toString()}</td>
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
