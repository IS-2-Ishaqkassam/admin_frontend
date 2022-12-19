import React, { useState, useEffect } from "react"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import styled from "styled-components"
import GuardLineChartTemplate from "./GuardLineChartTemplate"

//data from chart.js
const LineChartComponent = ({ data }) => {
	const [day, setDay] = useState("")
	const handleChange = (event) => {
		setDay(event.target.value)
	}

	const Monday = []
	const Tuesday = []
	const Wednesday = []
	const Thursday = []
	const Friday = []
	const Saturday = []
	const Sunday = []
	if (data) {
		console.log("data pred", data["MondayHours"])

		for (var key in data["MondayHours"]) {
			Monday.push(data["MondayHours"][key])
		}
		for (var key in data["TuesdayHours"]) {
			Tuesday.push(data["TuesdayHours"][key])
		}
		for (var key in data["WednesdayHours"]) {
			Wednesday.push(data["WednesdayHours"][key])
		}
		for (var key in data["ThursdayHours"]) {
			Thursday.push(data["ThursdayHours"][key])
		}
		for (var key in data["FridayHours"]) {
			Friday.push(data["FridayHours"][key])
		}
		for (var key in data["SaturdayHours"]) {
			Saturday.push(data["SaturdayHours"][key])
		}
		for (var key in data["SundayHours"]) {
			Sunday.push(data["SundayHours"][key])
		}
	}

	return (
		<Table className="table">
			<div className="dropdown-container">
				<FormControl className="dropdown" size="small">
					<InputLabel id="demo-simple-select-label">Day</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={day}
						label="Day"
						onChange={handleChange}
					>
						<MenuItem value={"Sunday"}>Sunday</MenuItem>
						<MenuItem value={"Monday"}>Monday</MenuItem>
						<MenuItem value={"Tuesday"}>Tuesday</MenuItem>
						<MenuItem value={"Wednesday"}>Wednesday</MenuItem>
						<MenuItem value={"Thursday"}>Thursday</MenuItem>
						<MenuItem value={"Friday"}>Friday</MenuItem>
						<MenuItem value={"Saturday"}>Saturday</MenuItem>
					</Select>
				</FormControl>
			</div>
			{day === "Sunday" ? (
				<GuardLineChartTemplate data={Sunday} />
			) : day === "Monday" ? (
				<GuardLineChartTemplate data={Monday} />
			) : day === "Tuesday" ? (
				<GuardLineChartTemplate data={Tuesday} />
			) : day === "Wednesday" ? (
				<GuardLineChartTemplate data={Wednesday} />
			) : day == "Thursday" ? (
				<GuardLineChartTemplate data={Thursday} />
			) : day === "Friday" ? (
				<GuardLineChartTemplate data={Friday} />
			) : day === "Saturday" ? (
				<GuardLineChartTemplate data={Saturday} />
			) : (
				<GuardLineChartTemplate data={Sunday} />
			)}
		</Table>
	)
}
export default LineChartComponent

const Table = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px 35px 0 0;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

	.dropdown-container {
		text-align: right;

		.dropdown {
			text-align: left;
			width: 25%;
			margin: 0px 3px 0 11%;
		}
	}
`
