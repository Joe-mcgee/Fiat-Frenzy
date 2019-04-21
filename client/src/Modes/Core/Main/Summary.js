
import React from "react";
import styled from 'styled-components'
export class Summary extends React.PureComponent {
	state = {
					}

	generateBalance() {
			return styled.div`				
			grid-row: 1 / -1;
			grid-column: 1;
			background-color: teal;
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
		let BalanceTitle = styled.div`
			grid-row: 1 / 3;
			grid-column: 1 / -1;
			background-color:	yellow;
			font-size: ${2 * this.props.cell}px;
			text-align: center;
		`
		let Balance = styled(({className}) => { return (
				<div className={className}>
					<BalanceTitle className="title">
						Balance
					</BalanceTitle>
			</div>
			)})`
				grid-row: 1 / -1;
				grid-column: 1 / 6;
				background-color: teal;
				display: grid;
				grid-template-rows: repeat(auto-fill, ${this.props.cell}px);
				grid-template-columns: repeat(auto-fill, ${this.props.cell}px);
			`
		return (
			
			<Wrapper className="Summary">
				<Balance className="Balance">	
				</Balance>
			</Wrapper>
		)
	}
}
