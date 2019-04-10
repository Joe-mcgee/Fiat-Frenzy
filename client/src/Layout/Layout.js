import React from "react";
import styled from 'styled-components'
import logo from '../static/Logo.png'
import userIcon from '../static/user-icon.png'

import { About } from '../Modes/About/About'

export class Layout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mode: 'About',
			width: 0,
			height: 0,
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillMount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}



	generateGrid(activeComponent, width, height) {
		let cell = this.calcActiveCell(width, height)
		// is portrait mode
		switch (height >= width) {
			case true:
				return styled(activeComponent)`
					display: grid;
					grid-template-rows: repeat(21, ${cell}px);
					grid-template-columns: repeat(21, ${cell}px);
				`
			case false:
				let neededColumns = Math.round((width / cell));

				return styled(activeComponent)`
					display: grid;
					grid-template-rows: repeat(21, ${cell}px);
					grid-template-columns: repeat(${neededColumns}, ${cell}px);
				`
		}

	}
	calcActiveCell() {
		let length;
		if (window.innerHeight >= window.innerWidth) {
			return window.innerWidth / 21
		}
		return window.innerHeight / 21;
	}
	updateWindowDimensions() {
		this.setState({width: window.innerWidth, height: window.innerHeight})
		this.setState({cell: this.calcActiveCell()})	
	}

	render() {
		let Grid;
		switch (this.state.mode) {
			case ('About'):
				Grid = this.generateGrid(About, this.state.width, this.state.height)
	
		}
		return (
			<Grid className='grid'
			 drizzle={this.props.drizzle}
			 drizzleState={this.props.drizzleState}
			 mode={this.state.mode}
			 cell={this.calcActiveCell()}/>
			)
	}
}

