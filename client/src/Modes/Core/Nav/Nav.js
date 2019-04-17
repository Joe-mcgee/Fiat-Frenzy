import React from "react";
import styled from 'styled-components'
import userIcon from 'src/../static/user-icon.png'
import logo from 'src/../static/Logo.png'
import { UserPopover } from './UserPopover'
export class Nav extends React.Component {
	constructor(props) {
		super(props)	
		this.state = {
			userPopover: false
		}
	}

	generateWrapper() {

		return styled.div`
			grid-row: 1 / 3;
			grid-column: 1 / -1;
			display: grid;
			grid-template-rows: repeat(2, ${this.props.cell}px);
			grid-template-columns: repeat(auto-fill, ${this.props.cell}px);
			background-color: black;
		`
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
			grid-column: 9 / -3;
			grid-row: 1 / 3;
			background-color: black;
			/* Race Tile */
		`
	}

	generateUserIcon() {
		return styled.img`
			width: 100%;
			height: 100%;
			grid-column: -1 / -3;
			grid-row: 1 / 3;
			background-color: black;
		`
	}
	popOverUserNav() {
		console.log('clicked')
		let curState = this.state.userPopover
		this.setState({userPopover: !curState})
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
				{this.state.userPopover && 
						<UserPopover cell={this.props.cell} modeHandler={this.props.modeHandler} />
				}

			</Wrapper>
		)})`
			grid-row: 1 / 3;
			grid-column: 1 / -1;
		`

		return (
			<NavBar className="Nav" />		
		)
	}
}


