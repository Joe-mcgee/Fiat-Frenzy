import React from "react";
import styled from 'styled-components'
import logo from '../static/Logo.png'
import userIcon from '../static/user-icon.png'

import { About } from '../Modes/About/About'
import { Core } from '../Modes/Core/Core'

export class Layout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			// window
			mode: 'About',
			width: 0,
			height: 0,
			// drizzle
			balanceKey: null,
			assetKey: null,
			liabilityKey: null,
			InscribeLoan: null,
			loanKeys: [],
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

		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.modeHandler = this.modeHandler.bind(this)
		this.createLoan = this.createLoan.bind(this) 
	}

	modeHandler(mode) {
		this.setState({mode: mode })
	}

	async componentDidMount() {
		// window events
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
		
		// drizzle
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Bankcoin;
		let address = this.props.drizzleState.accounts[0]
		const balanceKey = contract.methods.balanceOf.cacheCall(address)	
		const assetKey = contract.methods.assetsOf.cacheCall(address)	
		const liabilityKey = contract.methods.liabilitiesOf.cacheCall(address)	
		this.setState({ balanceKey })
		this.setState({ assetKey })
		this.setState({ liabilityKey })
		// event stuff
		let inscriptions = await this.getInscriptions()
		let organizedInscriptions = this.organizeInscriptions(inscriptions)
		this.setState({inscriptions: organizedInscriptions})
		//let SignedLoans = await this.getSignedLoans()
		//let organizedLoans = this.organizeSignedLoans(SignedLoans)
		//this.setState({signedLoans: organizedLoans})

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
		console.log(signedLoanKeys)
		this.setState({signedLoanKeys: signedLoanKeys})
	
	}

	componentWillMount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}



	generateGrid(activeComponent, width, height) {
		let cell = this.calcActiveCell(width, height)
		// is portrait mode
		switch (height >= width) {
			case true:
				return styled(activeComponent)`
					display: grid;
					grid-template-rows: repeat(21, ${cell}px);
					grid-template-columns: repeat(21, ${cell}px);
				`
			case false:
				let neededColumns = Math.round((width / cell));

				return styled(activeComponent)`
					display: grid;
					grid-template-rows: repeat(21, ${cell}px);
					grid-template-columns: repeat(${neededColumns}, ${cell}px);
				`
		}

	}
	calcActiveCell() {
		let length;
		if (window.innerHeight >= window.innerWidth) {
			return window.innerWidth / 21
		}
		return window.innerHeight / 21;
	}
	updateWindowDimensions() {
		this.setState({width: window.innerWidth, height: window.innerHeight})
		this.setState({cell: this.calcActiveCell()})	
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
	}

	async signLoan(lender, _id) {
		let address = this.props.drizzleState.accounts[0]
		const contract = this.props.drizzle.contracts.Bankcoin
		let signLoan = await contract.methods.signLoanByIndex(lender, _id).send()
	}

	async getSignedLoans() {
		let contract = this.props.drizzle.contracts.Bankcoin
		let BankcoinWeb3 = new this.props.drizzle.web3.eth.Contract(contract.abi, contract.address)
		let pastInscriptions = await BankcoinWeb3.getPastEvents('SignLoan',
			{
				fromBlock: 0, toBlock: 'latest'
			})
		console.log(pastInscriptions)
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

		let loanData = {0: "Loading", 1: "Loading", 2: "Loading"}
		let debtData = {0: "Loading", 1: "Loading", 2: "Loading"}
		for (let i in this.state.inscriptionKeys) {
			let values = [];
			let inscriptionKey = this.state.inscriptionKeys[i]
			let loanTuple;
			if (inscriptionKey in Bankcoin.getLoanByIndex) {
				loanTuple = Bankcoin.getLoanByIndex[inscriptionKey].value
				console.log(loanTuple)
				let formatTime = new Date(loanTuple[1] *1000)
				loanTuple[1] = formatTime.toString()

				values.push(loanTuple)


			} else {
				loanTuple = {0: "Loading", 1: "Loading", 2: "Loading"}
				values.push(loanTuple)
			}
			loanData = values
		}
		console.log('here')
			/*for (let j in this.state.signedLoanKeys) {
			let values = []
			let signedLoanKey = this.state.signedLoanKeys[j]
			let debtTuple;
			if (signedLoanKey in Bankcoin.getDebtByIndex) {
				debtTuple = Bankcoin.getDebtByIndex[signedLoanKey].value
				let formatTime = new Date(debtTuple[1] *1000)
				debtTuple[1] = formatTime.toString()
				values.push(debtTuple)
			} else {
				debtTuple = {0: "Loading", 1:"Loading", 2:"Loading"}
				values.push(debtTuple)
			}
			debtData = values
		}
		*/
		let Grid;
		switch (this.state.mode) {
			case ('About'):
				Grid = this.generateGrid(About, this.state.width, this.state.height)
				break;
			case ('Core'):
				Grid = this.generateGrid(Core, this.state.width, this.state.height)
		}
		
		return (
			<Grid className='grid'
				// drizzle props
				drizzle={this.props.drizzle}
				drizzleState={this.props.drizzleState}
				balance={balance}
				liabilities={liabilities}
				assets={assets}	
				loanData={loanData}
				debtData={debtData}
				inscriptions={this.state.inscriptions}
				// window props
				mode={this.state.mode}
				modeHandler={this.modeHandler}
				cell={this.calcActiveCell()}
				/>
			)
	}
}

