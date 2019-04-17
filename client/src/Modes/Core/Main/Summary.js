
import React from "react";
import styled from 'styled-components'
export class Summary extends React.PureComponent {
	state = {
					}

	render () {
				let Wrapper = styled.div`
			grid-row: 2 /  7;
			grid-column: 2 / -2;
			background-color: red;
		`
		
		return (
			
			<Wrapper>
				{this.props.ledger.balance}
			</Wrapper>
		)
	}
}
