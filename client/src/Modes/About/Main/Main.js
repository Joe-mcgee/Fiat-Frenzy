import React from "react";
import styled from 'styled-components'
import { MainLayout } from 'Layout/MainLayout'
export class Main extends MainLayout {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		
	}
	
	render() {
		console.log(this.props.mode)
		let Wrapper = this.generateWrapper(this.props.cell, this.props.mode);
		return (
			<Wrapper className={this.props.className}> 
			</Wrapper>)
	}
}
