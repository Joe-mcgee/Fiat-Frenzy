
import React from "react";
import styled from 'styled-components'
export class MainLayout extends React.Component {
	constructor(props) {
		super(props)
	}

 generateWrapper(cell) {
	 	console.log(cell)
		let neededColumns = Math.round((window.innerWidth / Number(cell)));
		console.log(neededColumns)
	
	 return styled.div`
			grid-row: 4 / 5;
			grid-column: 1 / 3;
			background-color: teal;
		  display: grid;
			grid-template-rows: repeat(10, ${cell}px);
			grid-template-columns: repeat(${neededColumns}, ${cell}px);
		`
	}
}
