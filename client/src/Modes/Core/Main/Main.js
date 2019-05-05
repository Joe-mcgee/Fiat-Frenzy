
import React from "react";
import styled from 'styled-components'
import { Dashboard } from './Dashboard/Dashboard'
export class Main extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			active: "Dashboard"
		}
	}

	generateDashButton() {
		
		return styled(({className}) => {return (
			<div className={className}>
				Dashboard
			</div>
		)})`
			grid-row: 1 / 3;
			grid-column: 1 / 6;
			color: #50c878;
			font-size: ${this.props.cell}px;
			margin: 0;	

			text-align: center;
			line-height: ${this.props.cell*2}px;
			&:hover {
			background-color:  #50c878;
			color:  #e0115f; 
			}
		`
	}

	generatePortButton() {
		return styled(({className}) => { return (
			<div className={className}>
				Portfolio
			</div>
		)})`
			grid-row: 3 / 5;
			grid-column: 1 / 6;
			color: #50c878;
			margin: 0;
			text-align: center;
			font-size: ${this.props.cell}px;
			line-height: ${this.props.cell*2}px;
			&:hover {
				background-color:  #50c878;
				color:  #e0115f;
			}

		`
	}
	render() {
		let neededColumns = Math.round((window.innerWidth / Number(this.props.cell)));
		
		let DashButton = this.generateDashButton();
		console.log(DashButton)
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
					<MainBar className="Main-Bar"
						cell={this.props.cell}		
					/>
					<Dashboard
						drizzle={this.props.drizzle}
						drizzleState={this.props.drizzleState}
						balance={this.props.balance}
						liabilities={this.props.liabilities}
						assets={this.props.assets}
						loanData={this.props.loanData}
						debtData={this.props.debtData}
						inscriptions={this.props.inscriptions}
						cell={this.props.cell}

					/>
		
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
