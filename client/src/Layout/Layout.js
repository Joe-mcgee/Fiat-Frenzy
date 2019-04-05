import React from "react";
import styled from 'styled-components'
import logo from '../static/Logo.png'
import userIcon from '../static/user-icon.png'
import { Main } from '../Main';
export class Layout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mode: 'about',
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

	generateLogo() {
		return styled.img`
			width: 100%;
			height: 100%;
			grid-column: 1 / 9;
			grid-row: 1 / 4;
			background-color: black;
		`
	}
	generateGreyBar() {
		return styled.div`
			grid-column: 9 / -3;
			grid-row: 1 / 4;
			background-color: black;
		`
	}

	generateUserIcon() {
		return styled.img`
			width: 100%;
			height: 100%;
			grid-column: -1 / -4;
			grid-row: 1 / 4;
			background-color: black;
		`
	}


	updateWindowDimensions() {
		this.setState({width: window.innerWidth, height: window.innerHeight})
	}

	render() {
		let Grid = this.generateGrid(this.state.width, this.state.height)
		let Logo = this.generateLogo()
		let GreyBar = this.generateGreyBar()
		let UserIcon = this.generateUserIcon()
		return (
			<Grid>
				<Logo src={logo}>
				</Logo>
				<GreyBar />
				<UserIcon src={userIcon} />
				<Main
					drizzle={this.props.drizzle}
					drizzleState={this.props.drizzleState}
					mode={this.state.mode}
				/>
			</Grid>
			)
	}
}

