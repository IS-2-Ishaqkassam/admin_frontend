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
import LineChartComponent from "./LineChart"
import Pagination from "./Pagination"
import AllObservationsLineChartComponent from "./AllObservationsLineChartComponent"

function Chart() {
	const [data, setData] = useState([])
	var jobId = {}
	const [forecastedData, setForecastedData] = useState([])
	var timeseriesToBeForecasted = []

	useEffect(() => {
		Axios.get("http://localhost:4000/timeseries/fakeData")
			.then((response) => {
				console.log("fake data", response.data)
				setData(response.data)
			})
			.then(() => {
				timeseriesToBeForecasted = data.timeseries
				console.log(
					"data to send to forecast unplugg",
					timeseriesToBeForecasted
				)
				Axios.post(
					"https://api.unplu.gg/forecast",
					{
						data: timeseriesToBeForecasted,
						callback: "https://eop35ebikjh8te5.m.pipedream.net",
					},
					{
						headers: {
							"x-access-token":
								"913012815fe00070139cc0ec86a970158f4c1a8d1679a9ea1a67edbcdfa68015",
							"Content-Type": "application/json",
						},
					}
				)
					.then((res) => {
						console.log("after prediction response", res.data)
						jobId["data"] = {
							id: res.data.job_id,
							date: res.headers.date,
						}
					})
					.then(() => {
						Axios.post("http://localhost:4000/jobs/", jobId)
							.then((res) => {
								console.log("posting jobid", res.data)
								console.log("jobid", jobId)
							})
							.then(() => {
								Axios.get(
									`http://localhost:4000/forecast/${jobId.data.id}`
								).then((res) => {
									console.log("gettign forecast array: ", res.data)
									setForecastedData(res.data ? res.data.forecast : [])
									// if (res.data == null) {
									// 	window.alert("no forecast")
									// }
								})
							})
							.catch((err) => {
								console.log("error posting the job id and date", err)
							})
					})
					.catch((err) => {
						console.log("error getting unplugg", err)
					})
			})
			.catch((err) => {
				console.log("error getting fake data", err)
			})
	}, [])

	// console.log("forecastedData", forecastedData)
	// console.log("data here 3", data ? data.timeseries : data)
	const numberOfCars = data.totalCars
	const numberOfDays = data.timeseries ? data.timeseries.length : 0

	const formattedForecast = []
	for (var i = 0; i < forecastedData.length; i++) {
		formattedForecast.push({
			time: forecastedData[i].timestamp,
			value: Math.round(forecastedData[i].value),
		})
	}
	const [currentPage, setCurrentPage] = useState(1)
	const [recordsPerPage] = useState(24)
	// if (formattedForecast) {
	const indexOfLastRecord = currentPage * recordsPerPage
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

	const currentRecords =
		formattedForecast &&
		formattedForecast.slice(indexOfFirstRecord, indexOfLastRecord)

	const nPages =
		formattedForecast && Math.ceil(formattedForecast.length / recordsPerPage)

	return (
		<Container>
			{/* <Header>
				<p>Welcome, John Doe</p>
			</Header> */}
			<Cards>
				<div>{Math.floor(numberOfDays / 24)} Days System Running</div>
				<div>{numberOfCars} Cars Scanned</div>
				<div></div>
			</Cards>
			<AllObservationsLineChartComponent />
			<LineChartComponent data={currentRecords} />
			{forecastedData && (
				<Pagination
					nPages={nPages}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			)}

		</Container>
	)
}

export default Chart

const Container = styled.div`
	width: 87%;
	height: 100vh;
	overflow-y: scroll;
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
