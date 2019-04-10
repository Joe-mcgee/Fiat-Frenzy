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
		let Wrapper = this.generateWrapper(this.props.cell);
		return (
			<Wrapper className="main"> 
			</Wrapper>)
	}
}
