
import React from "react";
import styled from 'styled-components'
export class Summary extends React.Component {
	state = {
					}

	generateSummaryCard(prop, title, position) {
			let Title = styled.div`
			grid-row: 1 / 3;
			grid-column: 1 / -1;
			background-color:#50c878;
			font-size: ${this.props.cell}px;
			margin: 0;
			line-height: ${2*this.props.cell}px;
			text-align: center;
		`

		let Amount = styled.div`
			grid-row: 3 / 6;
			grid-column: 1 / -1;
			background-color: white;
			font-size: ${1.618*this.props.cell}px;
			line-height: ${2*1.618*this.props.cell}px;
			margin: 0;
			text-align: center;
		`

		
		return styled(({className}) => { return (
			<div className={className}>
				<Title className="title">
					{title}
				</Title>
				<Amount className="amount">
					{prop}
				</Amount>
			</div>
		)})`
			grid-row: 1 / -1;
			grid-column: ${position*5 + 1} / ${position*5 + 6};
			display: grid;
			grid-template-rows: repeat(auto-fill, ${this.props.cell}px);
			grid-template-columns: repeat(auto-fill, ${this.props.cell}px);
			`

	}

	render () {
				let Wrapper = styled.div`
			grid-row: 4 /  9;
			grid-column: 4 / -4;
			background-color: red;
			display: grid;
			grid-template-rows: repeat(auto-fill, ${this.props.cell}px);
			grid-template-columns: repeat(auto-fill, ${this.props.cell}px);
		`
				
		
		let Balance = this.generateSummaryCard(this.props.balance, "Balance", 0)
		let Assets = this.generateSummaryCard(this.props.assets, "Assets", 1)
		let Liabilities = this.generateSummaryCard(this.props.liabilities, "Liabilities", 2)
		let freeTokens = this.props.balance - (this.props.liabilities*(0.618))
		let Free = this.generateSummaryCard(freeTokens, "Liquid Tokens", 3)
		return (
			
			<Wrapper className="Summary">
				<Balance className="Balance">	
				</Balance>
				<Assets className="Assets">
				</Assets>
				<Liabilities className="Liabilities">
				</Liabilities>
				<Free className="Free">
				</Free>
			</Wrapper>
		)
	}
}
