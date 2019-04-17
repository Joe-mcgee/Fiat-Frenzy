
import React from "react";
import styled from 'styled-components'
import { Summary } from './Summary'
export class Dashboard extends React.Component {
	constructor(props) {
		super(props)
	}
	
	generateWrapper() {
		return styled.div`
		grid-row: 1 / -1;
		grid-column: 6 / -1;
		background-color: blue;
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
					ledger={this.props.ledger} />
	
			</Wrapper>
		)
	}
}
	