
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
		console.log(this.props.inscriptions)
		return (
			<div className={this.props.className}>
				<p>Incriptions wrote to me</p>
				<table>
					<thead>
						<tr>
							<th>lender</th>
							<th>amount</th>
							<th>time</th>
							<th>status</th>
							<th>actions</th>
						</tr>
					</thead>
					<tbody>
						{this.props.inscriptions.toMe.map((inscription, i) => {
							return <tr key={i}>
								<td>{inscription.returnValues._lender}</td>
								<td>{inscription.returnValues._amount}</td>
								<td>{this.unixToDate(inscription.returnValues._time)}</td>
								<td>status</td>
								<td><button onClick={() => this.signLoan(inscription.returnValues._lender, inscription.returnValues._id)}>Sign Loan</button>
								</td>
							</tr>
						})
						}
					</tbody>
				</table>
			</div>
		)
		}
	}


