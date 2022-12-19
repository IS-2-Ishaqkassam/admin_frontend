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
		for (var i = 0; i < fakeData.data.timeseries.length; i++) {
			dataToSend.push({
				date: fakeData.data.timeseries[i].data.timestamp,
				count: fakeData.data.timeseries[i].data.count,
			})
		}

		Axios.post("http://localhost:4000/timeseries/predict", dataToSend)
		const resident = await Axios.get("http://localhost:4000/resident")
		setResidents(resident.data)
	}

	useEffect(() => {
		getFakeTimeSeries()
	}, [])

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

	const fromChild = (data) => {
		setDataFromChild(data)
	}

	return (
		<Container>
			<Header>
				<p>Welcome, John Doe</p>
			</Header>
			<div className="body">
				<div className="left">
					<Cards>
						<div>
							<p className="stat">{Math.round(residents.length)}</p>
							<p>Residents</p>
						</div>
						<div>
							<p className="stat">{numberOfCars}</p>
							<p>Cars Scanned</p>
						</div>
						<div>
							<p className="stat">{allVehicles.length}</p>
							<p>Resident Cars</p>
						</div>
					</Cards>
					<div className="table">
						<LiveFeedTable />
					</div>
				</div>

				<div className="right">
					<Charts>
						<WeeklyChart fromChild={fromChild} data={alldata.timeseries} />
						<LineChartComponent data={dataFromChild} />
					</Charts>
				</div>
			</div>
		</Container>
	)
}

export default Chart

const Container = styled.div`
	width: 87%;
	height: 100vh;

	.body {
		height: 93%;
		display: flex;

		.left {
			width: 45%;

			.table {
				display: flex;
				justify-content: center;
			}
		}
		.right {
			margin: 50px 0;
			display: flex;
			justify-content: center;
			width: 55%;
		}
	}
`
const Header = styled.div`
	height: 7%;
	width: 100%;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	display: flex;
	align-items: center;

	p {
		margin-left: 3% !important;
		font-size: 25px;
	}
`
const Cards = styled.div`
	display: flex;
	margin: 50px 0 20px 20px;

	div {
		height: 130px;
		text-align: center;
		align-items: center;
		margin: 0 20px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 250px;
		box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
			rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

		.stat {
			font-size: 20px;
			font-weight: bold;
		}
	}
`
const Charts = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`
