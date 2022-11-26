import React, { useState, useEffect } from "react"
import styled from "styled-components"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import LineChartTemplate from "./LineChartTemplate"

import Axios from "axios"

function WeeklyChart({ data, fromChild }) {
	const [day, setDay] = useState("")
	const [week, setWeek] = useState({})

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
	console.log("data in weekly charts", data)
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
	console.log("format", Monday)

	const SaturdayHours = Saturday.reduce((groups, item) => {
		const group = groups[item.hourOfDay] || []
		group.push(item.vehicle_count)
		groups[item.hourOfDay] = group
		group["average"] = Math.floor(
			group.reduce((a, b) => a + b, 0) / group.length
		)
		// console.log("group", group)
		// console.log("groups", groups)
		// console.log("item", item)
		// group["hour"] = Object.entries(groups)[0][0]
		group["hourOfDay"] = item.hourOfDay
		if (group["average"] < 30) {
			group["traffic_density"] = "low"
			group["Min Guards Required"] = 2
		} else if (group["average"] < 60) {
			group["traffic_density"] = "medium"
			group["Min Guards Required"] = 3
		} else if (group["average"] > 60) {
			group["traffic_density"] = "medium"
			group["Min Guards Required"] = 5
		}
		return groups
	}, {})
	console.log("saturday hours", SaturdayHours)
	const SundayHours = Sunday.reduce((groups, item) => {
		const group = groups[item.hourOfDay] || []
		group.push(item.vehicle_count)
		groups[item.hourOfDay] = group
		group["average"] = Math.floor(
			group.reduce((a, b) => a + b, 0) / group.length
		)
		group["hourOfDay"] = item.hourOfDay
		if (group["average"] < 30) {
			group["traffic_density"] = "low"
			group["Min Guards Required"] = 2
		} else if (group["average"] < 60) {
			group["traffic_density"] = "medium"
			group["Min Guards Required"] = 3
		} else if (group["average"] > 60) {
			group["traffic_density"] = "medium"
			group["Min Guards Required"] = 5
		}

		return groups
	}, {})
	const MondayHours = Monday.reduce((groups, item) => {
		const group = groups[item.hourOfDay] || []
		group.push(item.vehicle_count)
		groups[item.hourOfDay] = group
		group["average"] = Math.floor(
			group.reduce((a, b) => a + b, 0) / group.length
		)
		group["hourOfDay"] = item.hourOfDay
		if (group["average"] < 30) {
			group["traffic_density"] = "low"
			group["Min Guards Required"] = 2
		} else if (group["average"] < 60) {
			group["traffic_density"] = "medium"
			group["Min Guards Required"] = 3
		} else if (group["average"] > 60) {
			group["traffic_density"] = "medium"
			group["Min Guards Required"] = 5
		}
		return groups
	}, {})
	const TuesdayHours = Tuesday.reduce((groups, item) => {
		const group = groups[item.hourOfDay] || []
		group.push(item.vehicle_count)
		groups[item.hourOfDay] = group
		group["average"] = Math.floor(
			group.reduce((a, b) => a + b, 0) / group.length
		)
		group["hourOfDay"] = item.hourOfDay
		if (group["average"] < 30) {
			group["traffic_density"] = "low"
			group["Min Guards Required"] = 2
		} else if (group["average"] < 60) {
			group["traffic_density"] = "medium"
			group["Min Guards Required"] = 3
		} else if (group["average"] > 60) {
			group["traffic_density"] = "medium"
			group["Min Guards Required"] = 5
		}
		return groups
	}, {})
	const WednesdayHours = Wednesday.reduce((groups, item) => {
		const group = groups[item.hourOfDay] || []
		group.push(item.vehicle_count)
		groups[item.hourOfDay] = group
		group["average"] = Math.floor(
			group.reduce((a, b) => a + b, 0) / group.length
		)
		group["hourOfDay"] = item.hourOfDay
		if (group["average"] < 30) {
			group["traffic_density"] = "low"
			group["Min Guards Required"] = 2
		} else if (group["average"] < 60) {
			group["traffic_density"] = "medium"
			group["Min Guards Required"] = 3
		} else if (group["average"] > 60) {
			group["traffic_density"] = "medium"
			group["Min Guards Required"] = 5
		}
		return groups
	}, {})
	const ThursdayHours = Thursday.reduce((groups, item) => {
		const group = groups[item.hourOfDay] || []
		group.push(item.vehicle_count)
		groups[item.hourOfDay] = group
		group["average"] = Math.floor(
			group.reduce((a, b) => a + b, 0) / group.length
		)
		group["hourOfDay"] = item.hourOfDay
		if (group["average"] < 30) {
			group["traffic_density"] = "low"
			group["Min Guards Required"] = 2
		} else if (group["average"] < 60) {
			group["traffic_density"] = "medium"
			group["Min Guards Required"] = 3
		} else if (group["average"] > 60) {
			group["traffic_density"] = "medium"
			group["Min Guards Required"] = 5
		}
		return groups
	}, {})
	const FridayHours = Friday.reduce((groups, item) => {
		const group = groups[item.hourOfDay] || []
		group.push(item.vehicle_count)
		groups[item.hourOfDay] = group
		group["average"] = Math.floor(
			group.reduce((a, b) => a + b, 0) / group.length
		)
		group["hourOfDay"] = item.hourOfDay
		if (group["average"] < 30) {
			group["traffic_density"] = "low"
			group["Min Guards Required"] = 2
		} else if (group["average"] < 60) {
			group["traffic_density"] = "medium"
			group["Min Guards Required"] = 3
		} else if (group["average"] > 60) {
			group["traffic_density"] = "medium"
			group["Min Guards Required"] = 5
		}
		return groups
	}, {})
	console.log("thursday in weekly charts", ThursdayHours)

	// fromChild(Week)
	// return Week
	// console.log(consolidateHours())
	// const setWeekFunction = () => {
	const Week = {
		MondayHours,
		TuesdayHours,
		WednesdayHours,
		ThursdayHours,
		FridayHours,
		SaturdayHours,
		SundayHours,
	}
	// fromChild(week)
	// }
	useEffect(() => {
		// setWeekFunction()
		console.log("Week", Week)
	}, [week])

	const generateGuardSchedule = () => {
		fromChild(Week)
		console.log("Week", Week)
	}
	// useEffect(() => {
	// 	setInterval(() => {
	// 		// fromChild(Week)
	// 	}, 3600000)
	// }, [Week])
	// if (Week) {
	// }

	// Axios.post("http://localhost:4000/timeseries/predict", {
	// 	Monday,
	// 	Tuesday,
	// 	Wednesday,
	// 	Thursday,
	// 	Friday,
	// 	Saturday,
	// 	Sunday,
	// }).then((res) => {
	// 	console.log(res.data)
	// })
	return (
		<Table className="table">
			<div className="dropdown-container">
				<button onClick={generateGuardSchedule}>Click</button>
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
				<LineChartTemplate data={Sunday} />
			) : day === "Monday" ? (
				<LineChartTemplate data={Monday} />
			) : day === "Tuesday" ? (
				<LineChartTemplate data={Tuesday} />
			) : day === "Wednesday" ? (
				<LineChartTemplate data={Wednesday} />
			) : day == "Thursday" ? (
				<LineChartTemplate data={Thursday} />
			) : day === "Friday" ? (
				<LineChartTemplate data={Friday} />
			) : day === "Saturday" ? (
				<LineChartTemplate data={Saturday} />
			) : (
				<LineChartTemplate data={Sunday} />
			)}
		</Table>
	)
}

export default WeeklyChart

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
