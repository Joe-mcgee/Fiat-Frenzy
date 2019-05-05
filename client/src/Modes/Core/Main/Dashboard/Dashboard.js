
import React from "react";
import styled from 'styled-components'
import { Summary } from './Summary'
import { Loans } from './Loans/Loans'
export class Dashboard extends React.Component {
	constructor(props) {
		super(props)
	}
	
	generateWrapper() {
		return styled.div`
		grid-row: 1 / -1;
		grid-column: 6 / -1;
		background-color: black;
		display: grid;
		grid-template-rows: repeat(auto-fill, ${this.props.cell}px);
		grid-template-columns: repeat(auto-fill, ${this.props.cell}px);
		`
	}
	render() {
		let Wrapper = this.generateWrapper()
		return ( 
			<Wrapper className="Dashboard">
				<Summary
					balance={this.props.balance}
					liabilities={this.props.liabilities}
					assets={this.props.assets}
					cell={this.props.cell}
					 />
			<Loans className="Loans"
				cell={this.props.cell}
				loanData={this.props.loanData}
				debtData={this.props.debtData}
				inscriptions={this.props.inscriptions}
				drizzle={this.props.drizzle}
				drizzleState={this.props.drizzleState}
				/>	
			</Wrapper>
		)
	}
}
	
