
import React from "react";
import styled from 'styled-components'
export class SignLoan extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}

		this.unixToDate = this.unixToDate.bind(this) 
	}
	
	async signLoan(lender, _id) {
		let address = this.props.drizzleState.accounts[0]
		const contract = this.props.drizzle.contracts.Bankcoin
		console.log(contract.methods)
		let signLoan = await contract.methods.signLoanByIndex(lender, _id).send()
		console.log(signLoan)
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
				grid-column: 1;
			`
			let Amount = styled.div`
				grid-row: 1 / -1;
				grid-column: 2;
			`
			let Time = styled.div`
				grid-row: 1 / -1;
				grid-column: 3;
			`
			let Status = styled.div`
				grid-row: 1 / -1;
				grid-column: 4;
			`
			let Actions = styled.div`
				grid-row: 1 / -1;
				grid-column: 5;
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
			grid-template-columns: repeat(5, 20%);
			margin: 0;
			line-height: ${2*0.618*this.props.cell}px;
			text-align: center;
				
		`	

		let Table = styled(({className}) => {
			let Value = styled.div`
				font-size:${0.618*this.props.cell}px;
				line-height:${2*0.618*this.props.cell}px;
				text-align: center;
			`
			let Rows = this.props.inscriptions.toMe.map((inscription, i) => {
				let Row = styled(({className}) => {
					return(
						<div className={className}>
								<Value>{inscription.returnValues._lender.substring(0,10)}...</Value>
								<Value>{inscription.returnValues._amount}</Value>
								<Value>{this.unixToDate(inscription.returnValues._time)}</Value>
								<Value>Open</Value>
								<Value><button onClick={() => this.signLoan(inscription.returnValues._lender, inscription.returnValues._id)}>Sign Loan</button>
								</Value>
						</div>
					)
				})`
					grid-row: ${i}/ ${i+1};
					grid-column: 1 / -1;
					display: grid;
					font-size:${0.618*this.props.cell}px;
					margin: 0;
					grid-template-rows: repeat(auto-fill, ${this.props.cell}px);

					grid-template-columns: repeat(5, 20%);
				`
				return <Row key={i}>
															</Row>
			})
			return (
				<div className={className}>
					{Rows}
				</div>
			)
		})`
		grid-row: 2 / -1;
		grid-column: 1 / -1;
		display: grid;
		grid-template-rows: repeat(auto-fill, ${this.props.cell}px);
		grid-template-columns: repeat(auto-fill, ${this.props.cell}px);
		`
		return (
				<div className={this.props.className}>
					<TitleBar className="headers" />
					<Table className="table" />
					
				</div>
		)
		}
	}


