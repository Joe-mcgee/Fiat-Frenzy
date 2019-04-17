import React from "react";
import styled from 'styled-components'
import logo from '../static/Logo.png'
import userIcon from '../static/user-icon.png'

import { About } from '../Modes/About/About'
import { Core } from '../Modes/Core/Core'

export class Layout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mode: 'About',
			width: 0,
			height: 0,
			balanceKey: null,
			assetKey: null,
			liabilityKey: null,
			InscribeLoan: null,
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.modeHandler = this.modeHandler.bind(this)
	}bind

	modeHandler(mode) {
		this.setState({mode: mode })
	}

	async componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
		const { drizzle, drizzleState } = this.props;
		const contract = drizzle.contracts.Bankcoin;
		console.log(contract)
		let address = this.props.drizzleState.accounts[0]
		const balanceKey = contract.methods.balanceOf.cacheCall(address)	
		const assetKey = contract.methods.assetsOf.cacheCall(address)	
		const liabilityKey = contract.methods.liabilitiesOf.cacheCall(address)
		this.setState({ balanceKey })
		this.setState({ assetKey })
		this.setState({ liabilityKey })

	}

	componentWillMount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}



	generateGrid(activeComponent, width, height) {
		let cell = this.calcActiveCell(width, height)
		// is portrait mode
		switch (height >= width) {
			case true:
				return styled(activeComponent)`
					display: grid;
					grid-template-rows: repeat(21, ${cell}px);
					grid-template-columns: repeat(21, ${cell}px);
				`
			case false:
				let neededColumns = Math.round((width / cell));

				return styled(activeComponent)`
					display: grid;
					grid-template-rows: repeat(21, ${cell}px);
					grid-template-columns: repeat(${neededColumns}, ${cell}px);
				`
		}

	}
	calcActiveCell() {
		let length;
		if (window.innerHeight >= window.innerWidth) {
			return window.innerWidth / 21
		}
		return window.innerHeight / 21;
	}
	updateWindowDimensions() {
		this.setState({width: window.innerWidth, height: window.innerHeight})
		this.setState({cell: this.calcActiveCell()})	
	}

	render() {
		const { Bankcoin } = this.props.drizzleState.contracts
		let balance = null;
		let assets = null;
		let liabilities = null;
		if (this.state.balanceKey in Bankcoin.balanceOf) {
			balance = Bankcoin.balanceOf[this.state.balanceKey].value
		} else {
			balance = "Loading" 
		}
		if (this.state.assetKey in Bankcoin.assetsOf) {
			assets = Bankcoin.assetsOf[this.state.balanceKey].value
		} else {
			assets = "Loading" 
		}
		if (this.state.liabilityKey in Bankcoin.liabilitiesOf) {
			liabilities = Bankcoin.liabilitiesOf[this.state.liabilityKey].value
		} else {
			liabilities = "Loading" 
		}

		let event = null
		event = this.state.InscribeLoan
		let blockchainProp = {
			balance,
			assets,
			liabilities
		}
		let Grid;
		switch (this.state.mode) {
			case ('About'):
				Grid = this.generateGrid(About, this.state.width, this.state.height)
				break;
			case ('Core'):
				Grid = this.generateGrid(Core, this.state.width, this.state.height)
		}
		
		return (
			<Grid className='grid'
				ledger={blockchainProp}
				mode={this.state.mode}
				modeHandler={this.modeHandler}
				cell={this.calcActiveCell()}/>
			)
	}
}

