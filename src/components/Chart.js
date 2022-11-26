import { useState, useEffect } from "react"
import Axios from "axios"
import styled from "styled-components"
import React from "react"
import LineChartComponent from "./LineChartComponent"
import LiveFeedTable from "./LiveFeedTable"
import WeeklyChart from "./WeeklyChart"

function Chart() {
	const [alldata, setAllData] = useState([])
	const [dataFromChild, setDataFromChild] = useState()
	const [residents, setResidents] = useState([])

	const getFakeTimeSeries = async () => {
		const fakeData = await Axios.get(
			"http://localhost:4000/timeseries/fakeData"
		)
		setAllData(fakeData.data)
		const dataToSend = []
		// if (alldata) {
		for (var i = 0; i < fakeData.data.timeseries.length; i++) {
			dataToSend.push({
				date: fakeData.data.timeseries[i].data.timestamp,
				count: fakeData.data.timeseries[i].data.count,
			})
		}
		// console.log("data to send", dataToSend)

		Axios.post("http://localhost:4000/timeseries/predict", dataToSend)
		// }
		// console.log("all data", alldata.timeseries[0].data.count)
		// console.log("data: ", fakeData.data)
		const resident = await Axios.get("http://localhost:4000/resident")
		setResidents(resident.data)
	}

	useEffect(() => {
		getFakeTimeSeries()
	}, [])
	//

	// console.log("residents: ", residents)
	const numberOfCars = alldata.totalCars

	function flatten(arr) {
		return arr.reduce(function (flat, toFlatten) {
			return flat.concat(
				Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
			)
		}, [])
	}
	var allVehicles = []
	if (residents) {
		const vehicleData = []
		for (var i = 0; i < residents.length; i++) {
			if (residents[i].vehicles.length > 0) {
				for (var j = 0; j < residents[i].vehicles[j].length; j++) {}
				vehicleData.push(residents[i].vehicles)
			}
		}
		const arrays = flatten(vehicleData)
		allVehicles = arrays
	}
	// console.log("all vehicles", allVehicles)

	const fromChild = (data) => {
		setDataFromChild(data)
		console.log("data from child to chart.js", data)
	}

	return (
		<Container>
			<Header>
				<p>Welcome, John Doe</p>
			</Header>
			<div className="body">
				<Cards>
					<div>{Math.round(residents.length)} Residents</div>
					<div>{numberOfCars} Cars Scanned</div>
					<div>{allVehicles.length} Resident Cars</div>
				</Cards>

				<Charts>
					<div>
						<WeeklyChart fromChild={fromChild} data={alldata.timeseries} />
						<LineChartComponent data={dataFromChild} />
					</div>
					<LiveFeedTable />
				</Charts>
			</div>
		</Container>
	)
}

export default Chart

const Container = styled.div`
	width: 87%;
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
