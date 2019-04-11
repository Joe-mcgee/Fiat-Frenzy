import React from "react";
import styled from 'styled-components'
import logo from 'src/../static/Logo.png'
import userIcon from 'src/../static/user-icon.png'
export class Nav extends React.Component {
	constructor(props) {
		super(props)
		this.state =  {
			userNavHidden: true
		}
	}
	componentdidMount() {

	}

	generateWrapper() {
		
		return styled.div`
			grid-row: 1 / 4;
			grid-column: 1 / -1;
			display: grid;
			grid-template-rows: repeat(3, ${this.props.cell}px);
			grid-template-columns: repeat(auto-fill, ${this.props.cell}px);
			background-color: black;
		`
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
			grid-column: 9 / -4;
			grid-row: 1 / 4;
			background-color: black;
			/* Race Tile */
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
	popOverUserNav() {
		let curState = this.state.userNavHidden
		this.setState({userNavHidden: !curState})
	}

	render() {
		let Logo = this.generateLogo()
		let GreyBar = this.generateGreyBar()
		let UserIcon = this.generateUserIcon()
	
		let Wrapper = this.generateWrapper()
		let NavBar = styled(({className}) => { return (
			<Wrapper className={className}>
				<Logo src={logo}>
				</Logo>
				<GreyBar />
				<UserIcon src={userIcon}
					onClick={() => {
						this.popOverUserNav()	
					}}/>
			</Wrapper>
		)})`
			grid-row: 1 / 4;
			grid-column: 1 / -1;
		`
		let activeComponent = <NavBar /> 

		return (
			<NavBar />		
		)
	}
	}
