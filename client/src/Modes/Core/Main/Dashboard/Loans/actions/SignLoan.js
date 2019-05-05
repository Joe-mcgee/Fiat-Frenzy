
import React from "react";
import styled from 'styled-components'
export class SignLoan extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}

		this.unixToDate = this.unixToDate.bind(this) 
	}

	unixToDate(time) {
		let inMs = time * 1000;
		let date = new Date(inMs);
		console.log(date)
		let array = date.toString().split(" ")
		let formatted = `${array[1]} ${array[2]} ${array[3]}`
		return formatted
	}
	render() {
		
		
		let TitleBar = styled(({className}) => {
			let Lender = styled.div`
				grid-row: 1 / -1;
				grid-column: 1 / 5;
			`
			let Amount = styled.div`
				grid-row: 1 / -1;
				grid-column: 5 / 7;
			`
			let Time = styled.div`
				grid-row: 1 / -1;
				grid-column: 7 / 11;
			`
			let Status = styled.div`
				grid-row: 1 / -1;
				grid-column: 11 / 13;
			`
			let Actions = styled.div`
				grid-row: 1 / -1;
				grid-column: 13 / -1;
			`
			return (
				<div className={className}>
					<Lender>Lender</Lender>
						<Amount>amount</Amount>
						<Time>time</Time>
						<Status>status</Status>
						<Actions>actions</Actions>
				</div>
			)})`
			grid-row: 1 / 2;
			grid-column: 1 / -1;
			font-size:${0.618*this.props.cell}px;
			display: grid;
			background-color: #50c878;
			grid-template-rows: repeat(auto-fill, ${this.props.cell}px);
			grid-template-columns: repeat(auto-fill, ${this.props.cell}px);
			margin: 0;
			line-height: ${2*0.618*this.props.cell}px;
			text-align: center;
				
		`	
		return (
				<div className={this.props.className}>
					<TitleBar className="headers" />
						<div>
						{ /*this.props.inscriptions.toMe.map((inscription, i) => {
							return <tr key={i}>
								<td>{inscription.returnValues._lender}</td>
								<td>{inscription.returnValues._amount}</td>
								<td>{this.unixToDate(inscription.returnValues._time)}</td>
								<td>status</td>
								<td><button onClick={() => this.signLoan(inscription.returnValues._lender, inscription.returnValues._id)}>Sign Loan</button>
								</td>
							</tr>
						})
						*/}
					</div>
				</div>
		)
		}
	}


