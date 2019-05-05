
import React from "react";
import styled from 'styled-components'
export class OfferLoan extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			
				debtor: "",
				amount: "",
				expiry: "",
			
		}
		this.offerLoan = this.offerLoan.bind(this)
	}

	async offerLoan(event) {
		event.preventDefault()
		console.log(this.props.drizzle)
		let address = this.props.drizzleState.accounts[0]
		let contract = this.props.drizzle.contracts.Bankcoin
		let timeDelta = Math.floor(
			(new Date().getTime() / 1000) - (new Date(this.state.expiry).getTime() / 1000)
		) 

		console.log(timeDelta)
		let createLoan = await contract
			.methods['createLoan(address,uint256,uint256)']
			(this.state.debtor, this.state.amount, timeDelta).send()
	}

	render() {
		let Form = styled(({className}) => {

			let AddressField = styled(({className}) => {
				return (
					<input
						className={className}
						type="text"
						placeholder="Address"
						value={this.state.debtor}
						name="debtor"
						onChange={(event) => {
							this.setState({debtor: event.target.value})
						}}/>
				)})`
					grid-row: 1 / 3;
					grid-column: 1 / -1;
					font-size: ${0.618034*this.props.cell}px;
				`

			let AmountField = styled(({className}) => {

				return (
					<input
						className={className}
						type="text"
						placeholder="Amount"
						value={this.state.amount}
						name="amount"
						onChange={(event) => {
							this.setState({amount: event.target.value})
						}}/>
				)})`
					grid-row: 3 / 5;
					grid-column: 1 / -1;
					font-size: ${0.618034*this.props.cell}px;
				`
			let TimeField = styled(({className}) => {
				return (
					<input
						className={className}
						type="date"
						placeholder="Due Date"
						value={this.state.expiry}
						name="expiry"
						onChange={(event) => {
							this.setState({expiry: event.target.value})
						}}/>
				)})`
					grid-row: 5 / 7;
					grid-column: 1 / -1;
					font-size: ${0.618034*this.props.cell}px;
				`


			let SubmitButton = styled(({className}) => {

				return (
					<input 
						className={className}
						type="submit"
						value="Offer Loan"
						onSubmit={(event) => {
							this.offerLoan(event)
						}}/>
				)})`
					grid-row: 7 / -1;
					grid-column: 1 / -1;
					font-size: ${this.props.cell}px;
				`
			return (
				<form
					className={className}
					onSubmit={this.offerLoan}>
					<AddressField className="address-box" />	
					<AmountField className="amount-box" />
					<TimeField className="time-box" />
					<SubmitButton className="submit-box" />
				</form>
			)
		})`
			grid-row: 1 / -1;
			grid-column: 6 / -1;
			display: grid;
			grid-template-columns: repeat(auto-fill, ${this.props.cell}px);
			grid-template-rows: repeat(auto-fill, ${this.props.cell}px);

		`


		return (
			<Form className={this.props.className}
						drizzle={this.props.drizzle}>					
			</Form>
		)
		}
	}


