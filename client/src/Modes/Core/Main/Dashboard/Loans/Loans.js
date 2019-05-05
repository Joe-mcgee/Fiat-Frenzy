import React from "react";
import styled from 'styled-components'

import { RequestLoan } from './actions/RequestLoan.js';
import { OfferLoan } from './actions/OfferLoan.js';
import { SignLoan } from './actions/SignLoan.js';
import { RepayLoan } from './actions/RepayLoan.js';
export class Loans extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			activePane: "RequestLoan"
		}
	}

	activatePane(pane) {
		let newActive = pane.replace(/ .*/,'');
		console.log(newActive)
		this.setState({activePane: newActive});
	}

	generateLoanOptions(title, className, position) {

		return styled(({className}) => {
			let Title = styled.div`
				grid-row: 1 / - 1;
				grid-column: 1 / -1;
				background-color:#50c878;
				font-size: ${this.props.cell}px;
				margin: 0;
				line-height: ${2*this.props.cell}px;
				text-align: center;
				&:hover {
					background-color:  #50c878;
					color:  #e0115f; 
			}`

			return (
				<div
					onClick={() => {
						this.activatePane(className)
						console.log(`clicked ${title}`)
					}}
					className={className}>
					<Title className={className + 'title'}>
						{title}
					</Title>
				</div>
			)
		})`
			grid-row: ${position*2 + 1} / ${position*2 +3};
			grid-column: 1 / -1;
			background-color: blue;
			display: grid;
			grid-template-columns: repeat(auto-fill, ${this.props.cell}px)
			grid-template-rows: repeat(auto-fill, ${this.props.cell}px)

		`
	}

	render() {
			let RequestLoanButton = this.generateLoanOptions("Request Loan", "RequestLoan", 0)
		let OfferLoanButton = this.generateLoanOptions("Offer Loan", "OfferLoan", 1)
		let SignLoanButton = this.generateLoanOptions("Sign Loan", "SignLoan", 2)
		let RepayLoanButton = this.generateLoanOptions("Repay Loan", "RepayLoan", 3)
		let ActionPane = styled(({className}) => { return (
			<div className={className}>
				<RequestLoanButton className="RequestLoan" />
				<OfferLoanButton className="OfferLoan"/>
				<SignLoanButton className="SignLoan" />
				<RepayLoanButton className="RepayLoan" />
			</div>
		)})`
			grid-row: 1 / -1;
			grid-column: 1 / 6;

			display: grid;
			grid-template-columns: repeat(auto-fill, ${this.props.cell}px);
			grid-template-rows: repeat(auto-fill, ${this.props.cell}px);
		`
		let main;
			console.log(this.state.activePane)
		switch (this.state.activePane) {
			case "RequestLoan":
				main = RequestLoan
				break
			case "OfferLoan":
				main = OfferLoan
				break
			case "SignLoan":
				main = styled(({className}) => { 
					return (
						<SignLoan
							className={className}
							debtData={this.props.debtData}
							inscriptions={this.props.inscriptions}
							drizzle={this.props.drizzle}
						/>
					)
				})``			
				break
			case "RepayLoan":
				main = styled(({className}) => { 
					return (
						<RepayLoan className={className} />
					)
				})``		

				break
		}

		let Main = styled(main)`
			grid-row: 1 / -1;
			grid-column: 6 / -1;
			display: grid;
			grid-template-columns: repeat(auto-fill, ${this.props.cell}px);
			grid-template-rows: repeat(auto-fill, ${this.props.cell}px);
		`
		let Wrapper = styled(({className}) => { return (
			<div className={className}>
				<ActionPane className="actions" />
				<Main
					className={this.state.activePane}
					cell={this.props.cell}
					drizzle={this.props.drizzle}
					drizzleState={this.props.drizzleState}
				/>
			</div>
		)})`
			grid-row: 11 / 19;
			grid-column: 4 / -4;
			background-color: red;
			display: grid;
			grid-template-rows: repeat(auto-fill, ${this.props.cell}px);
			grid-template-columns: repeat(auto-fill, ${this.props.cell}px);

		`
		return (
			<Wrapper className="Loans"
							 drizzle={this.props.drizzle}/>
		)
	}
}	

