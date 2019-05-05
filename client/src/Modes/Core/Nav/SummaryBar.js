import React from "react";
import styled from 'styled-components'
export class SummaryBar extends React.Component {
	state = {
					}

	generateSummaryCard(prop, title, position) {
			let Title = styled.div`
			grid-row: 1;
			grid-column: 1 / -1;
			background-color: black;
			color: white;
			font-size: ${this.props.cell}px;
			margin: 0;
			text-align: center;
		`

		let Amount = styled.div`
			grid-row: 2;
			grid-column: 1 / -1;
			background-color: black;
			color: white;
			font-size: ${0.618*this.props.cell}px;
			line-height: ${2*0.618*this.props.cell}px;
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
			grid-row: 1 / 2;
			grid-column: ${position*5 + 1} / ${position*5 + 3};
			display: grid;
			grid-template-rows: repeat(2, ${this.props.cell}px);
			grid-template-columns: repeat(4, ${this.props.cell}px);
			`

	}

	render () {
				let Wrapper = styled.div`
			grid-row: 1 / 3;
			grid-column: 9 / -4;
			background-color: black;
			display: grid;
			grid-template-rows: repeat(auto-fill, ${this.props.cell}px);
			grid-template-columns: repeat(auto-fill, ${this.props.cell}px);
		`
				
		return (
			
			<Wrapper className="Summary">
			</Wrapper>
		)
	}
}
