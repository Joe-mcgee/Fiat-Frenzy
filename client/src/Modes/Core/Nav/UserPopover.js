
import React from "react";
import styled from 'styled-components'
export class UserPopover extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		console.log(this.props.cell)
	}

	generateDashboard() {
		return styled.div`
			grid-row: 1;
			grid-column: 1;

			display: flex;
			font-size: 38px;
			margin: auto;
		`
	}


	render() {
		let DashboardButton = this.generateDashboard()
		let PopOver = styled(({className}) => { return (
			<div className={className}>
				<DashboardButton onClick={() => this.props.modeHandler('Core')}>

					Dashboard
				</DashboardButton>
			</div>
		)})`
			position: fixed;
			top: ${this.props.cell * 3}px;
			right: 0;
			width: 38.1%;
			height: ${window.innerHeight / 3}px;
			background-color: white;
			display: grid;
			grid-template-rows: repeat(3, 1fr);
			grid-template-columns: 1fr;
		`	
		return (
			<PopOver className="user-popover" />
		)
	} 
}
