
import React from "react";
import styled from 'styled-components'
import { Nav } from './Nav/Nav' 
export class About extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		
	}


	render() {

		return (
		<Nav cell={this.props.cell}/>
		)	}
}
