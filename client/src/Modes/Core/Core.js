import React from "react";
import styled from 'styled-components'

import { Nav } from './Nav/Nav' 
import { Main } from './Main/Main'

export class Core extends React.Component {
	constructor(props) {
	super(props)	
	}

	render() {
		let Wrapper = styled.div``
		return (
			<Wrapper className={this.props.className}>
				<Nav
					className="Nav"
					cell={this.props.cell}
					mode={this.props.mode}
					modeHandler= {this.props.modeHandler}
				/>
				<Main
					className="Main"
					balance={this.props.balance}
					liabilities={this.props.liabilities}
					assets={this.props.assets}
					loanData={this.props.loanData}
					debtData={this.props.debtData}
					inscriptions={this.props.inscriptions}
					drizzle={this.props.drizzle}
					drizzleState={this.props.drizzleState}
					cell={this.props.cell}
					mode={this.props.mode}
									/>			
			</Wrapper>) 
	}

}
