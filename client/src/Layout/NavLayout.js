import React from "react";
import styled from 'styled-components'
export class NavLayout extends React.Component {
	constructor(props) {
		super(props)
	}
	generateWrapper(cell) {
		console.log(cell)
			let neededColumns = Math.round((window.innerWidth / Number(cell)));
			console.log(neededColumns)
		return styled.div`
			background-color: black;
			grid-row: 1 / 4;
			grid-column: 1 / -1;
			display: grid;
			grid-template-rows: repeat(3, ${cell}px);
			grid-template-columns: repeat(${neededColumns}, ${cell}px);
		`
	}

}
