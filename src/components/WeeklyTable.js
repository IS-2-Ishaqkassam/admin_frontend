import React, { useState, useEffect } from "react"
import styled from "styled-components"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import LineChartComponent from "./LineChartTemplate"

function WeeklyTable({ data }) {
	const [day, setDay] = useState("")

	console.log("alldata", data)

	const handleChange = (event) => {
		setDay(event.target.value)
	}

	//data in days
	const Monday = []
	const Tuesday = []
	const Wednesday = []
	const Thursday = []
	const Friday = []
	const Saturday = []
	const Sunday = []
	if (data) {
		for (let i = 0; i < data.length; i++) {
			if (data[i].dayOfWeek == 0) {
				Sunday.push(data[i].data)
			} else if (data[i].dayOfWeek == 1) {
				Monday.push(data[i].data)
			} else if (data[i].dayOfWeek == 2) {
				Tuesday.push(data[i].data)
			} else if (data[i].dayOfWeek == 3) {
				Wednesday.push(data[i].data)
			} else if (data[i].dayOfWeek == 4) {
				Thursday.push(data[i].data)
			} else if (data[i].dayOfWeek == 5) {
				Friday.push(data[i].data)
			} else if (data[i].dayOfWeek == 6) {
				Saturday.push(data[i].data)
			}
		}
	}
	console.log("Monday", Monday)
	console.log("Tue", Tuesday)
	console.log("Wed", Wednesday)
	console.log("Thur", Thursday)
	console.log("Fri", Friday)
	console.log("Sat", Saturday)
	console.log("Sun", Sunday)

	return (
		<Table className="table">
			<div className="dropdown-container">
				<FormControl className="dropdown">
					<InputLabel id="demo-simple-select-label">Day</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={day}
						// defaultValue={Sunday}
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
				<LineChartComponent data={Sunday} />
			) : day === "Monday" ? (
				<LineChartComponent data={Monday} />
			) : day === "Tuesday" ? (
				<LineChartComponent data={Tuesday} />
			) : day === "Wednesday" ? (
				<LineChartComponent data={Wednesday} />
			) : day == "Thursday" ? (
				<LineChartComponent data={Thursday} />
			) : day === "Friday" ? (
				<LineChartComponent data={Friday} />
			) : day === "Saturday" ? (
				<LineChartComponent data={Saturday} />
			) : (
				<LineChartComponent data={Sunday} />
			)}
		</Table>
	)
}

export default WeeklyTable

const Table = styled.div`
	width: 45%;
	/* border: 1px solid black; */
	display: flex;
	flex-direction: column;
	.dropdown-container {
		text-align: right;
		/* border: 1px solid red; */

		.dropdown {
			text-align: left;
			width: 25%;
			margin: 0px 25px 0 11%;
		}
	}
`
