import React from "react";
import styled from 'styled-components'
export class Loans extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {
		let Inscriptions = styled(({className}) => { return (
			<div className={className}>
				
			</div>
		)})`
			grid-row: 1 / -1;
			grid-column: 1 / 6;
			background-color: green;
		`
		let Wrapper = styled(({className}) => { return (
			<div className={className}>
				<Inscriptions className="inscriptions" />	
			</div>
		)})`
			grid-row: 11 / 16;
			grid-column: 4 / -4;
			background-color: red;
			display: grid;
			grid-template-rows: repeat(auto-fill, ${this.props.cell}px);
			grid-template-columns: repeat(auto-fill, ${this.props.cell}px);
			
		`
		return (
			<Wrapper className="Loans" />
		)
	}
}	

