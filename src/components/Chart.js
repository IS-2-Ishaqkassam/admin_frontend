import { useState, useEffect } from "react"
import Axios from "axios"
import styled from "styled-components"
import React from "react"
import LineChartComponent from "./LineChart"
import AllObservationsLineChartComponent from "./AllObservationsLineChartComponent"

function Chart() {
	const [data, setData] = useState([])
	var jobId = {}
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
						forecast_to: 1663554366,
						callback: "https://eop35ebikjh8te5.m.pipedream.net",
					},
					{
						headers: {
							"x-access-token":
								"b1c709bf8c77f7c24244b923a006b8ced5a647b2d45f232dec8a04d32bd54624",
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

	const numberOfCars = data.totalCars
	const numberOfDays = data.timeseries ? data.timeseries.length : 0

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
			<LineChartComponent />
		</Container>
	)
}

export default Chart

const Container = styled.div`
	width: 87%;
	height: 100vh;
	overflow-y: scroll;
`
// const Header = styled.div`
// 	height: 10%;
// 	width: 100%;
// 	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
// 	display: flex;
// 	align-items: center;

// 	p {
// 		margin-left: 3%;
// 		font-size: 28px;
// 	}
// `
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
