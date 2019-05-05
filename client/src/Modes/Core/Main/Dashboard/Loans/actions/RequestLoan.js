import React from "react";
import styled from 'styled-components'
export class RequestLoan extends React.Component {
	constructor(props) {
		super(props)
}

	render() {

		let Wrapper = styled(({className}) => {
			let Title = styled.div`
				font-size: ${1.618*this.props.cell}px;
				text-align: center;
			`
			
			return (
				<div className={className}>
					<Title className={`${className}-title`}>
						Coming Soon
					</Title>
				</div>
			
			)})`
	`
		return (
			<Wrapper className={this.props.className} />
		)
		}
	}


