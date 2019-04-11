
import React from "react";
import styled from 'styled-components'
import { Nav } from './Nav/Nav' 
import { Main } from './Main/Main'
export class About extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		
	}


	render() {
	let Wrapper = styled.div``	
		return (
		<Wrapper>		
			<Nav cell={this.props.cell}/>
			<Main cell={this.props.cell} />
		</Wrapper>
		)	}
}
