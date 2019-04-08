import React from "react";
import styled from 'styled-components'
import {About} from './About';
import {Core} from './Core';
export class Main extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		
	}
	
gTgenerateWrapper() {
		return styled.div`
			grid-row: 4 / 22;
			grid-column: 1 / -1;
			background-color: teal;
		`
	}
	render() {
		const mode = this.props.mode;
		let activeComponent;
		switch (mode) {
			case 'about':
				activeComponent = <About />
				break;
			case 'app':
				activeComponent = <Core />
					
		}
		let Wrapper = this.generateWrapper();
		return (
			<Wrapper> 
				{activeComponent}
			</Wrapper>)
	}
}
