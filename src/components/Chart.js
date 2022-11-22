import { useState, useEffect } from "react"
import Axios from "axios"
import styled from "styled-components"
import React from "react"
import LineChartComponent from "./LineChart"
import LiveFeedTable from "./LiveFeedTable"
import WeeklyChart from "./WeeklyChart"
function Chart() {
	const [alldata, setData] = useState([])
	const [allResidents, setAllResidents] = useState([])

	const getFakeTimeSeries = async () => {
		const { data } = await Axios.get(
			"http://localhost:4000/timeseries/fakeData"
		)
		setData(data)
		const resident = await Axios.get("http://localhost:4000/resident")
		setAllResidents(resident.data)
	}

	useEffect(() => {
		getFakeTimeSeries()
	}, [])

	const numberOfCars = alldata.totalCars

	return (
		<Container>
			<Header>
				<p>Welcome, John Doe</p>
			</Header>
			<div className="body">
				<Cards>
					<div>{Math.round(allResidents.length)} Residents</div>
					<div>{numberOfCars} Cars Scanned</div>
					<div></div>
				</Cards>

				<Charts>
					<div>
						<WeeklyChart data={alldata.timeseries} />
						<LineChartComponent />
					</div>
					<LiveFeedTable />
				</Charts>
			</div>
		</Container>
	)
}

export default Chart

const Container = styled.div`
	width: 100%;
	height: 100vh;

	.body {
		height: 90%;
		overflow-y: scroll;
	}
`
const Header = styled.div`
	height: 10%;
	width: 100%;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	display: flex;
	align-items: center;

	p {
		margin-left: 3% !important;
		font-size: 28px;
	}
`
const Cards = styled.div`
	display: flex;
	margin: 50px;

	div {
		height: 150px;
		margin: 0 50px;
		width: 250px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
			rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
	}
`
const Charts = styled.div`
	display: flex;
	justify-content: space-around;
`
