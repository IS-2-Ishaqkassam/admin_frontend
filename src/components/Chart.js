import { useState, useEffect } from "react"
import Axios from "axios"
import styled from "styled-components"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import React from "react"

function Chart() {
	const [data, setData] = useState([])
	// const data = []

	useEffect(() => {
		Axios.get("http://localhost:4000/fakeTimeSeriesData")
			.then((response) => {
				setData(response.data)
				// data.push(response.data)
			})
			.catch((e) => {
				console.log("error", e)
			})
	}, [])
	console.log("data here 3", data)
	const numberOfCars = data.totalCars
	const numberOfDays = data.timeseries ? data.timeseries.length : 0
	return (
		<Container>
			<Header>
				<p>Welcome, John Doe</p>
			</Header>
			<Cards>
				<div>{Math.floor(numberOfDays / 24)} Days System Running</div>
				<div>{numberOfCars} Cars Scanned</div>
				<div></div>
			</Cards>
		</Container>
	)
}

export default Chart

const Container = styled.div`
	width: 87%;
`
const Header = styled.div`
	height: 10%;
	width: 100%;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	display: flex;
	align-items: center;

	p {
		margin-left: 3%;
		font-size: 28px;
	}
`
const Cards = styled.div`
	display: flex;
	margin: 50px;

	div {
		height: 200px;
		margin: 0 100px;
		width: 350px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
			rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	}
`
