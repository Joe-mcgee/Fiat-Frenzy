import React from "react";
import styled from 'styled-components'
export class Layout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			width: 0,
			height: 0
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

	generateGrid(width, height) {
		let cell;
		// is portrait mode
		switch (height >= width) {
			case true:
				cell = width / 21;
				return styled.div`
					display: grid;
					grid-template-rows: repeat(21, ${cell}px);
					grid-template-columns: repeat(21, ${cell}px);
				`
			case false:
				cell = height / 21;
				let neededColumns = Math.round((width / cell));

				return styled.div`
					display: grid;
					grid-template-rows: repeat(21, ${cell}px);
					grid-template-columns: repeat(${neededColumns}, ${cell}px);
				`
		}

	}

	generateNavBar() {
		
		return styled.div`
			background-color: black;
			grid-column: 1 / -1;
			grid-row: 1 / 4;
			opacity: 0.618;

		`
	}

	updateWindowDimensions() {
		this.setState({width: window.innerWidth, height: window.innerHeight})
	}

	render() {
		let Grid = this.generateGrid(this.state.width, this.state.height)
		let NavBar = this.generateNavBar()
		return (<div>
			<Grid>
				<NavBar />
			</Grid>
			</div>)
	}
}

