import React from "react";
import styled from 'styled-components'
import logo from 'src/../static/Logo.png'
import userIcon from 'src/../static/user-icon.png'
import { NavLayout } from 'Layout/NavLayout'
export class Nav extends NavLayout  {
	constructor(props) {
		super(props)
	}
	componentdidMount() {

	}

	
	generateLogo() {
		return styled.img`
			width: 100%;
			height: 100%;
			grid-column: 1 / 9;
			grid-row: 1 / 3;
			background-color: black;
		`
	}
	generateGreyBar() {
		return styled.div`
			grid-column: 9 / -4;
			grid-row: 1 / 4;
			background-color: black;
			/* Race Tile */
			display: grid;
			grid-template-columns: 
		`
	}

	generateUserIcon() {
		return styled.img`
			width: 100%;
			height: 100%;
			grid-column: -1 / -4;
			grid-row: -1 / -4;
			background-color: black;
		`
	}


	render() {
		let Wrapper = this.generateWrapper(this.props.cell)
		let Logo = this.generateLogo()
		let GreyBar = this.generateGreyBar()
		let UserIcon = this.generateUserIcon()
	


		return (
			<Wrapper className='about-nav'>
				<Logo src={logo} className="logo">
				</Logo>
				<GreyBar />
				<UserIcon src={userIcon} />
			</Wrapper>
		)
	}
	}
