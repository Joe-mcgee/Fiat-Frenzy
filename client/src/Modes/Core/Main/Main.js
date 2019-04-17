
import React from "react";
import styled from 'styled-components'
import { Dashboard } from './Dashboard'
export class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active: "Dashboard"
		}
	}

	generateDashButton() {
		let Title = styled.h1`
				display: inline-block;
				line-height: 65px;
		`
		return styled(({className}) => {return (
			<div className={className}>
				<Title id="dash-title">Dashboard</Title>	
			</div>
		)})`
			grid-row: 1 / 3;
			grid-column: 1 / 6;
			color: #50c878;
			width: 100%;
			height: 100%;
			
			text-align: center;
			&:hover {
			background-color: #e0115f;
			}
		`
	}

	generatePortButton() {
		let Title = styled.h1`
			display: inline-block;
			line-height: 65px;
			font: BigNoodle;
		`
		return styled(({className}) => { return (
			<div className={className}>
				<Title>Portfolio</Title>
			</div>
		)})`
			grid-row: 3 / 5;
			grid-column: 1 / 6;
			color: #50c878;
			width: 100%;
			height: 100%;
			
			text-align: center;
			&:hover {
			background-color: #e0115f;
			}

		`
	}
	render() {
		let neededColumns = Math.round((window.innerWidth / Number(this.props.cell)));
		
		let DashButton = this.generateDashButton();
		let PortButton = this.generatePortButton();
		let MainBar = styled(({className}) => { return (
			<div className={className}>
				<DashButton className="DashButton" />
				<PortButton classname="PortButton" />
			</div>
		) })`
		grid-row: 1 / -1;
		grid-column: 1 / 6;
		background-color: black;
		display: grid;
		grid-template-rows: repeat(auto-fill, ${this.props.cell}px);
		grid-template-columns: repeat(${neededColumns}, ${this.props.cell}px);
		`
		let Main = styled(({className}) => {
			return (
				<div className={className}>
					<MainBar className="Main-Bar" />
					 <Dashboard
						 ledger={this.props.ledger}
						 cell={this.props.cell} />
		
				</div>
				) })`
					grid-row: 3 / -1;
					grid-column: 1 / -1;
					display: grid;
					grid-template-rows: repeat(auto-fill, ${this.props.cell}px);
					grid-template-columns: repeat(${neededColumns}, ${this.props.cell}px);	
				`
		
		return (
		<Main className={this.props.className}>
		</Main>
		)	
	}


}
