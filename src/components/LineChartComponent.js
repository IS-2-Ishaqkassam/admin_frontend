import React, { useState, useEffect } from "react"
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts"
import Axios from "axios"

import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import styled from "styled-components"
import Pagination from "./Pagination"
import GuardLineChartTemplate from "./GuardLineChartTemplate"

const LineChartComponent = ({ data }) => {
	const [allData, setAllData] = useState([])
	const [day, setDay] = useState("")
	const [week, setWeek] = useState({})
	// useEffect(() => {
	// 	Axios.get("http://localhost:4000/forecast/1668155715965:HJ3HYYsSo").then(
	// 		(res) => {
	// 			setData(res.data)
	// 		}
	// 	)
	// }, [])
	useEffect(() => {
		setAllData(data)
	}, [])
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

		// data["MondayHours"].map((item) => {
		// 	Monday.push(item)
		// })
		// for (let i = 0; i < data["ModayHours"].length; i++) {
		// 	Monday.push({
		// 		time: Object.keys(data["MondayHours"]),
		// 	})
		// }
		// Monday.push({ time: Object.keys(data["MondayHours"]) })
	}
	console.log("Monday in pred", Monday)
	console.log("guard select day", day)

	// const [currentPage, setCurrentPage] = useState(1)
	// const [recordsPerPage] = useState(24)
	// const indexOfLastRecord = currentPage * recordsPerPage
	// const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

	// const currentRecords =
	// 	data && data.slice(indexOfFirstRecord, indexOfLastRecord)

	// const nPages = data && Math.ceil(data.length / recordsPerPage)

	return (
		<Table className="table">
			<div className="dropdown-container">
				{/* <button onClick={generateGuardSchedule}>Click</button> */}
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

	.dropdown-container {
		text-align: right;

		.dropdown {
			text-align: left;
			width: 25%;
			margin: 0px 25px 0 11%;
		}
	}
`
